import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_CLEAR,
} from "../../actionTypes/auth/resetPasswordActionTypes";

export const fetchResetPasswordRequest = (payload: any) => ({
    type: RESET_PASSWORD_REQUEST,
    payload,
});

export const fetchResetPasswordSuccess = (data: any) => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: data,
});

export const fetchResetPasswordFailure = (error: any) => ({
    type: RESET_PASSWORD_FAILURE,
    payload: error,
});

export const fetchResetPasswordClear = () => ({
    type: RESET_PASSWORD_CLEAR,
});