import React from "react";
import { useNavigate } from "react-router-dom";

import GitHubIcon from "@mui/icons-material/GitHub";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CloudIcon from "@mui/icons-material/Cloud";
import EmailIcon from "@mui/icons-material/Email";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CodeIcon from "@mui/icons-material/Code";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";

const applications = [
    {
        name: "GitHub",
        icon: <GitHubIcon />,
        path: "/github",
        connected: true,
        resources: "12 Repositories",
        lastSync: "2 min ago",
    },
    {
        name: "Jira",
        icon: <AssignmentIcon />,
        path: "/jira",
        connected: false,
        resources: "Not Connected",
        lastSync: "--",
    },
    {
        name: "Google Drive",
        icon: <CloudIcon />,
        path: "/drive",
        connected: false,
        resources: "Not Connected",
        lastSync: "--",
    },
    {
        name: "Outlook",
        icon: <EmailIcon />,
        path: "/outlook",
        connected: false,
        resources: "Not Connected",
        lastSync: "--",
    },
    {
        name: "Microsoft Teams",
        icon: <GroupsIcon />,
        path: "/teams",
        connected: false,
        resources: "Not Connected",
        lastSync: "--",
    },
    {
        name: "Confluence",
        icon: <MenuBookIcon />,
        path: "/confluence",
        connected: false,
        resources: "Not Connected",
        lastSync: "--",
    },
    {
        name: "GitLab",
        icon: <CodeIcon />,
        path: "/gitlab",
        connected: false,
        resources: "Not Connected",
        lastSync: "--",
    },
    {
        name: "OneDrive",
        icon: <CloudQueueIcon />,
        path: "/onedrive",
        connected: false,
        resources: "Not Connected",
        lastSync: "--",
    },
];

export const ConnectedApps: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div
            className="glass-panel"
            style={{
                padding: "24px",
                borderRadius: "18px",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-color)",
            }}
        >
            <h3
                style={{
                    marginTop: 0,
                    marginBottom: "24px",
                    color: "var(--text-primary)",
                }}
            >
                Connected Enterprise Applications
            </h3>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}
            >
                {applications.map((app) => (
                    <div
                        key={app.name}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "16px",
                            borderRadius: "14px",
                            background: "var(--bg-input)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "14px",
                            }}
                        >
                            <div
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "12px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    background: "rgba(52,152,219,.12)",
                                    color: "var(--accent-cyan)",
                                }}
                            >
                                {app.icon}
                            </div>

                            <div>
                                <div
                                    style={{
                                        fontWeight: 700,
                                        color: "var(--text-primary)",
                                    }}
                                >
                                    {app.name}
                                </div>

                                <div
                                    style={{
                                        fontSize: "0.82rem",
                                        color: "var(--text-secondary)",
                                        marginTop: "4px",
                                    }}
                                >
                                    {app.resources}
                                </div>

                                <div
                                    style={{
                                        fontSize: "0.75rem",
                                        color: "var(--text-muted)",
                                        marginTop: "4px",
                                    }}
                                >
                                    Last Sync : {app.lastSync}
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                            }}
                        >
                            <span
                                style={{
                                    padding: "6px 12px",
                                    borderRadius: "20px",
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    background: app.connected
                                        ? "rgba(46,204,113,.15)"
                                        : "rgba(231,76,60,.12)",
                                    color: app.connected
                                        ? "var(--accent-emerald)"
                                        : "#ff7675",
                                }}
                            >
                                {app.connected ? "Connected" : "Disconnected"}
                            </span>

                            <button
                                className="primary-button"
                                onClick={() => navigate(app.path)}
                            >
                                Open
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
