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
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuth();
  const { isDarkMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      if (error) clearError();
      
      const result = await login(values);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        if (result.fieldErrors) {
          Object.keys(result.fieldErrors).forEach(field => {
            setFieldError(field, result.fieldErrors[field]);
          });
        }
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign In clicked');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const initialValues = {
    email: '',
    password: ''
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
              Welcome back to project<span className="highlight">(z)</span>
            </h1>
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
                    placeholder="Email"
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
                  <label htmlFor="password">Enter Password</label>
                  <div className="auth-password-wrapper">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter Password"
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

                <div className="auth-forgot">
                  <span className="auth-forgot-link">Forget Password?</span>
                </div>

                <button 
                  type="submit" 
                  className="auth-btn-signin"
                  disabled={isLoading || isSubmitting}
                >
                  {(isLoading || isSubmitting) ? 'Signing in...' : 'Sign in'}
                </button>

                <div className="auth-divider">
                  <span>OR</span>
                </div>

                <button 
                  type="button" 
                  className="auth-btn-google" 
                  onClick={handleGoogleSignIn}
                  disabled={isLoading || isSubmitting}
                >
                  <GoogleIcon className="google-icon" />
                  Continue with Google
                </button>

                <div className="auth-footer">
                  Don't have an account?{' '}
                  <span 
                    className="auth-footer-link"
                    onClick={() => navigate('/register')}
                  >
                    Create an account
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

export default Login;
