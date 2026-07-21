import { USER_LOGOUT_CLEAR, USER_LOGOUT_FAILURE, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS } from "../../actionTypes/auth/logoutActionTypes";

export const fetchUserLogoutRequest = (payload: any) => ({
    type: USER_LOGOUT_REQUEST,
    payload,
});

export const fetchUserLogoutSuccess = (data: any) => ({
    type: USER_LOGOUT_SUCCESS,
    payload: data,
});

export const fetchUserLogoutFailure = (error: any) => ({
    type: USER_LOGOUT_FAILURE,
    payload: error,
});

export const fetchUserLogoutClear = () => ({
    type: USER_LOGOUT_CLEAR,
});