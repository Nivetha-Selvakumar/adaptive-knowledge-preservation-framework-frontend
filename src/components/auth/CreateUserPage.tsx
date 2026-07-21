import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { GlassCard } from '../../common-component/GlassCard';
import { TextBox } from '../../common-component/TextBox';
import { SelectDropdown } from '../../common-component/SelectDropdown';
import { Button } from '../../common-component/Button';
import { Badge } from '../../common-component/Badge';
import { useTheme } from '../../context/ThemeContext';
import type { CreateUserRequestDto } from '../../types/auth';
import { images } from '../../assets';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  CREATE_USER_REQUEST,
  CREATE_USER_CLEAR,
} from "../../redux/actionTypes/auth/createUserActionTypes";

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WcIcon from '@mui/icons-material/Wc';
import WorkIcon from '@mui/icons-material/Work';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';


const createUserSchema = Yup.object().shape({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  email: Yup.string().trim().required('Email address is required').email('Invalid email address format'),
  phoneNumber: Yup.string().trim().required('Phone number is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  dob: Yup.string().required('Date of birth is required'),
  sex: Yup.string().required('Gender / Sex is required'),
  role: Yup.string().required('User role is required'),
  address: Yup.string()
});

export const CreateUserPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { createUser, createUserLoading, } = useSelector((state: any) => state.createUserReducer);
  const { theme, toggleTheme } = useTheme();

  const [formData, setFormData] = useState<CreateUserRequestDto>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    address: '',
    dob: '',
    sex: 'MALE',
    role: 'SENIOR_DEVELOPER'
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateUserRequestDto, string>>>({});


  const sexOptions = [
    { value: 'MALE', label: 'Male' },
    { value: 'FEMALE', label: 'Female' },
    { value: 'OTHER', label: 'Other' },
    { value: 'PREFER_NOT_TO_SAY', label: 'Prefer Not to Say' }
  ];

  const roleOptions = [
    { value: 'SENIOR_DEVELOPER', label: 'Senior Developer' },
    { value: 'JUNIOR_DEVELOPER', label: 'Junior Developer' },
    { value: 'TECH_LEAD', label: 'Tech Lead / Architect' },
    { value: 'AGENT_ADMIN', label: 'System Administrator' }
  ];

  const validate = async (): Promise<boolean> => {
    try {
      await createUserSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err: any) {
      if (err instanceof Yup.ValidationError) {
        const errMap: Partial<Record<keyof CreateUserRequestDto, string>> = {};
        err.inner.forEach((e) => {
          if (e.path && !errMap[e.path as keyof CreateUserRequestDto]) {
            errMap[e.path as keyof CreateUserRequestDto] = e.message;
          }
        });
        setErrors(errMap);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await validate();

    if (!isValid) return;

    dispatch({
      type: CREATE_USER_REQUEST,
      payload: formData,
    });
  };

  useEffect(() => {
    console.log(createUser);

    if (createUser && (createUser.code === 200 || createUser.code === 201)) {

      // Clear redux state
      dispatch({
        type: CREATE_USER_CLEAR,
      });

      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        address: "",
        dob: "",
        sex: "MALE",
        role: "SENIOR_DEVELOPER",
      });

      // Clear validation errors
      setErrors({});

      // Navigate
      navigate("/login");
    }
  }, [createUser, dispatch, navigate]);

  const handleFieldChange = (field: keyof CreateUserRequestDto, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
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

      <div style={{ width: '100%', maxWidth: '780px' }}>
        <GlassCard glow hoverEffect={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* HEADER */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img
                  src={images.DARK_FAVICON}
                  alt="Logo"
                  style={{
                    width: '48px',
                    height: '48px',
                    objectFit: 'contain'
                  }}
                />
                <div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                    Create User Account
                  </h1>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Fill in your details to register your new account
                  </span>
                </div>
              </div>

              <Badge variant="cyan" icon={<PersonAddIcon fontSize="small" />}>
                New Registration
              </Badge>
            </div>

            {/* FORM */}
            <form noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* FIRST & LAST NAME */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <TextBox
                  label="First Name"
                  placeholder="First Name"
                  leftIcon={<PersonIcon fontSize="small" />}
                  value={formData.firstName}
                  onChange={(e) => handleFieldChange('firstName', e.target.value)}
                  error={errors.firstName}
                  required
                />

                <TextBox
                  label="Last Name"
                  placeholder="Last Name"
                  leftIcon={<PersonIcon fontSize="small" />}
                  value={formData.lastName}
                  onChange={(e) => handleFieldChange('lastName', e.target.value)}
                  error={errors.lastName}
                  required
                />
              </div>

              {/* EMAIL & PHONE */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <TextBox
                  label="Email Address"
                  type="email"
                  placeholder="user@example.com"
                  leftIcon={<EmailIcon fontSize="small" />}
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  error={errors.email}
                  required
                />

                <TextBox
                  label="Phone Number"
                  placeholder="+1 (555) 000-0000"
                  leftIcon={<PhoneIcon fontSize="small" />}
                  value={formData.phoneNumber}
                  onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
                  error={errors.phoneNumber}
                  required
                />
              </div>

              {/* PASSWORD & DOB */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <TextBox
                  label="Password"
                  type="password"
                  placeholder="••••••••••••"
                  leftIcon={<LockIcon fontSize="small" />}
                  value={formData.password}
                  onChange={(e) => handleFieldChange('password', e.target.value)}
                  error={errors.password}
                  required
                />

                <TextBox
                  label="Date of Birth"
                  type="date"
                  leftIcon={<CalendarTodayIcon fontSize="small" />}
                  value={formData.dob}
                  onChange={(e) => handleFieldChange('dob', e.target.value)}
                  error={errors.dob}
                  required
                />
              </div>

              {/* GENDER & ROLE */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <SelectDropdown
                  label="Gender / Sex"
                  options={sexOptions}
                  leftIcon={<WcIcon fontSize="small" />}
                  value={formData.sex}
                  onChange={(e) => handleFieldChange('sex', e.target.value)}
                  error={errors.sex}
                  required
                />

                <SelectDropdown
                  label="User Role"
                  options={roleOptions}
                  leftIcon={<WorkIcon fontSize="small" />}
                  value={formData.role}
                  onChange={(e) => handleFieldChange('role', e.target.value)}
                  error={errors.role}
                  required
                />
              </div>

              {/* ADDRESS */}
              <TextBox
                label="Address"
                multiline
                rows={2}
                placeholder="123 Main Street, City, Country"
                leftIcon={<HomeIcon fontSize="small" />}
                value={formData.address}
                onChange={(e) => handleFieldChange('address', e.target.value)}
                error={errors.address}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={createUserLoading}
                startIcon={<PersonAddIcon />}
                style={{ marginTop: '0.5rem' }}
              >
                Create Account
              </Button>
            </form>

            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
              <Link
                to="/login"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                <ArrowBackIcon fontSize="small" />
                Already have an account? Sign In
              </Link>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
