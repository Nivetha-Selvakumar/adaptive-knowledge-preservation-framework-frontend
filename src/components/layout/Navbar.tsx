import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
// import { SearchBox } from '../../common-component/SearchBox';
import { Badge } from '../../common-component/Badge';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import { images } from "../../assets";

interface NavbarProps {
  onToggleSidebar?: () => void;
  onOpenLogoutModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  onOpenLogoutModal,
}) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const role = localStorage.getItem("role");



  return (
    <header
      style={{
        height: '70px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--bg-surface)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        gap: '1rem'
      }}
    >
      {/* LEFT BRAND / LOGO SECTION */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          type="button"
          onClick={onToggleSidebar}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '6px',
            borderRadius: '8px'
          }}
        >
          <MenuIcon />
        </button>

        <div
          onClick={() => navigate('/dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <img
            src={theme === "dark"
              ? images.DARK_FAVICON
              : images.LIGHT_FAVICON}
            alt="KnowSphere"
            style={{
              width: "46px",
              height: "46px",
              objectFit: "contain"
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              KnowSphere
            </span>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em' }}>
              AI-Powered Enterprise Memory
            </span>
          </div>
        </div>
      </div>

      {/* CENTER SEARCH BOX
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', maxWidth: '460px' }}>
        <SearchBox />
      </div> */}

      {/* RIGHT CONTROLS & PROFILE SECTION */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* LIVE AGENT BADGE */}
        <Badge variant="purple" pulse icon={<AutoAwesomeIcon fontSize="small" />}>
          Central Agent Active
        </Badge>

        {/* THEME TOGGLE BUTTON */}
        <button
          type="button"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          style={{
            background: 'var(--bg-hover)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'rotate(15deg)';
            e.currentTarget.style.borderColor = 'var(--accent-cyan)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'rotate(0deg)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
          }}
        >
          {theme === 'dark' ? <LightModeIcon style={{ color: '#f59e0b' }} /> : <DarkModeIcon style={{ color: '#7c3aed' }} />}
        </button>

        {/* NOTIFICATIONS COUNTER BUTTON */}
        {/* <div style={{ position: 'relative' }}>
          <button
            type="button"
            style={{
              background: 'var(--bg-hover)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <NotificationsNoneIcon fontSize="small" />
            <span
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'var(--accent-cyan)',
                color: '#ffffff',
                fontSize: '0.68rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 8px var(--accent-cyan)'
              }}
            >
              3
            </span>
          </button>
        </div> */}

        {/* USER PROFILE DROPDOWN */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'var(--bg-hover)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '0.35rem 0.75rem',
              cursor: 'pointer',
              color: 'var(--text-primary)'
            }}
          >
            <AccountCircleIcon style={{ color: 'var(--accent-cyan)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                {firstName && lastName
                  ? `${firstName} ${lastName}`
                  : "Unknown User"}
              </span>

              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                {role || "Senior Dev"}
              </span>
            </div>
          </button>

          {showUserMenu && (
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '210px',
                padding: '0.5rem',
                zIndex: 1000,
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setShowUserMenu(false);
                  navigate('/create-user');
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.65rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <PersonAddIcon fontSize="small" style={{ color: 'var(--accent-cyan)' }} />
                Create New User
              </button>

              <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.35rem 0' }} />

              <button
                type="button"
                onClick={() => {
                  setShowUserMenu(false);
                  if (onOpenLogoutModal) onOpenLogoutModal();
                  else navigate('/logout');
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.65rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--accent-rose)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(244, 63, 94, 0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <LogoutIcon fontSize="small" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
