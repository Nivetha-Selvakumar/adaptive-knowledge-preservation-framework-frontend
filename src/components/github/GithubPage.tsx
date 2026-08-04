import React from "react";

import { GitHubHeader } from "./GitHubHeader";
import { GitHubConnection } from "./GitHubConnection";
import { GitHubRepositoryList } from "./RepositoryList";
import { MainLayout } from "../layout/MainLayout";

export const GitHubPage: React.FC = () => {
    return (
        <MainLayout>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    padding: "24px",
                }}
            >
                {/* Header */}
                <GitHubHeader />

                {/* Connection Status */}
                <GitHubConnection />

                {/* Repository List */}
                <GitHubRepositoryList />
            </div>
        </MainLayout>
    );
};