import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import GitHubIcon from "@mui/icons-material/GitHub";
import SyncIcon from "@mui/icons-material/Sync";
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";

import Button from "@mui/material/Button";

import {
    GITHUB_REPOSITORY_REQUEST,
} from "../../redux/actionTypes/github/githubRepositoryActionTypes";

import {
    GITHUB_REPOSITORY_SYNC_REQUEST,
} from "../../redux/actionTypes/github/githubRepositorySyncActionTypes";

interface RootState {

    githubRepositoryReducer: {
        loading: boolean;
        repositories: any[];
        error: string | null;
    };

    githubRepositorySyncReducer: {
        loading: boolean;
        response: any;
        error: string | null;
    };

}

export const GitHubRepositoryList: React.FC = () => {

    const dispatch = useDispatch();

    const {
        loading,
        repositories,
    } = useSelector(
        (state: RootState) =>
            state.githubRepositoryReducer
    );

    const {
        loading: syncLoading,
        response: syncResponse,
    } = useSelector(
        (state: RootState) =>
            state.githubRepositorySyncReducer
    );

    useEffect(() => {

        dispatch({
            type: GITHUB_REPOSITORY_REQUEST,
        });

    }, [dispatch]);


    const handleSync = (
        repositoryId: string
    ) => {

        dispatch({
            type: GITHUB_REPOSITORY_SYNC_REQUEST,
            payload: repositoryId,
        });

    };


    if (loading) {

        return (

            <div className="glass-panel">

                Loading repositories...

            </div>

        );

    }


    return (

        <div
            className="glass-panel"
            style={{
                padding: "24px",
                borderRadius: "18px",
            }}
        >

            <h2
                style={{
                    marginTop: 0,
                    marginBottom: 24,
                }}
            >
                Repositories
            </h2>


            <div
                style={{
                    display: "grid",
                    gap: "18px",
                }}
            >

                {repositories.map(
                    (repo: any) => {

                        const isCurrentRepositorySyncing =
                            syncLoading &&
                            syncResponse?.repositoryId === repo.id;


                        const isCurrentRepositorySynced =
                            syncResponse?.repositoryId === repo.id &&
                            syncResponse?.status === "ACTIVE";


                        return (

                            <div
                                key={repo.id}
                                style={{
                                    border:
                                        "1px solid var(--border-color)",
                                    borderRadius: "14px",
                                    padding: "18px",
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center",
                                    background:
                                        "var(--bg-surface)",
                                }}
                            >

                                <div>

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            fontWeight: 700,
                                            fontSize: "17px",
                                        }}
                                    >

                                        <GitHubIcon />

                                        {repo.name}

                                    </div>


                                    <div
                                        style={{
                                            marginTop: "8px",
                                            color:
                                                "var(--text-secondary)",
                                        }}
                                    >

                                        {repo.description ||
                                            "No description"}

                                    </div>


                                    <div
                                        style={{
                                            marginTop: "12px",
                                            display: "flex",
                                            gap: "16px",
                                            flexWrap: "wrap",
                                            fontSize: "13px",
                                        }}
                                    >

                                        <span>

                                            Language :
                                            {" "}

                                            <strong>
                                                {repo.language}
                                            </strong>

                                        </span>


                                        <span>

                                            {repo.private ?

                                                <>

                                                    <LockIcon
                                                        sx={{
                                                            fontSize: 16,
                                                            verticalAlign:
                                                                "middle",
                                                        }}
                                                    />

                                                    {" "}Private

                                                </>

                                                :

                                                <>

                                                    <PublicIcon
                                                        sx={{
                                                            fontSize: 16,
                                                            verticalAlign:
                                                                "middle",
                                                        }}
                                                    />

                                                    {" "}Public

                                                </>

                                            }

                                        </span>


                                        <span>

                                            Branch :
                                            {" "}

                                            {repo.defaultBranch}

                                        </span>

                                    </div>

                                </div>


                                <Button
                                    variant="contained"
                                    startIcon={
                                        <SyncIcon />
                                    }
                                    onClick={() =>
                                        handleSync(
                                            repo.id
                                        )
                                    }
                                    disabled={
                                        syncLoading
                                    }
                                    sx={{
                                        textTransform:
                                            "none",
                                        borderRadius:
                                            "10px",
                                    }}
                                >

                                    {syncLoading
                                        ? "Syncing..."
                                        : "Sync"}

                                </Button>

                            </div>

                        );

                    }
                )}

            </div>

        </div>

    );

};