import React from 'react';

export interface GlassCardProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  glow?: boolean;
  hoverEffect?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  title,
  subtitle,
  action,
  footer,
  glow = false,
  hoverEffect = false,
  className = '',
  style,
  onClick
}) => {
  return (
    <div
      className={`${glow ? 'glass-panel-glow' : 'glass-panel'} ${className}`}
      onClick={onClick}
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
      onMouseEnter={(e) => {
        if (hoverEffect) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
        }
      }}
      onMouseLeave={(e) => {
        if (hoverEffect) {
          e.currentTarget.style.transform = 'translateY(0px)';
          e.currentTarget.style.boxShadow = glow ? 'var(--shadow-glow)' : 'var(--shadow-md)';
        }
      }}
    >
      {(title || action || subtitle) && (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', gap: '1rem' }}>
          <div>
            {typeof title === 'string' ? (
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                {title}
              </h3>
            ) : (
              title
            )}
            {subtitle && (
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                {subtitle}
              </p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}

      <div style={{ width: '100%' }}>{children}</div>

      {footer && (
        <div
          style={{
            paddingTop: '0.85rem',
            marginTop: '0.5rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8125rem',
            color: 'var(--text-secondary)'
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
};
