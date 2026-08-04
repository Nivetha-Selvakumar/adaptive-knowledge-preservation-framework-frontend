import React from "react";
import { useNavigate } from "react-router-dom";

import GitHubIcon from "@mui/icons-material/GitHub";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CloudIcon from "@mui/icons-material/Cloud";
import EmailIcon from "@mui/icons-material/Email";
import StorageIcon from "@mui/icons-material/Storage";

const applications = [
    {
        title: "GitHub",
        description: "Manage repositories and GitHub Agents",
        icon: <GitHubIcon fontSize="large" />,
        path: "/github",
        color: "#24292E",
    },
    {
        title: "Jira",
        description: "Synchronize issues and sprint history",
        icon: <AssignmentIcon fontSize="large" />,
        path: "/jira",
        color: "#0052CC",
    },
    {
        title: "Confluence",
        description: "Knowledge pages and documentation",
        icon: <MenuBookIcon fontSize="large" />,
        path: "/confluence",
        color: "#2684FF",
    },
    {
        title: "Google Drive",
        description: "Collect enterprise documents",
        icon: <CloudIcon fontSize="large" />,
        path: "/drive",
        color: "#34A853",
    },
    {
        title: "Outlook",
        description: "Index project communications",
        icon: <EmailIcon fontSize="large" />,
        path: "/outlook",
        color: "#0078D4",
    },
    {
        title: "Knowledge Base",
        description: "Enterprise Memory Repository",
        icon: <StorageIcon fontSize="large" />,
        path: "/knowledge",
        color: "#7E57C2",
    },
];

export const QuickNavigation: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div
            className="glass-panel"
            style={{
                padding: "24px",
                borderRadius: "18px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-surface)",
            }}
        >
            <h3
                style={{
                    marginTop: 0,
                    marginBottom: "24px",
                    color: "var(--text-primary)",
                }}
            >
                Quick Navigation
            </h3>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                    gap: "18px",
                }}
            >
                {applications.map((app) => (
                    <div
                        key={app.title}
                        onClick={() => navigate(app.path)}
                        style={{
                            cursor: "pointer",
                            border: "1px solid var(--border-color)",
                            borderRadius: "16px",
                            padding: "22px",
                            transition: ".25s",
                            background: "var(--bg-input)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-4px)";
                            e.currentTarget.style.borderColor =
                                "var(--accent-cyan)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.borderColor =
                                "var(--border-color)";
                        }}
                    >
                        <div
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 16,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: `${app.color}20`,
                                color: app.color,
                                marginBottom: "18px",
                            }}
                        >
                            {app.icon}
                        </div>

                        <h4
                            style={{
                                margin: 0,
                                color: "var(--text-primary)",
                            }}
                        >
                            {app.title}
                        </h4>

                        <p
                            style={{
                                marginTop: "8px",
                                color: "var(--text-secondary)",
                                fontSize: ".9rem",
                                lineHeight: 1.6,
                            }}
                        >
                            {app.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};