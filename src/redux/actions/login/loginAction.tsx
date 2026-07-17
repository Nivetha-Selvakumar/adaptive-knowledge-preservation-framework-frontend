// actions.js

import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGIN_CLEAR } from "../../actionTypes/login/loginActionTypes";

export const fetchUserLoginRequest = (payload: any) => ({
    type: USER_LOGIN_REQUEST,
    payload: payload,
});

export const fetchUserLoginSuccess = (data: string) => ({
    type: USER_LOGIN_SUCCESS,
    payload: data,
});

export const fetchUserLoginFailure = (error: any) => ({
    type: USER_LOGIN_FAILURE,
    payload: error,
});
export const fetchUserLoginClear = (data: any) => ({
    type: USER_LOGIN_CLEAR,
    payload: data,
});
