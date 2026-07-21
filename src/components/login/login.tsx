import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextBox } from '../../common-component/TextBox';
import { Button } from '../../common-component/Button';
import { Badge } from '../../common-component/Badge';
import { useTheme } from '../../context/ThemeContext';
import showToast from '../../common-component/toastNotification';
import type { LoginRequestDto } from '../../types/auth';
import { images } from '../../assets';
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGIN_CLEAR, USER_LOGIN_REQUEST } from "../../redux/actionTypes/login/loginActionTypes";
import { useEffect } from "react";

import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { ToastContainer } from 'react-toastify';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userLogin, userLoginLoading } = useSelector(
    (state: any) => state.userLoginReducer
  );
  const { theme, toggleTheme } = useTheme();

  const [formData, setFormData] = useState<LoginRequestDto>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<LoginRequestDto>>({});

  const validate = (): boolean => {
    const errs: Partial<LoginRequestDto> = {};
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errs.password = 'Password must be at least 8 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    dispatch({
      type: USER_LOGIN_REQUEST,
      payload: formData,
    });
  };

  useEffect(() => {
    if (userLogin && (userLogin.code === 200 || userLogin.code === 201)) {
      // Show success toast
      showToast(
        userLogin.message || "Login Successful",
        "success",
        "Login-Container"
      );

      // Navigate after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
        localStorage.setItem("firstName", userLogin?.data?.user?.firstName);
        localStorage.setItem("lastName", userLogin?.data?.user?.lastName);
        localStorage.setItem("email", userLogin?.data?.user?.email);
        localStorage.setItem("password", userLogin?.data?.user?.password);
        localStorage.setItem("phoneNumber", userLogin?.data?.user?.phoneNumber);
        localStorage.setItem("role", userLogin?.data?.user?.role);
        dispatch({ type: USER_LOGIN_CLEAR });
      }, 2000);
    }
  }, [userLogin, navigate]);

  return (
    <>
      <ToastContainer containerId={"Login-Container"} />
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

        {/* MAIN CONTAINER */}
        <div
          className="glass-panel-glow"
          style={{
            width: '100%',
            maxWidth: '1000px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-glow)'
          }}
        >
          {/* LEFT LOGO SHOWCASE PANEL */}
          <div
            style={{
              padding: '3.5rem 2.5rem',
              background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.12) 0%, rgba(124, 58, 237, 0.15) 100%)',
              borderRight: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: '2.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* LOGO BRANDING */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
              <img
                src={theme === 'dark' ? images.DARK_FAVICON : images.LIGHT_FAVICON}
                alt="Logo"
                style={{
                  width: '110px',
                  height: '110px',
                  objectFit: 'contain'
                }}
              />

              <div>
                <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  KnowSphere
                </h1>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  AI-Powered Enterprise Memory
                </span>
              </div>
            </div>

            <Badge variant="cyan" icon={<LockIcon fontSize="small" />}>
              Encrypted Authentication
            </Badge>
          </div>

          {/* RIGHT LOGIN FORM */}
          <div style={{ padding: '3.5rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.75rem' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Welcome Back
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                Please enter your credentials to sign in to your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <TextBox
                label="Email Address"
                type="email"
                placeholder="user@example.com"
                leftIcon={<EmailIcon fontSize="small" />}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                required
              />

              <TextBox
                label="Password"
                type="password"
                placeholder="••••••••••••"
                leftIcon={<LockIcon fontSize="small" />}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
                required
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent-cyan)' }} />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  style={{ color: 'var(--accent-cyan)', fontWeight: 600, textDecoration: 'none' }}
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={userLoginLoading}
              >
                Sign In
              </Button>
            </form>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                marginTop: '0.25rem'
              }}
            >
              <span>Don't have an account?</span>
              <Link
                to="/create-user"
                style={{
                  color: 'var(--accent-purple)',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <PersonAddIcon fontSize="small" />
                Create User Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}