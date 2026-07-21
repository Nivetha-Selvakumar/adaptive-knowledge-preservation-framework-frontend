import { USER_LOGOUT_CLEAR, USER_LOGOUT_FAILURE, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS } from "../../actionTypes/auth/logoutActionTypes";

const initialState = {
    userLogout: null,
    userLogoutLoading: false,
    error: null,
};

const userLogoutReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case USER_LOGOUT_REQUEST:
            return {
                ...state,
                userLogoutLoading: true,
                error: null,
            };

        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                userLogoutLoading: false,
                userLogout: action.payload,
                error: null,
            };

        case USER_LOGOUT_FAILURE:
            return {
                ...state,
                userLogoutLoading: false,
                error: action.payload,
            };

        case USER_LOGOUT_CLEAR:
            return initialState;

        default:
            return state;
    }
};

export default userLogoutReducer;