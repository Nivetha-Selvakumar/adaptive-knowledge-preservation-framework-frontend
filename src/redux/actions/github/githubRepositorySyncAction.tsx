import {
    GITHUB_REPOSITORY_SYNC_REQUEST,
    GITHUB_REPOSITORY_SYNC_SUCCESS,
    GITHUB_REPOSITORY_SYNC_FAILURE,
    GITHUB_REPOSITORY_SYNC_CLEAR,
} from "../../actionTypes/github/githubRepositorySyncActionTypes";

export const fetchGithubRepositorySyncRequest = (
    repositoryId: string
) => ({
    type: GITHUB_REPOSITORY_SYNC_REQUEST,
    payload: repositoryId,
});

export const fetchGithubRepositorySyncSuccess = (
    response: any
) => ({
    type: GITHUB_REPOSITORY_SYNC_SUCCESS,
    payload: response,
});

export const fetchGithubRepositorySyncFailure = (
    error: string
) => ({
    type: GITHUB_REPOSITORY_SYNC_FAILURE,
    payload: error,
});

export const clearGithubRepositorySync = () => ({
    type: GITHUB_REPOSITORY_SYNC_CLEAR,
});