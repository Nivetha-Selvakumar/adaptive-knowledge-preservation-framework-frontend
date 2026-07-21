import React from 'react';
import { MainLayout } from '../layout/MainLayout';
import { GlassCard } from '../../common-component/GlassCard';
import { Badge } from '../../common-component/Badge';
import { Button } from '../../common-component/Button';
import { getStorage } from '../../utils/funtional';
import { useNavigate } from 'react-router-dom';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CommitIcon from '@mui/icons-material/Commit';
import GitHubIcon from '@mui/icons-material/GitHub';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import SchoolIcon from '@mui/icons-material/School';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SyncIcon from '@mui/icons-material/Sync';
import CodeIcon from '@mui/icons-material/Code';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = getStorage('user_session') || {
    firstName: 'Senior Architect',
    role: 'SENIOR_DEVELOPER'
  };

  const statCards = [
    {
      title: 'Senior Commits Harvested',
      value: '1,482',
      change: '+14 today',
      icon: <CommitIcon style={{ color: 'var(--accent-cyan)' }} />,
      glowColor: 'var(--accent-cyan)'
    },
    {
      title: 'Pushed Diffs Structured',
      value: '640',
      change: '+8 this week',
      icon: <GitHubIcon style={{ color: 'var(--accent-purple)' }} />,
      glowColor: 'var(--accent-purple)'
    },
    {
      title: 'Deleted Code Rationales',
      value: '312',
      change: 'Preserved for Juniors',
      icon: <DeleteSweepIcon style={{ color: 'var(--accent-rose)' }} />,
      glowColor: 'var(--accent-rose)'
    },
    {
      title: 'Senior Mentoring Hours Saved',
      value: '148 hrs',
      change: '92% onboarding efficiency',
      icon: <SchoolIcon style={{ color: 'var(--accent-emerald)' }} />,
      glowColor: 'var(--accent-emerald)'
    }
  ];

  const recentPreservedKnowledge = [
    {
      id: 'k1',
      senior: 'Nivetha S. (Senior Lead)',
      action: 'PUSH & COMMIT',
      title: 'Replaced legacy REST polling with WebSocket Saga streams',
      rationale: 'Reduces server CPU overhead by 68%. Deleted old PollingService.ts to prevent memory leak.',
      time: '12 mins ago',
      tags: ['Saga', 'WebSockets', 'Memory Optimization']
    },
    {
      id: 'k2',
      senior: 'Alex M. (Principal Eng)',
      action: 'DELETED CODE PRESERVED',
      title: 'Removed deprecated OAuth1 fallback strategy',
      rationale: 'OAuth2 with PKCE is now mandatory. Archived old token verification logic for junior context.',
      time: '1 hour ago',
      tags: ['Security', 'OAuth2', 'Refactoring']
    },
    {
      id: 'k3',
      senior: 'Elena R. (Staff Architect)',
      action: 'COMMIT DELTA',
      title: 'Added idempotency keys to payment retry queue',
      rationale: 'Prevents double charging during network blips. Essential pattern for junior devs working on billing.',
      time: '3 hours ago',
      tags: ['Idempotency', 'Payments', 'Distributed Systems']
    }
  ];

  return (
    <MainLayout currentUser={currentUser}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* HERO BANNER */}
        <GlassCard
          glow
          style={{
            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.12) 0%, rgba(124, 58, 237, 0.15) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'var(--gradient-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 25px rgba(2, 132, 199, 0.4)'
                }}
              >
                <AutoAwesomeIcon style={{ color: '#ffffff', fontSize: '32px' }} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                    Welcome, {currentUser.firstName}!
                  </h1>
                  <Badge variant="cyan" pulse>
                    Agent #8492 Online
                  </Badge>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  Your personal agent is monitoring repository pushes, commits, and deleted code to synthesize senior developer wisdom for juniors.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Button
                variant="glass"
                size="md"
                startIcon={<SyncIcon />}
                onClick={() => window.location.reload()}
              >
                Sync GitHub Stream
              </Button>
              <Button
                variant="primary"
                size="md"
                startIcon={<PersonAddIcon />}
                onClick={() => navigate('/create-user')}
              >
                Create New User
              </Button>
            </div>
          </div>
        </GlassCard>

        {/* METRICS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {statCards.map((stat, idx) => (
            <GlassCard key={idx} hoverEffect>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    {stat.title}
                  </span>
                  <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {stat.value}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                    {stat.change}
                  </span>
                </div>
                <div
                  style={{
                    padding: '0.65rem',
                    borderRadius: '12px',
                    background: 'var(--bg-hover)'
                  }}
                >
                  {stat.icon}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* MAIN FEED: SENIOR KNOWLEDGE ORGANIZER */}
        <GlassCard
          glow
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CodeIcon style={{ color: 'var(--accent-cyan)' }} />
              <span>Central Agent Knowledge Feed</span>
            </div>
          }
          subtitle="Organized senior developer commits, pushed code, and deleted rationales for junior learning"
          action={
            <Badge variant="purple">
              Live Synthesis Stream
            </Badge>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            {recentPreservedKnowledge.map((item) => (
              <div
                key={item.id}
                className="glass-panel"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  background: 'var(--bg-input)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Badge variant={item.action.includes('DELETED') ? 'rose' : 'cyan'}>
                      {item.action}
                    </Badge>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {item.senior}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {item.time}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {item.title}
                </h4>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, background: 'var(--bg-glass)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid var(--accent-cyan)' }}>
                  <strong>Agent Preserved Rationale:</strong> {item.rationale}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {item.tags.map((tag, i) => (
                    <Badge key={i} variant="neutral" size="sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </MainLayout>
  );
};
