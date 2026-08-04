import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import SecurityIcon from "@mui/icons-material/Security";
import StorageIcon from "@mui/icons-material/Storage";

export const GitHubHeader: React.FC = () => {
    return (
        <div
            className="glass-panel"
            style={{
                padding: "28px",
                borderRadius: "18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid var(--border-color)",
                background: "var(--bg-surface)",
            }}
        >
            {/* Left Section */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                }}
            >
                <div
                    style={{
                        width: 70,
                        height: 70,
                        borderRadius: "18px",
                        background: "rgba(36,41,46,.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <GitHubIcon
                        sx={{
                            fontSize: 42,
                            color: "#24292E",
                        }}
                    />
                </div>

                <div>
                    <h2
                        style={{
                            margin: 0,
                            color: "var(--text-primary)",
                            fontWeight: 700,
                        }}
                    >
                        GitHub Enterprise Integration
                    </h2>

                    <p
                        style={{
                            marginTop: 8,
                            marginBottom: 0,
                            color: "var(--text-secondary)",
                            lineHeight: 1.6,
                        }}
                    >
                        Connect GitHub repositories and continuously preserve
                        enterprise knowledge using adaptive repository agents.
                    </p>
                </div>
            </div>

            {/* Right Section */}
            <div
                style={{
                    display: "flex",
                    gap: "14px",
                }}
            >
                <div
                    style={{
                        padding: "14px 18px",
                        borderRadius: "14px",
                        background: "var(--bg-input)",
                        border: "1px solid var(--border-color)",
                        minWidth: 120,
                        textAlign: "center",
                    }}
                >
                    <SecurityIcon
                        sx={{
                            color: "var(--accent-emerald)",
                            fontSize: 28,
                        }}
                    />

                    <div
                        style={{
                            marginTop: 6,
                            fontWeight: 700,
                            color: "var(--text-primary)",
                        }}
                    >
                        Secure OAuth
                    </div>

                    <div
                        style={{
                            fontSize: ".75rem",
                            color: "var(--text-secondary)",
                        }}
                    >
                        GitHub Login
                    </div>
                </div>

                <div
                    style={{
                        padding: "14px 18px",
                        borderRadius: "14px",
                        background: "var(--bg-input)",
                        border: "1px solid var(--border-color)",
                        minWidth: 120,
                        textAlign: "center",
                    }}
                >
                    <StorageIcon
                        sx={{
                            color: "var(--accent-cyan)",
                            fontSize: 28,
                        }}
                    />

                    <div
                        style={{
                            marginTop: 6,
                            fontWeight: 700,
                            color: "var(--text-primary)",
                        }}
                    >
                        Enterprise
                    </div>

                    <div
                        style={{
                            fontSize: ".75rem",
                            color: "var(--text-secondary)",
                        }}
                    >
                        Knowledge Base
                    </div>
                </div>
            </div>
        </div>
    );
};
