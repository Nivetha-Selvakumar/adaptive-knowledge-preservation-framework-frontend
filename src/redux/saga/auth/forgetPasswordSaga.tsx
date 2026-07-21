import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { AUTH } from "../../endpoints/endpoints";
import { FORGOT_PASSWORD_REQUEST } from "../../actionTypes/auth/forgetPasswordActionTypes";
import { fetchForgotPasswordFailure, fetchForgotPasswordSuccess } from "../../actions/auth/forgetPasswordAction";

function* fetchForgotPasswordSaga(action: any): Generator<any, void, any> {
    try {
        console.log("Forgot Password Saga Called");

        const response = yield call(
            axios.post,
            AUTH.FORGOT_PASSWORD,
            action.payload
        );

        console.log(response);

        yield put(fetchForgotPasswordSuccess(response.data));
    } catch (error: any) {
        console.log(error);

        yield put(
            fetchForgotPasswordFailure(
                error?.response?.data?.message || "Something went wrong"
            )
        );
    }
}

export function* watchForgotPassword() {
    yield takeLatest(
        FORGOT_PASSWORD_REQUEST,
        fetchForgotPasswordSaga
    );
}