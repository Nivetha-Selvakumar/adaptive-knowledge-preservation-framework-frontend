import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
    GITHUB_SYNC_REQUEST
} from "../../actionTypes/github/githubSyncActionTypes";

import {
    fetchGithubSyncSuccess,
    fetchGithubSyncFailure
} from "../../actions/github/githubSyncAction";
import { AUTH } from "../../endpoints/endpoints";

const syncGithubApi = () => {

    const token = localStorage.getItem("authToken");

    return axios.post(
        AUTH.GITHUB_SYNC,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

function* githubSyncWorker(): Generator<any, void, any> {

    try {

        const response = yield call(syncGithubApi);

        yield put(
            fetchGithubSyncSuccess(response.data)
        );

    } catch (error: any) {

        yield put(
            fetchGithubSyncFailure(
                error?.response?.data?.message ||
                error?.message ||
                "GitHub Sync Failed"
            )
        );

    }

}

export function* watchGithubSync() {

    yield takeLatest(
        GITHUB_SYNC_REQUEST,
        githubSyncWorker
    );

}