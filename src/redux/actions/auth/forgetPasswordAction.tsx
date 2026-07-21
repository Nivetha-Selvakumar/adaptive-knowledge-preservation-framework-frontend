import { FORGOT_PASSWORD_CLEAR, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS } from "../../actionTypes/auth/forgetPasswordActionTypes";

export const fetchForgotPasswordRequest = (payload: any) => ({
    type: FORGOT_PASSWORD_REQUEST,
    payload,
});

export const fetchForgotPasswordSuccess = (data: any) => ({
    type: FORGOT_PASSWORD_SUCCESS,
    payload: data,
});

export const fetchForgotPasswordFailure = (error: any) => ({
    type: FORGOT_PASSWORD_FAILURE,
    payload: error,
});

export const fetchForgotPasswordClear = () => ({
    type: FORGOT_PASSWORD_CLEAR,
});