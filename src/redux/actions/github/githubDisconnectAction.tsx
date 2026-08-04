import {
    GITHUB_DISCONNECT_REQUEST,
    GITHUB_DISCONNECT_SUCCESS,
    GITHUB_DISCONNECT_FAILURE,
    GITHUB_DISCONNECT_CLEAR,
} from "../../actionTypes/github/githubDisconnectActionTypes";

export const fetchGithubDisconnectRequest = () => ({
    type: GITHUB_DISCONNECT_REQUEST,
});

export const fetchGithubDisconnectSuccess = (message: string) => ({
    type: GITHUB_DISCONNECT_SUCCESS,
    payload: message,
});

export const fetchGithubDisconnectFailure = (error: string) => ({
    type: GITHUB_DISCONNECT_FAILURE,
    payload: error,
});

export const clearGithubDisconnect = () => ({
    type: GITHUB_DISCONNECT_CLEAR,
});