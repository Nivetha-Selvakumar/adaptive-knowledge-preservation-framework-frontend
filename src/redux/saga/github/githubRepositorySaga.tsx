import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import showToast from "../../../common-component/toastNotification";

import { AUTH } from "../../endpoints/endpoints";

import {
    fetchGithubRepositorySuccess,
    fetchGithubRepositoryFailure,
} from "../../actions/github/githubRepositoryAction";

import {
    GITHUB_REPOSITORY_REQUEST,
} from "../../actionTypes/github/githubRepositoryActionTypes";

let isPrevent = false;

function* fetchGithubRepositorySaga(): Generator<any, void, any> {

    if (isPrevent) return;

    try {

        isPrevent = true;

        const token = localStorage.getItem("authToken");

        if (!token) {

            throw new Error("User is not authenticated.");

        }

        const response = yield call(
            axios.get,
            AUTH.GITHUB_REPOSITORIES,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        yield put(
            fetchGithubRepositorySuccess(
                response.data
            )
        );

    } catch (error: any) {

        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Unable to fetch GitHub repositories.";

        yield put(
            fetchGithubRepositoryFailure(message)
        );

        showToast(
            message,
            "error"
        );

    } finally {

        isPrevent = false;

    }

}

export function* watchFetchGithubRepository() {

    yield takeLatest(
        GITHUB_REPOSITORY_REQUEST,
        fetchGithubRepositorySaga
    );

}