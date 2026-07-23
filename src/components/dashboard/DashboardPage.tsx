import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layout/MainLayout';
import { GlassCard } from '../../common-component/GlassCard';
import { Badge } from '../../common-component/Badge';
import { Button } from '../../common-component/Button';
import { useNavigate } from 'react-router-dom';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AppsIcon from '@mui/icons-material/Apps';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import HistoryIcon from '@mui/icons-material/History';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import GitHubIcon from '@mui/icons-material/GitHub';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import ForumIcon from '@mui/icons-material/Forum';
import ArticleIcon from '@mui/icons-material/Article';
import DescriptionIcon from '@mui/icons-material/Description';
import TimelineIcon from '@mui/icons-material/Timeline';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { fetchGithubConnectFailure, fetchGithubConnectSuccess } from '../../redux/actions/github/githubConnectAction';
import { useDispatch, useSelector } from 'react-redux';
import { GITHUB_CONNECT_REQUEST } from '../../redux/actionTypes/github/githubConnectActionTypes';
import { GITHUB_SYNC_REQUEST } from "../../redux/actionTypes/github/githubSyncActionTypes";

interface HistoryItem {
  id: string;
  title: string;
  time: string;
}

interface IntegrationApp {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  accentVar: string;
  connected: boolean;
  connecting: boolean;
  lastSynced: string | null;
  history: HistoryItem[];
  historyOpen: boolean;
  historyLoading: boolean;
}

