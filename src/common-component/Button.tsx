import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export type ButtonVariant = 'primary' | 'secondary' | 'glass' | 'danger' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  startIcon,
  endIcon,
  className = '',
  disabled,
  style,
  ...props
}) => {
  const getVariantStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          background: 'var(--gradient-glow)',
          color: '#ffffff',
          border: 'none',
          boxShadow: '0 4px 20px rgba(2, 132, 199, 0.35)',
        };
      case 'secondary':
        return {
          background: 'var(--bg-hover)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
        };
      case 'glass':
        return {
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-glow)',
          boxShadow: 'var(--shadow-sm)',
        };
      case 'danger':
        return {
          background: 'var(--accent-rose)',
          color: '#ffffff',
          border: 'none',
          boxShadow: '0 4px 15px rgba(225, 29, 72, 0.3)',
        };
      case 'outline':
        return {
          background: 'transparent',
          color: 'var(--accent-cyan)',
          border: '1px solid var(--accent-cyan)',
        };
    }
  };

  const getSizeStyle = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return { padding: '0.4rem 0.85rem', fontSize: '0.8125rem', borderRadius: '8px', gap: '0.375rem' };
      case 'md':
        return { padding: '0.65rem 1.25rem', fontSize: '0.9rem', borderRadius: '12px', gap: '0.5rem' };
      case 'lg':
        return { padding: '0.85rem 1.75rem', fontSize: '1rem', borderRadius: '14px', gap: '0.625rem' };
    }
  };

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontFamily: 'var(--font-sans)',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.65 : 1,
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    width: fullWidth ? '100%' : 'auto',
    textDecoration: 'none',
    userSelect: 'none',
    position: 'relative',
    overflow: 'hidden',
    ...getVariantStyle(),
    ...getSizeStyle(),
    ...style,
  };

  return (
    <button
      disabled={disabled || isLoading}
      style={baseStyle}
      onMouseEnter={(e) => {
        if (!disabled && !isLoading) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          if (variant === 'primary') {
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(2, 132, 199, 0.5)';
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !isLoading) {
          e.currentTarget.style.transform = 'translateY(0px)';
          if (variant === 'primary') {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(2, 132, 199, 0.35)';
          }
        }
      }}
      {...props}
    >
      {isLoading ? (
        <CircularProgress size={size === 'sm' ? 14 : size === 'lg' ? 22 : 18} color="inherit" />
      ) : (
        <>
          {startIcon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{startIcon}</span>}
          <span>{children}</span>
          {endIcon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{endIcon}</span>}
        </>
      )}
    </button>
  );
};
