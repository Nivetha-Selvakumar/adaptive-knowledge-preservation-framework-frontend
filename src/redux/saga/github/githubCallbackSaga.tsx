import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { AUTH } from "../../endpoints/endpoints";



import showToast from "../../../common-component/toastNotification";
import { fetchGithubCallbackFailure, fetchGithubCallbackSuccess } from "../../actions/github/githubCallbackAction";
import { GITHUB_CALLBACK_REQUEST } from "../../actionTypes/github/githubCallbackActionTypes";

let isPrevent = false;

function* fetchGithubCallbackSaga(action: any): Generator<any, void, any> {

    if (isPrevent) return;

    try {

        isPrevent = true;

        const response = yield call(
            axios.get,
            `${AUTH.GITHUB_CALLBACK}?code=${action.payload.code}`
        );

        const data = response.data;

        yield put(fetchGithubCallbackSuccess(data));

        showToast("GitHub connected successfully.", "success");

    } catch (error: any) {

        const message =
            error?.response?.data?.message ||
            "GitHub authorization failed.";

        yield put(fetchGithubCallbackFailure(message));

        showToast(message, "error");

    } finally {

        isPrevent = false;

    }

}

export function* watchFetchGithubCallback() {

    yield takeLatest(
        GITHUB_CALLBACK_REQUEST,
        fetchGithubCallbackSaga
    );

}