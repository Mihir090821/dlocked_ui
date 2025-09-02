import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CloudUpload as UploadIcon } from '@mui/icons-material';
import { useAuth } from '../../utils/hooks/useAuth';
import { useTheme } from '../../utils/hooks/useTheme';
import onboardingIllustration from '../../assets/images/login/onboarding.png'; // You'll need this image
import { PROJECT_NAME } from '../../utils/globals/KRM_GLOBAL_VARIABLES';

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .required('Username is required'),
  profileImage: Yup.mixed()
    .nullable()
    .test('fileSize', 'File size is too large (max 5MB)', (value) => {
      if (!value) return true;
      return value.size <= 5 * 1024 * 1024; // 5MB
    })
    .test('fileFormat', 'Unsupported file format', (value) => {
      if (!value) return true;
      return ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    })
});

const UserOnboarding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateProfile, isLoading, error, clearError } = useAuth();
  const { isDarkMode } = useTheme();
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // Check if user is coming from email verification
    // const userEmail = location.state?.email || localStorage.getItem('verificationEmail');
    // if (!userEmail) {
    //   // If no email context, redirect to login
    //   navigate('/login');
    // }
  }, [isDarkMode, location.state, navigate]);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      if (error) clearError();
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('username', values.username);
      
      if (values.profileImage) {
        formData.append('profileImage', values.profileImage);
      }
      
      const result = await updateProfile(formData);
      
      if (result.success) {
        // Clear stored email and redirect to dashboard
        localStorage.removeItem('verificationEmail');
        navigate('/dashboard');
      } else {
        if (result.fieldErrors) {
          Object.keys(result.fieldErrors).forEach(field => {
            setFieldError(field, result.fieldErrors[field]);
          });
        }
      }
    } catch (err) {
      console.error('Profile update error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue('profileImage', file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const initialValues = {
    name: '',
    username: '',
    profileImage: null
  };

  return (
    <div className="auth-container">
      <div className="auth-brand">{PROJECT_NAME}</div>
      
      <div className="auth-card">
        <div className="auth-illustration">
          <div className="auth-illustration-gradient">
            <img src={onboardingIllustration} alt="Onboarding Illustration" />
          </div>
        </div>

        <div className="auth-form-section">
          <div className="auth-header">
            <h1 className="auth-title">Please enter your details</h1>
          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors, values, setFieldValue }) => (
              <Form className="auth-form">
                {/* Image Upload */}
                <div className="auth-field">
                  <label>Upload Image</label>
                  <div 
                    className={`auth-upload-area ${touched.profileImage && errors.profileImage ? 'auth-upload-error' : ''}`}
                    onClick={triggerFileUpload}
                  >
                    {imagePreview ? (
                      <div className="auth-upload-preview">
                        <img src={imagePreview} alt="Profile Preview" />
                      </div>
                    ) : (
                      <div className="auth-upload-content">
                        <UploadIcon className="auth-upload-icon" />
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageUpload(e, setFieldValue)}
                  />
                  <ErrorMessage name="profileImage" component="div" className="auth-field-error" />
                </div>

                {/* Name Field */}
                <div className="auth-field">
                  <label htmlFor="name">Your Name</label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className={`auth-input ${touched.name && errors.name ? 'auth-input-error' : ''}`}
                    onChange={(e) => {
                      if (error) clearError();
                    }}
                  />
                  <ErrorMessage name="name" component="div" className="auth-field-error" />
                </div>

                {/* Username Field */}
                <div className="auth-field">
                  <label htmlFor="username">Username</label>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Choose your username"
                    className={`auth-input ${touched.username && errors.username ? 'auth-input-error' : ''}`}
                    onChange={(e) => {
                      // Convert to lowercase and remove spaces
                      const value = e.target.value.toLowerCase().replace(/\s/g, '');
                      setFieldValue('username', value);
                      
                      if (error) clearError();
                    }}
                  />
                  <ErrorMessage name="username" component="div" className="auth-field-error" />
                </div>

                <button 
                  type="submit" 
                  className="auth-btn-signin"
                  disabled={isLoading || isSubmitting}
                >
                  {(isLoading || isSubmitting) ? 'Submitting...' : 'Submit Details'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UserOnboarding;
