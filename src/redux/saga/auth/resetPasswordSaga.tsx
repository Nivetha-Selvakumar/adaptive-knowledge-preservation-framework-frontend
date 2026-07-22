import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
    RESET_PASSWORD_REQUEST,
} from "../../actionTypes/auth/resetPasswordActionTypes";

import {
    fetchResetPasswordSuccess,
    fetchResetPasswordFailure,
} from "../../actions/auth/resetPasswordAction";
import { AUTH } from "../../endpoints/endpoints";

function* resetPasswordSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(
            axios.post,
            AUTH.RESET_PASSWORD,
            action.payload
        );

        yield put(
            fetchResetPasswordSuccess(response.data)
        );
    } catch (error: any) {
        yield put(
            fetchResetPasswordFailure(
                error?.response?.data?.message ||
                "Something went wrong"
            )
        );
    }
}

export function* watchResetPassword() {
    yield takeLatest(
        RESET_PASSWORD_REQUEST,
        resetPasswordSaga
    );
}