const initialApps: IntegrationApp[] = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Pull commits, PRs and code review history.',
    icon: <GitHubIcon />,
    accentVar: '--accent-cyan',
    connected: false,
    connecting: false,
    lastSynced: null,
    history: [],
    historyOpen: false,
    historyLoading: false
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Sync tickets, sprints and status changes.',
    icon: <AssignmentIcon />,
    accentVar: '--accent-purple',
    connected: false,
    connecting: false,
    lastSynced: null,
    history: [],
    historyOpen: false,
    historyLoading: false
  },
  {
    id: 'drive',
    name: 'Google Drive',
    description: 'Index docs, sheets and shared folders.',
    icon: <CloudQueueIcon />,
    accentVar: '--accent-emerald',
    connected: false,
    connecting: false,
    lastSynced: null,
    history: [],
    historyOpen: false,
    historyLoading: false
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Capture decisions made in team channels.',
    icon: <ForumIcon />,
    accentVar: '--accent-rose',
    connected: false,
    connecting: false,
    lastSynced: null,
    history: [],
    historyOpen: false,
    historyLoading: false
  },
  {
    id: 'confluence',
    name: 'Confluence',
    description: 'Bring in specs, RFCs and team wikis.',
    icon: <ArticleIcon />,
    accentVar: '--accent-cyan',
    connected: false,
    connecting: false,
    lastSynced: null,
    history: [],
    historyOpen: false,
    historyLoading: false
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Sync project notes and knowledge bases.',
    icon: <DescriptionIcon />,
    accentVar: '--accent-purple',
    connected: false,
    connecting: false,
    lastSynced: null,
    history: [],
    historyOpen: false,
    historyLoading: false
  },
  {
    id: 'linear',
    name: 'Linear',
    description: 'Track issues and roadmap changes.',
    icon: <TimelineIcon />,
    accentVar: '--accent-emerald',
    connected: false,
    connecting: false,
    lastSynced: null,
    history: [],
    historyOpen: false,
    historyLoading: false
  },
  {
    id: 'bitbucket',
    name: 'Bitbucket',
    description: 'Pull repositories, branches and merges.',
    icon: <AccountTreeIcon />,
    accentVar: '--accent-rose',
    connected: false,
    connecting: false,
    lastSynced: null,
    history: [],
    historyOpen: false,
    historyLoading: false
  }
];

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const firstName = localStorage.getItem('firstName');
  const [apps, setApps] = useState<IntegrationApp[]>(initialApps);

  const updateApp = (id: string, patch: Partial<IntegrationApp>) => {
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  };

  const { githubSync, githubSyncLoading, } = useSelector((state: any) => state.githubSyncReducer);

  // --- Authorize flow ---------------------------------------------------
  // Replace the body of this function with your real OAuth kick-off, e.g.:
  //   window.location.href = `/api/integrations/${id}/authorize`;
  // and let your backend redirect back to this page with a `?connected=id`
  // query param once the provider's OAuth callback completes.
  const handleConnect = (id: string) => {

    if (id === "github") {

      dispatch({
        type: GITHUB_CONNECT_REQUEST
      });

    }

  };

  const handleSync = (id: string) => {

    if (id === "github") {

      dispatch({
        type: GITHUB_SYNC_REQUEST
      });

    }

  };
  useEffect(() => {

    const params = new URLSearchParams(window.location.search);

    if (params.get("github") === "connected") {

      updateApp("github", {
        connected: true,
        connecting: false,
        lastSynced: new Date().toLocaleString()
      });

      dispatch(fetchGithubConnectSuccess("GitHub connection successful"));

      window.history.replaceState({}, "", "/dashboard");

    }

    if (params.get("github") === "failed") {

      updateApp("github", {
        connected: false,
        connecting: false
      });

      dispatch(fetchGithubConnectFailure("GitHub connection failed"));

      window.history.replaceState({}, "", "/dashboard");

    }

  }, [dispatch]);

  useEffect(() => {

    if (!githubSync) return;

    const history = (githubSync.repositories || []).map((repo: any) => ({

      id: repo.id.toString(),

      title: repo.name,

      time: repo.updated_at

    }));

    updateApp("github", {

      lastSynced: new Date().toLocaleString(),

      history

    });

  }, [githubSync]);

  const handleDisconnect = (id: string) => {
    updateApp(id, {
      connected: false,
      lastSynced: null,
      history: [],
      historyOpen: false
    });
  };

  // --- History fetch ------------------------------------------------------
  // Replace the fetch URL with your real endpoint. Expected shape:
  //   { items: [{ id, title, time }] }
  const handleToggleHistory = async (id: string) => {
    const app = apps.find((a) => a.id === id);
    if (!app) return;

    if (app.historyOpen) {
      updateApp(id, { historyOpen: false });
      return;
    }

    if (app.history.length > 0) {
      updateApp(id, { historyOpen: true });
      return;
    }

    updateApp(id, { historyOpen: true, historyLoading: true });
    try {
      const res = await fetch(`/api/integrations/${id}/history`);
      if (!res.ok) throw new Error('history fetch failed');
      const data = await res.json();
      updateApp(id, { history: data.items ?? [], historyLoading: false });
    } catch {
      // Demo fallback data - remove once /api/integrations/:id/history exists.
      await new Promise((r) => setTimeout(r, 700));
      updateApp(id, {
        historyLoading: false,
        history: [
          { id: `${id}-1`, title: `Recent activity synced from ${app.name}`, time: '12 mins ago' },
          { id: `${id}-2`, title: `Older activity synced from ${app.name}`, time: '3 hours ago' }
        ]
      });
    }
  };

  const connectedCount = apps.filter((a) => a.connected).length;
  const totalHistoryItems = apps.reduce((sum, a) => sum + a.history.length, 0);

  const statCards = [
    {
      title: 'Connected Apps',
      value: `${connectedCount} / ${apps.length}`,
      change: connectedCount > 0 ? 'Syncing enabled' : 'Nothing connected yet',
      icon: <AppsIcon style={{ color: 'var(--accent-cyan)' }} />
    },
    {
      title: 'History Items Pulled',
      value: `${totalHistoryItems}`,
      change: 'Across connected apps',
      icon: <HistoryIcon style={{ color: 'var(--accent-purple)' }} />
    },
    {
      title: 'Pending Authorizations',
      value: `${apps.length - connectedCount}`,
      change: 'Waiting to connect',
      icon: <LinkOffIcon style={{ color: 'var(--accent-rose)' }} />
    }
  ];

  return (
    <MainLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {/* HERO BANNER */}
        <GlassCard
          glow
          style={{
            background:
              'linear-gradient(135deg, rgba(2, 132, 199, 0.12) 0%, rgba(124, 58, 237, 0.15) 100%)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}
          >
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
                  boxShadow: '0 0 25px rgba(2, 132, 199, 0.4)',
                  flexShrink: 0
                }}
              >
                <AutoAwesomeIcon style={{ color: '#ffffff', fontSize: '32px' }} />
              </div>
              <div>
                <h1
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    margin: 0
                  }}
                >
                  Welcome, {firstName || 'there'}!
                </h1>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    marginTop: '0.35rem'
                  }}
                >
                  Connect your work apps below to let your agent pull in history and keep
                  everything in sync.
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              startIcon={<PersonAddIcon />}
              onClick={() => navigate('/create-user')}
            >
              Create New User
            </Button>
          </div>
        </GlassCard>

        {/* METRICS GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem'
          }}
        >
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
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {stat.change}
                  </span>
                </div>
                <div style={{ padding: '0.65rem', borderRadius: '12px', background: 'var(--bg-hover)' }}>
                  {stat.icon}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* CONNECTED APPS */}
        <GlassCard
          glow
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <AppsIcon style={{ color: 'var(--accent-cyan)' }} />
              <span>Connect Your Apps</span>
            </div>
          }
          subtitle="Authorize an app to pull its history into your workspace"
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1rem',
              marginTop: '0.75rem'
            }}
          >
            {apps.map((app) => (
              <div
                key={app.id}
                className="glass-panel"
                style={{
                  padding: '1.25rem',
                  borderRadius: '14px',
                  background: 'var(--bg-input)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.9rem',
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'var(--bg-hover)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: `var(${app.accentVar})`,
                        flexShrink: 0
                      }}
                    >
                      {app.icon}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {app.name}
                      </div>
                      <div
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.4
                        }}
                      >
                        {app.description}
                      </div>
                    </div>
                  </div>

                  {app.connected && (
                    <Badge variant="emerald" size="sm">
                      <CheckCircleIcon style={{ fontSize: '13px', marginRight: '3px' }} />
                      Connected
                    </Badge>
                  )}
                </div>

                {app.connected && app.lastSynced && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Last synced {app.lastSynced}
                  </span>
                )}

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {!app.connected ? (
                    <Button
                      variant="primary"
                      size="sm"
                      startIcon={<LinkIcon />}
                      isLoading={app.connecting}
                      onClick={() => handleConnect(app.id)}
                      style={{ flex: 1 }}
                    >
                      Connect & Authorize
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        size="sm"
                        isLoading={githubSyncLoading}
                        onClick={() => handleSync(app.id)}
                      >
                        Sync
                      </Button>

                      <Button
                        variant="glass"
                        size="sm"
                        startIcon={app.historyOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        isLoading={app.historyLoading}
                        onClick={() => handleToggleHistory(app.id)}
                        style={{ flex: 1 }}
                      >
                        {app.historyOpen ? "Hide History" : "View History"}
                      </Button>

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleDisconnect(app.id)}
                      >
                        Disconnect
                      </Button>
                    </>
                  )}
                </div>

                {app.connected && app.historyOpen && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      paddingTop: '0.5rem',
                      borderTop: '1px solid var(--border-color)'
                    }}
                  >
                    {app.historyLoading ? (
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Fetching history…
                      </span>
                    ) : app.history.length === 0 ? (
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        No history found yet.
                      </span>
                    ) : (
                      app.history.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.15rem',
                            padding: '0.6rem 0.75rem',
                            borderRadius: '8px',
                            background: 'var(--bg-glass)',
                            borderLeft: `3px solid var(${app.accentVar})`
                          }}
                        >
                          <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                            {item.title}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            {item.time}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </MainLayout>
  );
};