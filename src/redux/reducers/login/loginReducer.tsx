import { USER_LOGIN_CLEAR, USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../../actionTypes/login/loginActionTypes";

const initialState = {
    userLogin: null,
    userLoginLoading: false,
    error: null,
};

const userLoginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                userLogin: null,
                userLoginLoading: true,
                error: null,
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                userLogin: action.payload,
                userLoginLoading: false,
                error: null,
            };
        case USER_LOGIN_FAILURE:
            return {
                ...state,
                userLogin: null,
                userLoginLoading: false,
                error: action.payload,
            };
        case USER_LOGIN_CLEAR:
            return {
                userLogin: null,
                userLoginLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default userLoginReducer;

