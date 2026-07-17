// src/redux/sagas/LoginPage/loginSaga.ts

import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { AUTH } from "../../endpoints/endpoints";
import { setCookie } from "../../../utils/funtional";

import showToast from "../../../common-component/toastNotification";
import { USER_LOGIN_REQUEST } from "../../actionTypes/login/loginActionTypes";
import { fetchUserLoginFailure, fetchUserLoginSuccess } from "../../actions/login/loginAction";

// ✅ Helper function to set header globally
function setAuthHeader(token: string) {
    if (token) {
        axios.defaults.headers.common["Auth-token"] = token;
    } else {
        delete axios.defaults.headers.common["Auth-token"];
    }
}

let isPrevent = false;

function* fetchUserLoginSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;
        const payload = action.payload;

        // 🔹 API call
        const response = yield call(axios.post, AUTH.USER_LOGIN, payload);
        const data = response?.data;
        // ✅ Token handling
        if (data?.data?.authToken) {
            localStorage.setItem("authToken", data?.data?.authToken);
            setCookie("authToken", data?.data?.authToken);
            setAuthHeader(data?.data?.authToken);
        }

        // ✅ Dispatch success
        yield put(fetchUserLoginSuccess(data));

    } catch (error: any) {
        const message = error?.response?.data?.message || "Something went wrong!";
        yield put(fetchUserLoginFailure(message));
        showToast(message, "error", "Login-Container");
    } finally {
        isPrevent = false;
    }
}

export function* watchFetchUserLoginData() {
    yield takeLatest(USER_LOGIN_REQUEST, fetchUserLoginSaga);
}
