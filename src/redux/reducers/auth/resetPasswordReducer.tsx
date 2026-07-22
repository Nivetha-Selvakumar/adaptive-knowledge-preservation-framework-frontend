import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_CLEAR,
} from "../../actionTypes/auth/resetPasswordActionTypes";

const initialState = {
    resetPassword: null,
    resetPasswordLoading: false,
    error: null,
};

const resetPasswordReducer = (
    state = initialState,
    action: any
) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                resetPassword: null,
                resetPasswordLoading: true,
                error: null,
            };

        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPassword: action.payload,
                resetPasswordLoading: false,
                error: null,
            };

        case RESET_PASSWORD_FAILURE:
            return {
                ...state,
                resetPassword: null,
                resetPasswordLoading: false,
                error: action.payload,
            };

        case RESET_PASSWORD_CLEAR:
            return initialState;

        default:
            return state;
    }
};

export default resetPasswordReducer;