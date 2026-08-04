import React from "react";

import CodeIcon from "@mui/icons-material/Code";
import BugReportIcon from "@mui/icons-material/BugReport";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EmailIcon from "@mui/icons-material/Email";
import GroupsIcon from "@mui/icons-material/Groups";

const analytics = [
    {
        title: "Source Code",
        value: "5,240",
        icon: <CodeIcon />,
        color: "#3B82F6",
    },
    {
        title: "Documentation",
        value: "324",
        icon: <MenuBookIcon />,
        color: "#8B5CF6",
    },
    {
        title: "Issues",
        value: "87",
        icon: <BugReportIcon />,
        color: "#EF4444",
    },
    {
        title: "Pull Requests",
        value: "62",
        icon: <MergeTypeIcon />,
        color: "#10B981",
    },
    {
        title: "Emails",
        value: "194",
        icon: <EmailIcon />,
        color: "#F59E0B",
    },
    {
        title: "Meetings",
        value: "31",
        icon: <GroupsIcon />,
        color: "#06B6D4",
    },
];

export const KnowledgeAnalytics: React.FC = () => {
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
                Enterprise Knowledge Analytics
            </h3>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    gap: "18px",
                }}
            >
                {analytics.map((item) => (
                    <div
                        key={item.title}
                        style={{
                            background: "var(--bg-input)",
                            borderRadius: "16px",
                            padding: "18px",
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            border: "1px solid var(--border-color)",
                        }}
                    >
                        <div
                            style={{
                                width: "54px",
                                height: "54px",
                                borderRadius: "14px",
                                background: `${item.color}20`,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: item.color,
                            }}
                        >
                            {item.icon}
                        </div>

                        <div>
                            <div
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: 700,
                                    color: "var(--text-primary)",
                                }}
                            >
                                {item.value}
                            </div>

                            <div
                                style={{
                                    marginTop: "4px",
                                    color: "var(--text-secondary)",
                                    fontSize: ".85rem",
                                }}
                            >
                                {item.title}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div
                style={{
                    marginTop: "24px",
                    padding: "16px",
                    borderRadius: "14px",
                    background: "rgba(52,152,219,.08)",
                    border: "1px solid rgba(52,152,219,.2)",
                }}
            >
                <div
                    style={{
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: "8px",
                    }}
                >
                    Enterprise Knowledge Coverage
                </div>

                <div
                    style={{
                        height: "10px",
                        background: "rgba(255,255,255,.08)",
                        borderRadius: "10px",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            width: "78%",
                            height: "100%",
                            background:
                                "linear-gradient(90deg,#3498db,#2ecc71)",
                        }}
                    />
                </div>

                <div
                    style={{
                        marginTop: "8px",
                        color: "var(--text-secondary)",
                        fontSize: ".85rem",
                    }}
                >
                    78% of enterprise knowledge has been indexed and is
                    available for AI-powered retrieval.
                </div>
            </div>
        </div>
    );
};