import { put, takeLatest } from "redux-saga/effects";



import showToast from "../../../common-component/toastNotification";
import { AUTH } from "../../endpoints/endpoints";
import { fetchGithubConnectFailure } from "../../actions/github/githubConnectAction";
import { GITHUB_CONNECT_REQUEST } from "../../actionTypes/github/githubConnectActionTypes";

let isPrevent = false;

function* fetchGithubConnectSaga(): Generator<any, void, any> {

    if (isPrevent) return;

    try {

        isPrevent = true;

        // yield put(fetchGithubConnectSuccess("Redirecting to GitHub..."));

        window.location.href = AUTH.GITHUB_CONNECT;

    } catch (error: any) {

        const message = error?.message || "Unable to connect GitHub.";

        yield put(fetchGithubConnectFailure(message));

        showToast(message, "error");
    } finally {

        isPrevent = false;

    }

}

export function* watchFetchGithubConnect() {

    yield takeLatest(
        GITHUB_CONNECT_REQUEST,
        fetchGithubConnectSaga
    );

}