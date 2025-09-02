import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../utils/hooks/useAuth';
import { useTheme } from '../../utils/hooks/useTheme';
import loginIllustration from '../../assets/images/login/login.png';
import { PROJECT_NAME } from '../../utils/globals/KRM_GLOBAL_VARIABLES';

// Validation Schema
const validationSchema = Yup.object({
  verificationCode: Yup.string()
    .matches(/^\d{6}$/, 'Verification code must be 6 digits')
    .required('Verification code is required')
});

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyEmail, resendVerificationCode, isLoading, error, clearError } = useAuth();
  const { isDarkMode } = useTheme();
  const [resendCooldown, setResendCooldown] = useState(0);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // // Get email from location state or localStorage
    // const email = location.state?.email || localStorage.getItem('verificationEmail');
    // if (email) {
    //   setUserEmail(email);
    // } else {
    //   // Redirect to register if no email found
    //   navigate('/register');
    // }
  }, [isDarkMode, location.state, navigate]);

  // Countdown timer for resend button
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {

      // navigate('/onboarding');
      // if (error) clearError();
      
      // const result = await verifyEmail({
      //   email: userEmail,
      //   code: values.verificationCode
      // });
      
      // if (result.success) {
      //   // Clear stored email
      //   localStorage.removeItem('verificationEmail');
      //   navigate('/dashboard');
      // } else {
      //   if (result.fieldErrors) {
      //     Object.keys(result.fieldErrors).forEach(field => {
      //       setFieldError(field, result.fieldErrors[field]);
      //     });
      //   }
      // }
    } catch (err) {
      // console.error('Verification error:', err);
    } finally {
      // setSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    try {
      if (error) clearError();
      
      const result = await resendVerificationCode(userEmail);
      
      if (result.success) {
        setResendCooldown(60); // 60 seconds cooldown
      }
    } catch (err) {
      console.error('Resend code error:', err);
    }
  };

  const handleContactUs = () => {
    // Handle contact us logic
    console.log('Contact us clicked');
  };

  const initialValues = {
    verificationCode: ''
  };

  return (
    <div className="auth-container">
      <div className="auth-brand">{PROJECT_NAME}</div>
      
      <div className="auth-card">
        <div className="auth-illustration">
          <div className="auth-illustration-gradient">
            <img src={loginIllustration} alt="Team Illustration" />
          </div>
        </div>

        <div className="auth-form-section">
          <div className="auth-header">
            <h1 className="auth-title">Verify your account</h1>
            <p className="auth-description">
              An email containing your verification code has been sent. Please enter the code below.
            </p>
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
            {({ isSubmitting, touched, errors,handleChange, values }) => (
              <Form className="auth-form">
                <div className="auth-field">
                  <label htmlFor="verificationCode">Enter Verification Code</label>
                  <Field
                    id="verificationCode"
                    name="verificationCode"
                    type="text"
                    placeholder="Enter 6-digit code"
                    maxLength="6"
                    className={`auth-input auth-input-otp ${touched.verificationCode && errors.verificationCode ? 'auth-input-error' : ''}`}
                    onChange={(e) => {
                      // Only allow numbers and limit to 6 digits
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      e.target.value = value;
                      handleChange(e);
                      // Clear auth errors when user starts typing
                      if (error) clearError();
                    }}
                  />
                  <ErrorMessage name="verificationCode" component="div" className="auth-field-error" />
                </div>

                <div className="auth-resend">
                  {resendCooldown > 0 ? (
                    <span className="auth-resend-text">
                      Resend code in {resendCooldown}s
                    </span>
                  ) : (
                    <span 
                      className="auth-resend-link"
                      onClick={handleResendCode}
                    >
                      Resend Code
                    </span>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="auth-btn-signin"
                  disabled={isLoading || isSubmitting}
                >
                  {(isLoading || isSubmitting) ? 'Verifying...' : 'Verify Email'}
                </button>

                <div className="auth-footer">
                  Having trouble receiving emails after several tries?{' '}
                  <span 
                    className="auth-footer-link"
                    onClick={handleContactUs}
                  >
                    Contact us
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

export default OTPVerification;
