import {
    GITHUB_CALLBACK_REQUEST,
    GITHUB_CALLBACK_SUCCESS,
    GITHUB_CALLBACK_FAILURE,
    GITHUB_CALLBACK_CLEAR,
} from "../../actionTypes/github/githubCallbackActionTypes";

export const fetchGithubCallbackRequest = (payload: any) => ({
    type: GITHUB_CALLBACK_REQUEST,
    payload,
});

export const fetchGithubCallbackSuccess = (data: any) => ({
    type: GITHUB_CALLBACK_SUCCESS,
    payload: data,
});

export const fetchGithubCallbackFailure = (error: any) => ({
    type: GITHUB_CALLBACK_FAILURE,
    payload: error,
});

export const fetchGithubCallbackClear = () => ({
    type: GITHUB_CALLBACK_CLEAR,
});