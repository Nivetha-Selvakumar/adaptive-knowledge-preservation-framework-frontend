import {
    GITHUB_STATUS_REQUEST,
    GITHUB_STATUS_SUCCESS,
    GITHUB_STATUS_FAILURE,
    GITHUB_STATUS_CLEAR,
} from "../../actionTypes/github/githubStatusActionTypes";

export const fetchGithubStatusRequest = () => ({
    type: GITHUB_STATUS_REQUEST,
});

export const fetchGithubStatusSuccess = (payload: any) => ({
    type: GITHUB_STATUS_SUCCESS,
    payload,
});

export const fetchGithubStatusFailure = (payload: string) => ({
    type: GITHUB_STATUS_FAILURE,
    payload,
});

export const clearGithubStatus = () => ({
    type: GITHUB_STATUS_CLEAR,
});