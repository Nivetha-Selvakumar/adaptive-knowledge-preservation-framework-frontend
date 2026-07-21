import React, { useState, forwardRef } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export interface TextBoxProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
  containerClassName?: string;
}

export const TextBox = forwardRef<HTMLInputElement & HTMLTextAreaElement, TextBoxProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  type = 'text',
  multiline = false,
  rows = 3,
  className = '',
  containerClassName = '',
  id,
  disabled,
  value,
  placeholder,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const inputBaseStyle = `
    width: 100%;
    background: var(--bg-input);
    color: var(--text-primary);
    border: 1px solid ${error ? 'var(--accent-rose)' : 'var(--border-color)'};
    border-radius: 12px;
    padding: ${leftIcon ? '0.75rem 1rem 0.75rem 2.75rem' : '0.75rem 1rem'};
    padding-right: ${isPassword || rightIcon ? '2.75rem' : '1rem'};
    font-size: 0.9375rem;
    font-family: var(--font-sans);
    outline: none;
    transition: all 0.25s ease;
    box-shadow: ${error ? '0 0 10px rgba(244, 63, 94, 0.2)' : 'none'};
  `;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '100%' }} className={containerClassName}>
      {label && (
        <label 
          htmlFor={inputId}
          style={{
            fontSize: '0.84rem',
            fontWeight: 600,
            color: error ? 'var(--accent-rose)' : 'var(--text-secondary)',
            letterSpacing: '0.02em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span>{label}</span>
          {props.required && <span style={{ color: 'var(--accent-rose)' }}>*</span>}
        </label>
      )}

      <div style={{ position: 'relative', width: '100%' }}>
        {leftIcon && (
          <div
            style={{
              position: 'absolute',
              left: '0.875rem',
              top: multiline ? '1rem' : '50%',
              transform: multiline ? 'none' : 'translateY(-50%)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none'
            }}
          >
            {leftIcon}
          </div>
        )}

        {multiline ? (
          <textarea
            ref={ref}
            id={inputId}
            rows={rows}
            disabled={disabled}
            value={value}
            placeholder={placeholder}
            style={{
              ...parseCssString(inputBaseStyle),
              resize: 'vertical',
              minHeight: '80px'
            }}
            onFocus={(e) => {
              if (!error) e.target.style.borderColor = 'var(--accent-cyan)';
              e.target.style.boxShadow = error ? '0 0 10px rgba(244, 63, 94, 0.2)' : 'var(--shadow-glow)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = error ? 'var(--accent-rose)' : 'var(--border-color)';
              e.target.style.boxShadow = error ? '0 0 10px rgba(244, 63, 94, 0.2)' : 'none';
            }}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            value={value}
            placeholder={placeholder}
            style={parseCssString(inputBaseStyle)}
            onFocus={(e) => {
              if (!error) e.target.style.borderColor = 'var(--accent-cyan)';
              e.target.style.boxShadow = error ? '0 0 10px rgba(244, 63, 94, 0.2)' : 'var(--shadow-glow)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = error ? 'var(--accent-rose)' : 'var(--border-color)';
              e.target.style.boxShadow = error ? '0 0 10px rgba(244, 63, 94, 0.2)' : 'none';
            }}
            {...props}
          />
        )}

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0.25rem',
              borderRadius: '6px',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
          </button>
        ) : (
          rightIcon && (
            <div
              style={{
                position: 'absolute',
                right: '0.875rem',
                top: multiline ? '1rem' : '50%',
                transform: multiline ? 'none' : 'translateY(-50%)',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none'
              }}
            >
              {rightIcon}
            </div>
          )
        )}
      </div>

      {(error || helperText) && (
        <span
          style={{
            fontSize: '0.78rem',
            color: error ? 'var(--accent-rose)' : 'var(--text-muted)',
            marginTop: '0.125rem'
          }}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
});

TextBox.displayName = 'TextBox';

// Helper to format inline style strings safely
function parseCssString(styleStr: string): React.CSSProperties {
  const result: any = {};
  const rules = styleStr.split(';');
  for (const rule of rules) {
    const [key, value] = rule.split(':');
    if (key && value) {
      const camelKey = key.trim().replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelKey] = value.trim();
    }
  }
  return result;
}
