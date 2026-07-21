import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    CREATE_USER_CLEAR,
} from "../../actionTypes/auth/createUserActionTypes";

const initialState = {
    createUser: null,
    createUserLoading: false,
    error: null,
};

const createUserReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CREATE_USER_REQUEST:
            return {
                ...state,
                createUser: null,
                createUserLoading: true,
                error: null,
            };

        case CREATE_USER_SUCCESS:
            return {
                ...state,
                createUser: action.payload,
                createUserLoading: false,
                error: null,
            };

        case CREATE_USER_FAILURE:
            return {
                ...state,
                createUser: null,
                createUserLoading: false,
                error: action.payload,
            };

        case CREATE_USER_CLEAR:
            return {
                createUser: null,
                createUserLoading: false,
                error: null,
            };

        default:
            return state;
    }
};

export default createUserReducer;