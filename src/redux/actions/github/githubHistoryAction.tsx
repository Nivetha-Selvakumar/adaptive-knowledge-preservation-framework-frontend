import {
    GITHUB_HISTORY_REQUEST,
    GITHUB_HISTORY_SUCCESS,
    GITHUB_HISTORY_FAILURE,
    GITHUB_HISTORY_CLEAR
} from "../../actionTypes/github/githubHistoryActionTypes";

export const fetchGithubHistoryRequest = () => ({
    type: GITHUB_HISTORY_REQUEST
});

export const fetchGithubHistorySuccess = (data: any) => ({
    type: GITHUB_HISTORY_SUCCESS,
    payload: data
});

export const fetchGithubHistoryFailure = (error: any) => ({
    type: GITHUB_HISTORY_FAILURE,
    payload: error
});

export const fetchGithubHistoryClear = () => ({
    type: GITHUB_HISTORY_CLEAR
});