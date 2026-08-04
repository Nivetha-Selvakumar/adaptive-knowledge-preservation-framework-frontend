import {
    GITHUB_REPOSITORY_REQUEST,
    GITHUB_REPOSITORY_SUCCESS,
    GITHUB_REPOSITORY_FAILURE,
    GITHUB_REPOSITORY_CLEAR,
} from "../../actionTypes/github/githubRepositoryActionTypes";

export const fetchGithubRepositoryRequest = () => ({
    type: GITHUB_REPOSITORY_REQUEST,
});

export const fetchGithubRepositorySuccess = (
    repositories: any[]
) => ({
    type: GITHUB_REPOSITORY_SUCCESS,
    payload: repositories,
});

export const fetchGithubRepositoryFailure = (
    error: string
) => ({
    type: GITHUB_REPOSITORY_FAILURE,
    payload: error,
});

export const clearGithubRepository = () => ({
    type: GITHUB_REPOSITORY_CLEAR,
});