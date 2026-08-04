import React from "react";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import VisibilityIcon from "@mui/icons-material/Visibility";

const agents = [
    {
        name: "GitHub Agent",
        status: "Running",
        repositories: 12,
        knowledge: 3241,
        lastSync: "2 min ago",
        running: true,
    },
    {
        name: "Jira Agent",
        status: "Inactive",
        repositories: 0,
        knowledge: 0,
        lastSync: "--",
        running: false,
    },
    {
        name: "Confluence Agent",
        status: "Inactive",
        repositories: 0,
        knowledge: 0,
        lastSync: "--",
        running: false,
    },
    {
        name: "Google Drive Agent",
        status: "Inactive",
        repositories: 0,
        knowledge: 0,
        lastSync: "--",
        running: false,
    },
];

export const AgentStatus: React.FC = () => {
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
                Active Knowledge Agents
            </h3>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                }}
            >
                {agents.map((agent) => (
                    <div
                        key={agent.name}
                        style={{
                            background: "var(--bg-input)",
                            borderRadius: "14px",
                            padding: "18px",
                            border: "1px solid var(--border-color)",
                        }}
                    >
                        {/* Header */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "16px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                }}
                            >
                                <SmartToyIcon
                                    style={{
                                        color: "var(--accent-cyan)",
                                    }}
                                />

                                <div>
                                    <div
                                        style={{
                                            fontWeight: 700,
                                            color: "var(--text-primary)",
                                        }}
                                    >
                                        {agent.name}
                                    </div>

                                    <div
                                        style={{
                                            fontSize: ".8rem",
                                            color: "var(--text-secondary)",
                                        }}
                                    >
                                        Enterprise Knowledge Collector
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    color: agent.running
                                        ? "var(--accent-emerald)"
                                        : "#ff7675",
                                }}
                            >
                                {agent.running ? (
                                    <PlayCircleFilledIcon />
                                ) : (
                                    <PauseCircleFilledIcon />
                                )}

                                <span
                                    style={{
                                        fontWeight: 600,
                                        fontSize: ".85rem",
                                    }}
                                >
                                    {agent.status}
                                </span>
                            </div>
                        </div>

                        {/* Statistics */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3,1fr)",
                                gap: "12px",
                                marginBottom: "16px",
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        color: "var(--text-muted)",
                                        fontSize: ".78rem",
                                    }}
                                >
                                    Repositories
                                </div>

                                <div
                                    style={{
                                        color: "var(--text-primary)",
                                        fontWeight: 700,
                                        marginTop: "4px",
                                    }}
                                >
                                    {agent.repositories}
                                </div>
                            </div>

                            <div>
                                <div
                                    style={{
                                        color: "var(--text-muted)",
                                        fontSize: ".78rem",
                                    }}
                                >
                                    Knowledge
                                </div>

                                <div
                                    style={{
                                        color: "var(--text-primary)",
                                        fontWeight: 700,
                                        marginTop: "4px",
                                    }}
                                >
                                    {agent.knowledge}
                                </div>
                            </div>

                            <div>
                                <div
                                    style={{
                                        color: "var(--text-muted)",
                                        fontSize: ".78rem",
                                    }}
                                >
                                    Last Sync
                                </div>

                                <div
                                    style={{
                                        color: "var(--text-primary)",
                                        fontWeight: 700,
                                        marginTop: "4px",
                                    }}
                                >
                                    {agent.lastSync}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <button
                            className="primary-button"
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <VisibilityIcon />
                            View Agent
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};