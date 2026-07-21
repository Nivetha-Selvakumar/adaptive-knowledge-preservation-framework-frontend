import React from 'react';

export type BadgeVariant = 'cyan' | 'purple' | 'emerald' | 'amber' | 'rose' | 'neutral';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  pulse?: boolean;
  icon?: React.ReactNode;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  pulse = false,
  icon,
  size = 'md',
  style
}) => {
  const getColors = () => {
    switch (variant) {
      case 'cyan':
        return { bg: 'rgba(2, 132, 199, 0.15)', text: 'var(--accent-cyan)', border: 'rgba(2, 132, 199, 0.3)' };
      case 'purple':
        return { bg: 'rgba(124, 58, 237, 0.15)', text: 'var(--accent-purple)', border: 'rgba(124, 58, 237, 0.3)' };
      case 'emerald':
        return { bg: 'rgba(16, 185, 129, 0.15)', text: 'var(--accent-emerald)', border: 'rgba(16, 185, 129, 0.3)' };
      case 'amber':
        return { bg: 'rgba(245, 158, 11, 0.15)', text: 'var(--accent-amber)', border: 'rgba(245, 158, 11, 0.3)' };
      case 'rose':
        return { bg: 'rgba(244, 63, 94, 0.15)', text: 'var(--accent-rose)', border: 'rgba(244, 63, 94, 0.3)' };
      case 'neutral':
        return { bg: 'var(--bg-hover)', text: 'var(--text-secondary)', border: 'var(--border-color)' };
    }
  };

  const colors = getColors();

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: size === 'sm' ? '0.15rem 0.5rem' : '0.25rem 0.75rem',
        fontSize: size === 'sm' ? '0.72rem' : '0.78rem',
        fontWeight: 600,
        fontFamily: 'var(--font-sans)',
        color: colors.text,
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: '9999px',
        whiteSpace: 'nowrap',
        lineHeight: 1.2,
        ...style
      }}
    >
      {pulse && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: colors.text,
            boxShadow: `0 0 8px ${colors.text}`,
            animation: 'pulse-glow 1.8s infinite ease-in-out'
          }}
        />
      )}
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </span>
  );
};
