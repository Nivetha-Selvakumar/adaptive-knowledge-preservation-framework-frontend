import React from "react";

import GitHubIcon from "@mui/icons-material/GitHub";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CloudIcon from "@mui/icons-material/Cloud";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const activities = [
    {
        id: 1,
        icon: <GitHubIcon />,
        application: "GitHub",
        title: "HRMS Repository synchronized",
        description:
            "GitHub Agent collected commits, pull requests and issues.",
        time: "2 minutes ago",
        color: "#2ECC71",
    },
    {
        id: 2,
        icon: <AssignmentIcon />,
        application: "Jira",
        title: "Sprint 12 imported",
        description:
            "Jira Agent collected user stories and issue history.",
        time: "15 minutes ago",
        color: "#3498DB",
    },
    {
        id: 3,
        icon: <MenuBookIcon />,
        application: "Confluence",
        title: "API Documentation indexed",
        description:
            "Documentation successfully added into Enterprise Memory.",
        time: "1 hour ago",
        color: "#9B59B6",
    },
    {
        id: 4,
        icon: <CloudIcon />,
        application: "Google Drive",
        title: "Architecture Documents synchronized",
        description:
            "Design documents indexed for semantic search.",
        time: "3 hours ago",
        color: "#F39C12",
    },
    {
        id: 5,
        icon: <EmailIcon />,
        application: "Outlook",
        title: "Project emails archived",
        description:
            "Knowledge extracted from project communication.",
        time: "Yesterday",
        color: "#E74C3C",
    },
];

export const RecentActivity: React.FC = () => {
    return (
        <div
            className="glass-panel"
            style={{
                padding: "24px",
                borderRadius: "18px",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-color)",
                height: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                }}
            >
                <h3
                    style={{
                        margin: 0,
                        color: "var(--text-primary)",
                    }}
                >
                    Recent Enterprise Activity
                </h3>

                <span
                    style={{
                        color: "var(--accent-emerald)",
                        fontSize: ".85rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                    }}
                >
                    <CheckCircleIcon fontSize="small" />
                    Live
                </span>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                }}
            >
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        style={{
                            display: "flex",
                            gap: "16px",
                            alignItems: "flex-start",
                        }}
                    >
                        <div
                            style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "14px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: `${activity.color}20`,
                                color: activity.color,
                                flexShrink: 0,
                            }}
                        >
                            {activity.icon}
                        </div>

                        <div style={{ flex: 1 }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <strong
                                    style={{
                                        color: "var(--text-primary)",
                                    }}
                                >
                                    {activity.title}
                                </strong>

                                <span
                                    style={{
                                        color: "var(--text-muted)",
                                        fontSize: ".8rem",
                                    }}
                                >
                                    {activity.time}
                                </span>
                            </div>

                            <div
                                style={{
                                    color: "var(--accent-cyan)",
                                    fontSize: ".82rem",
                                    marginTop: "4px",
                                }}
                            >
                                {activity.application}
                            </div>

                            <div
                                style={{
                                    color: "var(--text-secondary)",
                                    fontSize: ".85rem",
                                    marginTop: "8px",
                                    lineHeight: 1.6,
                                }}
                            >
                                {activity.description}
                            </div>

                            <hr
                                style={{
                                    border: 0,
                                    borderTop: "1px solid var(--border-color)",
                                    marginTop: "18px",
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div
                style={{
                    marginTop: "20px",
                    textAlign: "center",
                }}
            >
                <button className="secondary-button">
                    View Complete Activity
                </button>
            </div>
        </div>
    );
};