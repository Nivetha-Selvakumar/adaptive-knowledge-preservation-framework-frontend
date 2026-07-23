import { GITHUB_SYNC_CLEAR, GITHUB_SYNC_FAILURE, GITHUB_SYNC_REQUEST, GITHUB_SYNC_SUCCESS } from "../../actionTypes/github/githubSyncActionTypes";

export const fetchGithubSyncRequest = (payload: any) => ({
    type: GITHUB_SYNC_REQUEST,
    payload
});

export const fetchGithubSyncSuccess = (payload: any) => ({
    type: GITHUB_SYNC_SUCCESS,
    payload
});

export const fetchGithubSyncFailure = (error: string) => ({
    type: GITHUB_SYNC_FAILURE,
    payload: error
});

export const fetchGithubConnectClear = () => ({
    type: GITHUB_SYNC_CLEAR,
});