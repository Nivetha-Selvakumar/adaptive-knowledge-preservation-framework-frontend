import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GitHubIcon from "@mui/icons-material/GitHub";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LinkIcon from "@mui/icons-material/Link";
import Button from "@mui/material/Button";
import { GITHUB_CONNECT_REQUEST, } from "../../redux/actionTypes/github/githubConnectActionTypes";
import { GITHUB_STATUS_REQUEST, } from "../../redux/actionTypes/github/githubStatusActionTypes";
import LogoutIcon from "@mui/icons-material/Logout";
import { GITHUB_DISCONNECT_REQUEST, } from "../../redux/actionTypes/github/githubDisconnectActionTypes";

interface GithubUser {
    login: string;
    avatarUrl?: string;
}

export const GitHubConnection: React.FC = () => {

    const dispatch = useDispatch();
    const githubStatus = useSelector(
        (state: any) => state.githubStatusReducer
    );

    const connected = githubStatus.connected;

    const loading = githubStatus.loading;

    const user: GithubUser | null = githubStatus.data
        ? {
            login: githubStatus.data.username,
            avatarUrl: githubStatus.data.avatarUrl,
        }
        : null;

    useEffect(() => {

        dispatch({
            type: GITHUB_STATUS_REQUEST,
        });

        const params = new URLSearchParams(window.location.search);

        if (params.get("connected")) {

            window.history.replaceState({}, "", "/github");

        }

    }, [dispatch]);

    const connectGithub = () => {

        dispatch({
            type: GITHUB_CONNECT_REQUEST,
        });

    };

    const disconnectGithub = () => {

        dispatch({
            type: GITHUB_DISCONNECT_REQUEST,
        });

    };

    if (loading) {

        return (
            <div
                className="glass-panel"
                style={{
                    padding: 24,
                    borderRadius: 18,
                }}
            >
                Checking GitHub connection...
            </div>
        );

    }

    return (

        <div
            className="glass-panel"
            style={{
                padding: 24,
                borderRadius: 18,
                border: "1px solid var(--border-color)",
                background: "var(--bg-surface)",
            }}
        >

            {!connected ? (

                <>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >

                        <div>

                            <h3
                                style={{
                                    margin: 0,
                                    color: "var(--text-primary)",
                                }}
                            >
                                GitHub Connection
                            </h3>

                            <p
                                style={{
                                    marginTop: 8,
                                    color: "var(--text-secondary)",
                                }}
                            >
                                Connect your GitHub account once. Repository
                                Agents will continue monitoring automatically.
                            </p>

                        </div>

                        <Button
                            variant="contained"
                            startIcon={<GitHubIcon />}
                            onClick={connectGithub}
                            sx={{
                                textTransform: "none",
                                borderRadius: "10px",
                            }}
                        >
                            Connect GitHub
                        </Button>

                    </div>

                </>

            ) : (

                <>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 16,
                            }}
                        >

                            <img
                                src={
                                    user?.avatarUrl ??
                                    "https://avatars.githubusercontent.com/u/9919?v=4"
                                }
                                alt="GitHub"
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: "50%",
                                }}
                            />

                            <div>

                                <h3
                                    style={{
                                        margin: 0,
                                        color: "var(--text-primary)",
                                    }}
                                >
                                    {user?.login}
                                </h3>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                        marginTop: 6,
                                        color: "var(--accent-emerald)",
                                    }}
                                >

                                    <CheckCircleIcon fontSize="small" />

                                    Connected Successfully

                                </div>

                            </div>

                        </div>

                        <div
                            style={{
                                display: "flex",
                                gap: "12px",
                            }}
                        >

                            <Button
                                variant="outlined"
                                startIcon={<LinkIcon />}
                                disabled
                                sx={{
                                    borderRadius: "10px",
                                    textTransform: "none",
                                }}
                            >
                                Connected
                            </Button>

                            <Button
                                color="error"
                                variant="contained"
                                startIcon={<LogoutIcon />}
                                onClick={disconnectGithub}
                                sx={{
                                    borderRadius: "10px",
                                    textTransform: "none",
                                }}
                            >
                                Disconnect
                            </Button>

                        </div>

                    </div>

                </>

            )}

        </div>

    );

};