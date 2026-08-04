import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import showToast from "../../../common-component/toastNotification";

import { AUTH } from "../../endpoints/endpoints";

import {
    fetchGithubStatusSuccess,
    fetchGithubStatusFailure,
} from "../../actions/github/githubStatusAction";

import {
    GITHUB_STATUS_REQUEST,
} from "../../actionTypes/github/githubStatusActionTypes";

let isPrevent = false;

function* fetchGithubStatusSaga(): Generator<any, void, any> {

    if (isPrevent) return;

    try {

        isPrevent = true;

        const token = localStorage.getItem("authToken");

        if (!token) {
            throw new Error("User is not authenticated.");
        }

        const response = yield call(
            axios.get,
            AUTH.GITHUB_STATUS,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        yield put(
            fetchGithubStatusSuccess(response.data)
        );

    } catch (error: any) {

        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Unable to fetch GitHub status.";

        yield put(
            fetchGithubStatusFailure(message)
        );

        showToast(message, "error");

    } finally {

        isPrevent = false;

    }

}

export function* watchFetchGithubStatus() {

    yield takeLatest(
        GITHUB_STATUS_REQUEST,
        fetchGithubStatusSaga
    );

}