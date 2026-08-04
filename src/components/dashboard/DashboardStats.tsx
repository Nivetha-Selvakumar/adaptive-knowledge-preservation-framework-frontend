import React from "react";

import AppsIcon from "@mui/icons-material/Apps";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import GitHubIcon from "@mui/icons-material/GitHub";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SyncIcon from "@mui/icons-material/Sync";
import StorageIcon from "@mui/icons-material/Storage";

const stats = [
    {
        title: "Connected Applications",
        value: "3",
        icon: <AppsIcon />,
        color: "var(--accent-cyan)",
    },
    {
        title: "Active Agents",
        value: "18",
        icon: <SmartToyIcon />,
        color: "var(--accent-emerald)",
    },
    {
        title: "Repositories",
        value: "25",
        icon: <GitHubIcon />,
        color: "var(--accent-purple)",
    },
    {
        title: "Knowledge Records",
        value: "18,450",
        icon: <AutoStoriesIcon />,
        color: "var(--accent-orange)",
    },
    {
        title: "Today's Synchronizations",
        value: "42",
        icon: <SyncIcon />,
        color: "var(--accent-cyan)",
    },
    {
        title: "Knowledge Storage",
        value: "120 MB",
        icon: <StorageIcon />,
        color: "var(--accent-emerald)",
    },
];

export const DashboardStats: React.FC = () => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
                gap: "20px",
            }}
        >
            {stats.map((item) => (
                <div
                    key={item.title}
                    className="glass-panel"
                    style={{
                        padding: "22px",
                        borderRadius: "18px",
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-color)",
                        transition: "0.25s",
                        cursor: "pointer",
                    }}
                >
                    <div
                        style={{
                            width: "52px",
                            height: "52px",
                            borderRadius: "14px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: `${item.color}20`,
                            color: item.color,
                            marginBottom: "18px",
                        }}
                    >
                        {item.icon}
                    </div>

                    <div
                        style={{
                            fontSize: "2rem",
                            fontWeight: 700,
                            color: "var(--text-primary)",
                        }}
                    >
                        {item.value}
                    </div>

                    <div
                        style={{
                            marginTop: "8px",
                            color: "var(--text-secondary)",
                            fontSize: "0.92rem",
                        }}
                    >
                        {item.title}
                    </div>
                </div>
            ))}
        </div>
    );
};