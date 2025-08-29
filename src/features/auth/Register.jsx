import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Google as GoogleIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../utils/hooks/useAuth';
import { useTheme } from '../../utils/hooks/useTheme';
import loginIllustration from '../../assets/images/login/login.png';

// Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password')
});

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuth();
  const { isDarkMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      if (error) clearError();
      
        navigate('/verify-email', { 
          state: { email: values.email }
        });

          navigate('/verify-email', { 
          state: { email: values.email }
        });


    //   // Remove confirmPassword from the data sent to the server
    //   const { confirmPassword, ...registrationData } = values;
      
    //   const result = await register(registrationData);
      
    //   if (result.success) {
    //     // Store email for OTP verification
    //     localStorage.setItem('verificationEmail', values.email);
    //     // Navigate to OTP verification
    //     navigate('/verify-email', { 
    //       state: { email: values.email }
    //     });

    //           setSubmitting(false);
    //   } else {
    //     // Handle specific field errors if needed
    //     if (result.fieldErrors) {
    //       Object.keys(result.fieldErrors).forEach(field => {
    //         setFieldError(field, result.fieldErrors[field]);
    //       });
    //     }
    //   }
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignUp = () => {
    console.log('Google Sign Up clicked');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  return (
    <div className="auth-container">
      <div className="auth-brand">project(z)</div>
      
      <div className="auth-card">
        <div className="auth-illustration">
          <div className="auth-illustration-gradient">
            <img src={loginIllustration} alt="Team Illustration" />
          </div>
        </div>

        <div className="auth-form-section">
          <div className="auth-header">
            <h1 className="auth-title">
              Join project<span className="highlight">(z)</span>
            </h1>
            <p className="auth-subtitle">Create your account to get started</p>
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
            {({ isSubmitting, touched, errors, values, handleChange, handleBlur }) => (
              <Form className="auth-form">
                <div className="auth-field">
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`auth-input ${touched.email && errors.email ? 'auth-input-error' : ''}`}
                    onChange={(e) => {
                      handleChange(e);
                      if (error) clearError();
                    }}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <ErrorMessage name="email" component="div" className="auth-field-error" />
                </div>

                <div className="auth-field">
                  <label htmlFor="password">Password</label>
                  <div className="auth-password-wrapper">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      className={`auth-input auth-input-password ${touched.password && errors.password ? 'auth-input-error' : ''}`}
                      onChange={(e) => {
                        handleChange(e);
                        if (error) clearError();
                      }}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <button
                      type="button"
                      className="auth-password-toggle"
                      onClick={togglePasswordVisibility}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <VisibilityOff className="auth-password-icon" />
                      ) : (
                        <Visibility className="auth-password-icon" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="auth-field-error" />
                </div>

                <div className="auth-field">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="auth-password-wrapper">
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      className={`auth-input auth-input-password ${touched.confirmPassword && errors.confirmPassword ? 'auth-input-error' : ''}`}
                      onChange={(e) => {
                        handleChange(e);
                        if (error) clearError();
                      }}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                    />
                    <button
                      type="button"
                      className="auth-password-toggle"
                      onClick={toggleConfirmPasswordVisibility}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <VisibilityOff className="auth-password-icon" />
                      ) : (
                        <Visibility className="auth-password-icon" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="confirmPassword" component="div" className="auth-field-error" />
                </div>

                <button 
                  type="submit" 
                  className="auth-btn-signin"
                  disabled={isLoading || isSubmitting}
                >
                  {(isLoading || isSubmitting) ? 'Creating Account...' : 'Create Account'}
                </button>

                <div className="auth-divider">
                  <span>OR</span>
                </div>

                <button 
                  type="button" 
                  className="auth-btn-google" 
                  onClick={handleGoogleSignUp}
                  disabled={isLoading || isSubmitting}
                >
                  <GoogleIcon className="google-icon" />
                  Continue with Google
                </button>

                <div className="auth-footer">
                  Already have an account?{' '}
                  <span 
                    className="auth-footer-link"
                    onClick={() => navigate('/login')}
                  >
                    Sign in
                  </span>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
