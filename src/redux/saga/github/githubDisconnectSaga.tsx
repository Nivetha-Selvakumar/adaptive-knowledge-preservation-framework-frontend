
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import showToast from "../../../common-component/toastNotification";

import { AUTH } from "../../endpoints/endpoints";

import {
    fetchGithubDisconnectSuccess,
    fetchGithubDisconnectFailure,
} from "../../actions/github/githubDisconnectAction";

import {
    GITHUB_DISCONNECT_REQUEST,
} from "../../actionTypes/github/githubDisconnectActionTypes";

import {
    GITHUB_STATUS_REQUEST,
} from "../../actionTypes/github/githubStatusActionTypes";

let isPrevent = false;

function* fetchGithubDisconnectSaga(): Generator<any, void, any> {

    if (isPrevent) return;

    try {

        isPrevent = true;

        const token = localStorage.getItem("authToken");

        if (!token) {
            throw new Error("User is not authenticated.");
        }

        const response = yield call(
            axios.delete,
            AUTH.GITHUB_DISCONNECT,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        yield put(
            fetchGithubDisconnectSuccess(
                response.data.message
            )
        );

        showToast(
            response.data.message,
            "success"
        );

        yield put({
            type: GITHUB_STATUS_REQUEST,
        });

    } catch (error: any) {

        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Unable to disconnect GitHub.";

        yield put(
            fetchGithubDisconnectFailure(message)
        );

        showToast(message, "error");

    } finally {

        isPrevent = false;

    }

}

export function* watchFetchGithubDisconnect() {

    yield takeLatest(
        GITHUB_DISCONNECT_REQUEST,
        fetchGithubDisconnectSaga
    );

}