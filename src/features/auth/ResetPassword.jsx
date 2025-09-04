import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../utils/hooks/useAuth';
import { useTheme } from '../../utils/hooks/useTheme';
import resetIllustration from '../../assets/images/login/login.png'; // replace with your reset image
import { PROJECT_NAME } from '../../utils/globals/KRM_GLOBAL_VARIABLES';

// ✅ Validation Schema
const validationSchema = Yup.object({
  verificationCode: Yup.string()
    .required('Verification code is required')
    .min(4, 'Code must be at least 4 characters'),
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

const ResetPassword = () => {
  const navigate = useNavigate();
  const { isLoading, error, clearError } = useAuth();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (error) clearError();
      console.log('Reset Password Submitted:', values);

      // TODO: Call your reset password API here
      // If success:
      navigate('/login');
    } catch (err) {
      console.error('Reset password error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    verificationCode: '',
    password: '',
    confirmPassword: ''
  };

  return (
    <div className="auth-container">
      <div className="auth-brand">{PROJECT_NAME}</div>

      <div className="auth-card">
        {/* Illustration Section */}
        <div className="auth-illustration">
          <div className="auth-illustration-gradient">
            <img
              className="auth-illustration-reset"
              src={resetIllustration}
              alt="Reset Password Illustration"
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="auth-form-section">
          <div className="auth-header">
            <h1 className="auth-title">Reset your password</h1>
            <p className="auth-subtitle">
              An email containing your verification code has been sent. Please enter the code below.
            </p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form className="auth-form">
                {/* Verification Code */}
                <div className="auth-field">
                  <label htmlFor="verificationCode">Enter Verification Code</label>
                  <Field
                    id="verificationCode"
                    name="verificationCode"
                    type="text"
                    placeholder="Enter verification code"
                    className={`auth-input ${
                      touched.verificationCode && errors.verificationCode
                        ? 'auth-input-error'
                        : ''
                    }`}
                  />
                  <ErrorMessage
                    name="verificationCode"
                    component="div"
                    className="auth-field-error"
                  />
                  <div className="auth-resend-info">
                    <span className="auth-footer-link">Resend Code</span>
                  </div>
                </div>

                {/* New Password */}
                <div className="auth-field">
                  <label htmlFor="password">Create new password</label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create password"
                    className={`auth-input ${
                      touched.password && errors.password ? 'auth-input-error' : ''
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="auth-field-error"
                  />
                </div>

                {/* Confirm Password */}
                <div className="auth-field">
                  <label htmlFor="confirmPassword">Confirm new password</label>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    className={`auth-input ${
                      touched.confirmPassword && errors.confirmPassword
                        ? 'auth-input-error'
                        : ''
                    }`}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="auth-field-error"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="auth-btn-signin"
                  disabled={isLoading || isSubmitting}
                >
                  {(isLoading || isSubmitting) ? 'Submitting...' : 'Reset Password'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
