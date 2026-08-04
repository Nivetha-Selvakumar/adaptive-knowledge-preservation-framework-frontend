import React from "react";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RefreshIcon from "@mui/icons-material/Refresh";
import PersonIcon from "@mui/icons-material/Person";
import StorageIcon from "@mui/icons-material/Storage";

export const DashboardHero: React.FC = () => {
    return (
        <div
            className="glass-panel"
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "32px",
                borderRadius: "20px",
                background:
                    "linear-gradient(135deg, rgba(52,152,219,0.12), rgba(142,68,173,0.12))",
                border: "1px solid var(--border-color)",
            }}
        >
            <div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "18px",
                    }}
                >
                    <AutoAwesomeIcon
                        style={{
                            color: "var(--accent-cyan)",
                            fontSize: 34,
                        }}
                    />

                    <h2
                        style={{
                            margin: 0,
                            color: "var(--text-primary)",
                            fontSize: "2rem",
                            fontWeight: 700,
                        }}
                    >
                        Enterprise Knowledge Dashboard
                    </h2>

                </div>

                <p
                    style={{
                        color: "var(--text-secondary)",
                        fontSize: "1rem",
                        maxWidth: "700px",
                        lineHeight: 1.7,
                        margin: 0,
                    }}
                >
                    Monitor connected enterprise applications, autonomous
                    knowledge agents, repository synchronization, and
                    enterprise knowledge preservation from a unified platform.
                </p>

            </div>

            <div
                style={{
                    display: "flex",
                    gap: "16px",
                }}
            >
                <button
                    className="primary-button"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <RefreshIcon />
                    Refresh Dashboard
                </button>

                <button
                    className="secondary-button"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <StorageIcon />
                    Knowledge Store
                </button>

                <button
                    className="secondary-button"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <PersonIcon />
                    Users
                </button>

            </div>
        </div>
    );
};