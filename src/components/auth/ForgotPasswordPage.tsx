import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GlassCard } from '../../common-component/GlassCard';
import { TextBox } from '../../common-component/TextBox';
import { Button } from '../../common-component/Button';
import { useTheme } from '../../context/ThemeContext';
import showToast from '../../common-component/toastNotification';
import type { ForgotPasswordRequestDto } from '../../types/auth';
import { images } from '../../assets';

import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import { useDispatch, useSelector } from "react-redux";
import { FORGOT_PASSWORD_CLEAR, FORGOT_PASSWORD_REQUEST } from '../../redux/actionTypes/auth/forgetPasswordActionTypes';
import * as Yup from "yup";

export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();

  const [formData, setFormData] = useState<ForgotPasswordRequestDto>({ email: '' });
  const [error, setError] = useState<string>('');

  const [isSent, setIsSent] = useState(false);
  const { forgotPassword, forgotPasswordLoading } = useSelector((state: any) => state.forgotPasswordReducer);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submit clicked");

    try {
      await forgotPasswordValidationSchema.validate(formData);

      console.log("Validation passed");

      dispatch({
        type: FORGOT_PASSWORD_REQUEST,
        payload: formData,
      });

      console.log("Dispatch completed");
    } catch (err: any) {
      console.log(err);
      setError(err.errors[0]);
    }
  };

  useEffect(() => {
    if (
      forgotPassword &&
      (forgotPassword.code === 200 ||
        forgotPassword.code === 201)
    ) {
      showToast(
        forgotPassword.message,
        "success"
      );

      setIsSent(true);

      dispatch({
        type: FORGOT_PASSWORD_CLEAR,
      });
    }
  }, [forgotPassword, dispatch]);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        position: 'relative'
      }}
    >
      {/* THEME TOGGLE BUTTON TOP RIGHT */}
      <button
        type="button"
        onClick={toggleTheme}
        title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-primary)',
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 50,
          transition: 'transform 0.25s ease'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {theme === 'dark' ? <LightModeIcon style={{ color: '#f59e0b' }} /> : <DarkModeIcon style={{ color: '#7c3aed' }} />}
      </button>

      <div style={{ width: '100%', maxWidth: '480px' }}>
        <GlassCard glow hoverEffect={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <img
                src={images.DARK_FAVICON}
                alt="Logo"
                style={{
                  width: '44px',
                  height: '44px',
                  objectFit: 'contain'
                }}
              />
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  Forgot Password
                </h2>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Account Password Recovery
                </span>
              </div>
            </div>

            {!isSent ? (
              <>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Enter your registered account email below. We will send you instructions and a security token to reset your password.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <TextBox
                    label="Account Email"
                    type="email"
                    placeholder="user@example.com"
                    leftIcon={<EmailIcon fontSize="small" />}
                    value={formData.email}
                    onChange={(e) => setFormData({ email: e.target.value })}
                    error={error}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={forgotPasswordLoading}
                  >
                    Send Password Reset Code
                  </Button>
                </form>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'center' }}>
                <div style={{ margin: '0 auto', color: 'var(--accent-emerald)' }}>
                  <CheckCircleOutlineIcon style={{ fontSize: '64px' }} />
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Reset Link Sent!
                </h3>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  We sent password reset instructions to <strong>{formData.email}</strong>. Check your inbox and proceed to reset your password.
                </p>

                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => navigate('/reset-password')}
                >
                  Proceed to Reset Password
                </Button>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
              <Link
                to="/login"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                <ArrowBackIcon fontSize="small" />
                Return to Login Page
              </Link>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
