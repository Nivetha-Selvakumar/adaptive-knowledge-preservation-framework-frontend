import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import showToast from "../../../common-component/toastNotification";

import { AUTH } from "../../endpoints/endpoints";

import {
    fetchGithubRepositorySyncSuccess,
    fetchGithubRepositorySyncFailure,
} from "../../actions/github/githubRepositorySyncAction";

import {
    GITHUB_REPOSITORY_SYNC_REQUEST,
} from "../../actionTypes/github/githubRepositorySyncActionTypes";

let isPrevent = false;

function* fetchGithubRepositorySyncSaga(
    action: any
): Generator<any, void, any> {

    if (isPrevent) return;

    try {
        isPrevent = true;
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("User is not authenticated.");
        }
        const response = yield call(
            axios.post,
            `${AUTH.GITHUB_REPOSITORY_SYNC}/${action.payload}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        yield put(fetchGithubRepositorySyncSuccess(response.data));

        showToast(response.data.message, "success");

    } catch (error: any) {

        const message = error?.response?.data?.message || error?.message || "Unable to synchronize repository.";

        yield put(fetchGithubRepositorySyncFailure(message));

        showToast(message, "error");
    } finally {
        isPrevent = false;
    }

}

export function* watchFetchGithubRepositorySync() {

    yield takeLatest(GITHUB_REPOSITORY_SYNC_REQUEST, fetchGithubRepositorySyncSaga);

}