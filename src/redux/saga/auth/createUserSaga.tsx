// src/redux/sagas/CreateUser/createUserSaga.ts

import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { AUTH } from "../../endpoints/endpoints";
import showToast from "../../../common-component/toastNotification";

import { CREATE_USER_REQUEST } from "../../actionTypes/auth/createUserActionTypes";
import {
    fetchCreateUserFailure,
    fetchCreateUserSuccess,
} from "../../actions/auth/createUserAction";

let isPrevent = false;

function* fetchCreateUserSaga(action: any): Generator<any, void, any> {
    if (isPrevent) return;

    try {
        isPrevent = true;

        const payload = action.payload;

        // API Call
        const response = yield call(
            axios.post,
            AUTH.CREATE_USER,
            payload
        );

        const data = response?.data;

        // Dispatch Success
        yield put(fetchCreateUserSuccess(data));

        // Success Toast
        showToast(data?.message || "User created successfully!", "success");

    } catch (error: any) {
        const message =
            error?.response?.data?.message || "Something went wrong!";

        yield put(fetchCreateUserFailure(message));

        // Error Toast
        showToast(message, "error");

    } finally {
        isPrevent = false;
    }
}

export function* watchFetchCreateUserData() {
    yield takeLatest(CREATE_USER_REQUEST, fetchCreateUserSaga);
}