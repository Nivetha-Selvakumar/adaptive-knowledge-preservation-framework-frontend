import React, { forwardRef } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectDropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  containerClassName?: string;
}

export const SelectDropdown = forwardRef<HTMLSelectElement, SelectDropdownProps>(({
  label,
  options,
  error,
  helperText,
  leftIcon,
  className = '',
  containerClassName = '',
  id,
  disabled,
  value,
  onChange,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '100%' }} className={containerClassName}>
      {label && (
        <label
          htmlFor={selectId}
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
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
              zIndex: 2
            }}
          >
            {leftIcon}
          </div>
        )}

        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            background: 'var(--bg-input)',
            color: 'var(--text-primary)',
            border: `1px solid ${error ? 'var(--accent-rose)' : 'var(--border-color)'}`,
            borderRadius: '12px',
            padding: leftIcon ? '0.75rem 2.5rem 0.75rem 2.75rem' : '0.75rem 2.5rem 0.75rem 1rem',
            fontSize: '0.9375rem',
            fontFamily: 'var(--font-sans)',
            outline: 'none',
            appearance: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.25s ease'
          }}
          onFocus={(e) => {
            if (!error) e.target.style.borderColor = 'var(--accent-cyan)';
            e.target.style.boxShadow = error ? '0 0 10px rgba(244, 63, 94, 0.2)' : 'var(--shadow-glow)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? 'var(--accent-rose)' : 'var(--border-color)';
            e.target.style.boxShadow = 'none';
          }}
          {...props}
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)'
              }}
            >
              {opt.label}
            </option>
          ))}
        </select>

        <div
          style={{
            position: 'absolute',
            right: '0.875rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none'
          }}
        >
          <KeyboardArrowDownIcon />
        </div>
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

SelectDropdown.displayName = 'SelectDropdown';
