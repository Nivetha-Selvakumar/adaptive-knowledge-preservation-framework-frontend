import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_CLEAR } from "../../actionTypes/auth/forgetPasswordActionTypes";

const initialState = {
    forgotPassword: null,
    forgotPasswordLoading: false,
    error: null
};

const forgotPasswordReducer = (state = initialState, action: any) => {

    switch (action.type) {

        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                forgotPassword: null,
                forgotPasswordLoading: true,
                error: null
            };

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                forgotPassword: action.payload,
                forgotPasswordLoading: false,
                error: null
            };

        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                forgotPassword: null,
                forgotPasswordLoading: false,
                error: action.payload
            };

        case FORGOT_PASSWORD_CLEAR:
            return initialState;

        default:
            return state;
    }

}

export default forgotPasswordReducer;