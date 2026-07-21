import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    CREATE_USER_CLEAR,
} from "../../actionTypes/auth/createUserActionTypes";

export const fetchCreateUserRequest = (payload: any) => ({
    type: CREATE_USER_REQUEST,
    payload,
});

export const fetchCreateUserSuccess = (data: any) => ({
    type: CREATE_USER_SUCCESS,
    payload: data,
});

export const fetchCreateUserFailure = (error: any) => ({
    type: CREATE_USER_FAILURE,
    payload: error,
});

export const fetchCreateUserClear = () => ({
    type: CREATE_USER_CLEAR,
});