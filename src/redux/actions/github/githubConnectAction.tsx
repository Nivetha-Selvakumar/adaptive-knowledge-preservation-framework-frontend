import {
    GITHUB_CONNECT_REQUEST,
    GITHUB_CONNECT_SUCCESS,
    GITHUB_CONNECT_FAILURE,
    GITHUB_CONNECT_CLEAR,
} from "../../actionTypes/github/githubConnectActionTypes";


export const fetchGithubConnectRequest = (payload?: any) => ({
    type: GITHUB_CONNECT_REQUEST,
    payload,
});

export const fetchGithubConnectSuccess = (data: any) => ({
    type: GITHUB_CONNECT_SUCCESS,
    payload: data,
});

export const fetchGithubConnectFailure = (error: any) => ({
    type: GITHUB_CONNECT_FAILURE,
    payload: error,
});

export const fetchGithubConnectClear = () => ({
    type: GITHUB_CONNECT_CLEAR,
});