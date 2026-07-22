import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { GlassCard } from '../../common-component/GlassCard';
import { TextBox } from '../../common-component/TextBox';
import { Button } from '../../common-component/Button';
import { useTheme } from '../../context/ThemeContext';
import showToast from '../../common-component/toastNotification';
import type { ResetPasswordRequestDto } from '../../types/auth';
import { images } from '../../assets';

import LockIcon from '@mui/icons-material/Lock';
// import KeyIcon from '@mui/icons-material/Key';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import { RESET_PASSWORD_CLEAR, RESET_PASSWORD_REQUEST } from '../../redux/actionTypes/auth/resetPasswordActionTypes';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { resetPassword, resetPasswordLoading } = useSelector(
    (state: any) => state.resetPasswordReducer
  );
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") || "";
  const { theme, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({
    token: token,
    newPassword: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ResetPasswordRequestDto, string>>>({});


  const calculateStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'var(--text-muted)' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 25, label: 'Weak', color: 'var(--accent-rose)' };
    if (score <= 3) return { score: 65, label: 'Medium', color: 'var(--accent-amber)' };
    return { score: 100, label: 'Strong', color: 'var(--accent-emerald)' };
  };

  const strength = calculateStrength(formData.newPassword);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ResetPasswordRequestDto, string>> = {};

    if (!token) {
      showToast("Invalid or expired reset link.", "error");
      return;
    }
    if (!formData.newPassword) {
      errs.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      errs.newPassword = 'Password must be at least 8 characters';
    }

    if (formData.confirmPassword !== formData.newPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    if (!token) {
      showToast("Invalid or expired reset link.", "error");
      return;
    }

    dispatch({
      type: RESET_PASSWORD_REQUEST,
      payload: {
        token,
        newPassword: formData.newPassword,
      },
    });
  };

  useEffect(() => {
    if (
      resetPassword &&
      (resetPassword.code === 200 || resetPassword.code === 201)
    ) {
      showToast(resetPassword.message, "success");

      dispatch({
        type: RESET_PASSWORD_CLEAR,
      });

      navigate("/login");
    }
  }, [resetPassword, dispatch, navigate]);

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
                  Reset Password
                </h2>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Choose a new secure password
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* <TextBox
                label="Reset Security Token"
                leftIcon={<KeyIcon fontSize="small" />}
                value={formData.token}
                onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                error={errors.token}
                required
              /> */}

              <TextBox
                label="New Password"
                type="password"
                placeholder="••••••••••••"
                leftIcon={<LockIcon fontSize="small" />}
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                error={errors.newPassword}
                required
              />

              {/* STRENGTH METER */}
              {formData.newPassword && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Password Strength</span>
                    <span style={{ color: strength.color }}>{strength.label}</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--bg-input)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${strength.score}%`,
                        background: strength.color,
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                </div>
              )}

              <TextBox
                label="Confirm New Password"
                type="password"
                placeholder="••••••••••••"
                leftIcon={<LockIcon fontSize="small" />}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                error={errors.confirmPassword}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={resetPasswordLoading}
                startIcon={<CheckCircleIcon />}
              >
                Update Password
              </Button>
            </form>

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
