import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../utils/hooks/useAuth";
import { useTheme } from "../../utils/hooks/useTheme";
import onboardingIllustration from "../../assets/images/login/onboarding.png";
import uploadIcon from "/src/assets/images/login/upload.svg"; // ✅ Import icon
import { PROJECT_NAME } from "../../utils/globals/KRM_GLOBAL_VARIABLES";
import "/src/assets/css/onboarding.css";
import ImageCropper from "/src/features/auth/ImageCropper.jsx";

// ✅ Validation Schema
const validationSchema = Yup.object({
  accountType: Yup.string().required("Please select Individual or Company"),
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, underscores allowed")
    .required("Username is required"),
  profileImage: Yup.mixed()
    .nullable()
    .test("fileSize", "File size is too large (max 5MB)", (value) => {
      if (!value) return true;
      return value.size <= 5 * 1024 * 1024;
    })
    .test("fileFormat", "Unsupported file format", (value) => {
      if (!value) return true;
      return ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(
        value.type
      );
    }),
});

const UserOnboarding = () => {
  const navigate = useNavigate();
  const { updateProfile, isLoading, error, clearError } = useAuth();
  const { isDarkMode } = useTheme();

  const fileInputRef = useRef(null);

  // ✅ Local states
  const [imagePreview, setImagePreview] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [rawImage, setRawImage] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  // ✅ Handle Image Upload → open cropper
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setRawImage(e.target.result); // raw uploaded image
        setShowCropper(true); // open cropper
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Submit handler
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      if (error) clearError();

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("username", values.username);

      if (values.profileImage) {
        formData.append("profileImage", values.profileImage);
      }

      const result = await updateProfile(formData);

      if (result.success) {
        localStorage.removeItem("verificationEmail");
        navigate("/dashboard");
      } else if (result.fieldErrors) {
        Object.keys(result.fieldErrors).forEach((field) => {
          setFieldError(field, result.fieldErrors[field]);
        });
      }
    } catch (err) {
      console.error("Profile update error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const initialValues = {
    accountType: "individual",
    name: "",
    username: "",
    profileImage: null,
  };

  return (
    <div className="auth-container">
      <div className="auth-brand">{PROJECT_NAME}</div>

      <div className="auth-card">
        {/* Illustration */}
        <div className="auth-illustration">
          <div className="auth-illustration-gradient">
            <img
              className="auth-illustration-img"
              src={onboardingIllustration}
              alt="Onboarding Illustration"
            />
          </div>
        </div>

        {/* Form */}
        <div className="auth-form-section">
          <div className="auth-header">
            <h1 className="auth-title">Please enter your details</h1>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors, setFieldValue }) => (
              <Form className="auth-form">
                {/* Toggle */}
                <div className="auth-toggle">
                  <Field
                    type="radio"
                    id="individual"
                    name="accountType"
                    value="individual"
                  />
                  <label htmlFor="individual" className="auth-toggle-btn">
                    Individual
                  </label>

                  <Field
                    type="radio"
                    id="company"
                    name="accountType"
                    value="company"
                  />
                  <label htmlFor="company" className="auth-toggle-btn">
                    Company
                  </label>
                </div>
                <ErrorMessage
                  name="accountType"
                  component="div"
                  className="auth-field-error"
                />

                {/* Upload Image */}
                <div className="auth-field">
                  <label>Upload Image</label>
                  <div
                    className={`auth-upload-area ${
                      touched.profileImage && errors.profileImage
                        ? "auth-upload-error"
                        : ""
                    }`}
                    onClick={triggerFileUpload}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="auth-upload-preview"
                      />
                    ) : (
                      <img
                        src={uploadIcon}
                        alt="Upload"
                        className="auth-upload-icon"
                      />
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />

                  <ErrorMessage
                    name="profileImage"
                    component="div"
                    className="auth-field-error"
                  />
                </div>

                {/* Cropper Modal */}
                {showCropper && (
                  <ImageCropper
                    image={rawImage}
                    onCancel={() => setShowCropper(false)}
                    onComplete={(croppedFile) => {
                      setImagePreview(URL.createObjectURL(croppedFile));
                      setFieldValue("profileImage", croppedFile);
                      setShowCropper(false);
                    }}
                  />
                )}

                {/* Name */}
                <div className="auth-field">
                  <label htmlFor="name">Your Name</label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className={`auth-input ${
                      touched.name && errors.name ? "auth-input-error" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="auth-field-error"
                  />
                </div>

                {/* Username */}
                <div className="auth-field">
                  <label htmlFor="username">Username</label>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Choose your username"
                    className={`auth-input ${
                      touched.username && errors.username
                        ? "auth-input-error"
                        : ""
                    }`}
                    onChange={(e) => {
                      const value = e.target.value
                        .toLowerCase()
                        .replace(/\s/g, "");
                      setFieldValue("username", value);
                    }}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="auth-field-error"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="auth-btn-signin"
                  disabled={isLoading || isSubmitting}
                >
                  {isLoading || isSubmitting
                    ? "Submitting..."
                    : "Submit Details"}
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
