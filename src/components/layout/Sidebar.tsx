import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';
// import SettingsIcon from '@mui/icons-material/Settings';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Badge } from '../../common-component/Badge';

interface SidebarProps {
  collapsed: boolean;
  onOpenLogoutModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onOpenLogoutModal }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuSections = [
    {
      title: 'KNOWLEDGE PLATFORM',
      items: [
        { label: 'Knowledge Hub', path: '/dashboard', icon: <DashboardIcon /> },
        { label: 'Agent Fleet & GitHub', path: '/agents', icon: <SmartToyIcon />, badge: 'Live Stream' },
        { label: 'Create New User', path: '/create-user', icon: <PersonAddIcon /> }
      ]
    },
    {
      title: 'SECURITY & AUTH',
      items: [
        { label: 'Login Screen', path: '/login', icon: <VpnKeyIcon /> },
        { label: 'Forgot Password', path: '/forgot-password', icon: <LockResetIcon /> },
        { label: 'Reset Password', path: '/reset-password', icon: <LockResetIcon /> },
        { label: 'Logout Flow', path: '/logout', icon: <LogoutIcon />, danger: true }
      ]
    }
  ];

  return (
    <aside
      style={{
        width: collapsed ? '72px' : '260px',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        height: 'calc(100vh - 70px)',
        position: 'sticky',
        top: '70px',
        background: 'var(--bg-surface)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: collapsed ? '1rem 0.5rem' : '1.25rem 0.85rem',
        overflowX: 'hidden',
        zIndex: 90
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {menuSections.map((section, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {!collapsed && (
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  padding: '0 0.75rem',
                  marginBottom: '0.25rem'
                }}
              >
                {section.title}
              </span>
            )}

            {section.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => {
                    if (item.path === '/logout' && onOpenLogoutModal) {
                      onOpenLogoutModal();
                    } else {
                      navigate(item.path);
                    }
                  }}
                  title={collapsed ? item.label : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    padding: collapsed ? '0.75rem' : '0.65rem 0.85rem',
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--accent-cyan)' : 'transparent',
                    background: isActive ? 'var(--bg-hover)' : 'transparent',
                    color: item.danger
                      ? 'var(--accent-rose)'
                      : isActive
                        ? 'var(--accent-cyan)'
                        : 'var(--text-secondary)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    width: '100%',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'var(--bg-hover)';
                      e.currentTarget.style.color = item.danger ? 'var(--accent-rose)' : 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = item.danger ? 'var(--accent-rose)' : 'var(--text-secondary)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </div>

                  {!collapsed && item.badge && (
                    <Badge variant="cyan" size="sm">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* FOOTER GITHUB & AGENT LINK STATUS */}
      {!collapsed ? (
        <div
          className="glass-panel"
          style={{
            padding: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            borderRadius: '12px',
            background: 'var(--bg-input)'
          }}
        >
          <GitHubIcon style={{ color: 'var(--accent-purple)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              GitHub Stream Sync
            </span>
            <span style={{ fontSize: '0.68rem', color: 'var(--accent-emerald)' }}>
              ● 24/7 Agent Monitoring
            </span>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GitHubIcon style={{ color: 'var(--accent-purple)' }} />
        </div>
      )}
    </aside>
  );
};
