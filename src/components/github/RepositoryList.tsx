import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import GitHubIcon from "@mui/icons-material/GitHub";
import SyncIcon from "@mui/icons-material/Sync";
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

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


    // =========================================================
    // Repository State
    // =========================================================

    const {
        loading,
        repositories,
    } = useSelector(
        (state: RootState) =>
            state.githubRepositoryReducer
    );


    // =========================================================
    // Sync State
    // =========================================================

    const {
        loading: syncLoading,
        response: syncResponse,
        error: syncError,
    } = useSelector(
        (state: RootState) =>
            state.githubRepositorySyncReducer
    );


    // =========================================================
    // Repository currently being synchronized
    // =========================================================

    const [
        syncingRepositoryId,
        setSyncingRepositoryId
    ] = useState<string | null>(null);


    // =========================================================
    // Initial Repository API
    // =========================================================

    useEffect(() => {

        dispatch({
            type: GITHUB_REPOSITORY_REQUEST,
        });

    }, [dispatch]);


    // =========================================================
    // Sync API completed
    // =========================================================

    useEffect(() => {

        if (!syncResponse) {
            return;
        }


        /*
         * Sync completed successfully.
         *
         * Now reload repositories so that
         * agentActive comes from backend.
         */

        if (
            syncResponse.repositoryId &&
            syncResponse.syncStatus === "ACTIVE"
        ) {

            dispatch({
                type: GITHUB_REPOSITORY_REQUEST,
            });

        }

    }, [
        syncResponse,
        dispatch,
    ]);


    // =========================================================
    // Repository list finished loading
    // =========================================================

    useEffect(() => {

        if (!syncingRepositoryId) {
            return;
        }


        /*
         * Find the repository that was synchronized.
         */

        const syncedRepository =
            repositories.find(
                (repo: any) =>
                    String(repo.id) ===
                    String(syncingRepositoryId)
            );


        /*
         * Backend now says agent is active.
         *
         * Remove loader and button.
         */

        if (
            syncedRepository &&
            syncedRepository.agentActive === true
        ) {

            setSyncingRepositoryId(null);
        }

    }, [
        repositories,
        syncingRepositoryId,
    ]);


    // =========================================================
    // Handle Sync
    // =========================================================

    const handleSync = (
        repositoryId: string
    ) => {

        /*
         * Immediately show loader.
         */

        setSyncingRepositoryId(
            repositoryId
        );


        dispatch({

            type:
                GITHUB_REPOSITORY_SYNC_REQUEST,

            payload:
                repositoryId,

        });

    };


    // =========================================================
    // If Sync failed
    // =========================================================

    useEffect(() => {

        if (
            syncError &&
            syncingRepositoryId
        ) {

            /*
             * Stop loader and show Sync
             * again because synchronization failed.
             */

            setSyncingRepositoryId(null);
        }

    }, [
        syncError,
        syncingRepositoryId,
    ]);


    // =========================================================
    // Initial Loading
    // =========================================================

    if (loading && repositories.length === 0) {

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
                            syncingRepositoryId !== null &&
                            String(
                                syncingRepositoryId
                            ) ===
                            String(repo.id);


                        return (

                            <div
                                key={repo.id}
                                style={{
                                    border:
                                        "1px solid var(--border-color)",

                                    borderRadius:
                                        "14px",

                                    padding:
                                        "18px",

                                    display:
                                        "flex",

                                    justifyContent:
                                        "space-between",

                                    alignItems:
                                        "center",

                                    background:
                                        "var(--bg-surface)",
                                }}
                            >

                                {/* ==========================================
                                    Repository Details
                                ========================================== */}

                                <div>

                                    <div
                                        style={{
                                            display:
                                                "flex",

                                            alignItems:
                                                "center",

                                            gap:
                                                "8px",

                                            fontWeight:
                                                700,

                                            fontSize:
                                                "17px",
                                        }}
                                    >

                                        <GitHubIcon />

                                        {repo.name}

                                    </div>


                                    <div
                                        style={{
                                            marginTop:
                                                "8px",

                                            color:
                                                "var(--text-secondary)",
                                        }}
                                    >

                                        {repo.description ||
                                            "No description"}

                                    </div>


                                    <div
                                        style={{
                                            marginTop:
                                                "12px",

                                            display:
                                                "flex",

                                            gap:
                                                "16px",

                                            flexWrap:
                                                "wrap",

                                            fontSize:
                                                "13px",
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
                                                            fontSize:
                                                                16,

                                                            verticalAlign:
                                                                "middle",
                                                        }}
                                                    />

                                                    {" "}
                                                    Private

                                                </>

                                                :

                                                <>

                                                    <PublicIcon
                                                        sx={{
                                                            fontSize:
                                                                16,

                                                            verticalAlign:
                                                                "middle",
                                                        }}
                                                    />

                                                    {" "}
                                                    Public

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


                                {/* ==========================================
                                    Sync / Agent Status
                                ========================================== */}

                                {repo.agentActive === true ? (

                                    /*
                                     * Agent is active.
                                     *
                                     * Sync button is completely removed.
                                     */

                                    <span
                                        style={{
                                            fontSize:
                                                "14px",

                                            fontWeight:
                                                600,

                                            whiteSpace:
                                                "nowrap",
                                        }}
                                    >

                                        ● Agent Active

                                    </span>

                                ) : isCurrentRepositorySyncing ? (

                                    /*
                                     * Sync is in progress.
                                     *
                                     * Button is disabled and loader shown.
                                     */

                                    <Button
                                        variant="contained"
                                        disabled
                                        startIcon={
                                            <CircularProgress
                                                size={16}
                                                color="inherit"
                                            />
                                        }
                                        sx={{
                                            textTransform:
                                                "none",

                                            borderRadius:
                                                "10px",
                                        }}
                                    >

                                        Syncing...

                                    </Button>

                                ) : (

                                    /*
                                     * Repository has not been synchronized.
                                     */

                                    <Button
                                        variant="contained"

                                        startIcon={
                                            <SyncIcon />
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

                                        onClick={() =>
                                            handleSync(
                                                repo.id
                                            )
                                        }
                                    >

                                        Sync

                                    </Button>

                                )}

                            </div>

                        );

                    }
                )}

            </div>

        </div>

    );

};