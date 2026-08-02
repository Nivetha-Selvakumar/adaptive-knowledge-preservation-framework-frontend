import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { AUTH } from "../../endpoints/endpoints";
import showToast from "../../../common-component/toastNotification";

import { GITHUB_HISTORY_REQUEST } from "../../actionTypes/github/githubHistoryActionTypes";

import {
    fetchGithubHistoryFailure,
    fetchGithubHistorySuccess,
} from "../../actions/github/githubHistoryAction";

let isPrevent = false;

function* fetchGithubHistorySaga(action: any): Generator<any, void, any> {

    if (isPrevent) return;

    try {

        isPrevent = true;

        const response = yield call(

            axios.get,

            AUTH.GITHUB_HISTORY,

            {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            }

        );

        const data = response?.data;

        yield put(
            fetchGithubHistorySuccess(data)
        );

    } catch (error: any) {

        const message =
            error?.response?.data?.message ||
            "Unable to fetch GitHub history";

        yield put(
            fetchGithubHistoryFailure(message)
        );

        showToast(message, "error");

    } finally {

        isPrevent = false;

    }

}

export function* watchFetchGithubHistory() {

    yield takeLatest(
        GITHUB_HISTORY_REQUEST,
        fetchGithubHistorySaga
    );

}