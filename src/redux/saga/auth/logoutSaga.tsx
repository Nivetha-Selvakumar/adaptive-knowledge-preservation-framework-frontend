import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { AUTH } from "../../endpoints/endpoints";
import {
    fetchUserLogoutFailure,
    fetchUserLogoutSuccess,
} from "../../actions/auth/logoutAction";
import { USER_LOGOUT_REQUEST } from "../../actionTypes/auth/logoutActionTypes";

function* fetchUserLogoutSaga(action: any): Generator<any, void, any> {
    try {
        const { authToken, ...payload } = action.payload;

        const response = yield call(
            axios.post,
            AUTH.USER_LOGOUT,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );

        yield put(fetchUserLogoutSuccess(response.data));
    } catch (error: any) {
        yield put(
            fetchUserLogoutFailure(
                error?.response?.data?.message || "Something went wrong!"
            )
        );
    }
}

export function* watchFetchUserLogoutData() {
    yield takeLatest(USER_LOGOUT_REQUEST, fetchUserLogoutSaga);
}