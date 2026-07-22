import { GITHUB_CALLBACK_CLEAR, GITHUB_CALLBACK_FAILURE, GITHUB_CALLBACK_REQUEST, GITHUB_CALLBACK_SUCCESS } from "../../actionTypes/github/githubCallbackActionTypes";


const initialState = {
    githubCallback: null,
    githubCallbackLoading: false,
    error: null,
};

const githubCallbackReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GITHUB_CALLBACK_REQUEST:
            return {
                ...state,
                githubCallback: null,
                githubCallbackLoading: true,
                error: null,
            };

        case GITHUB_CALLBACK_SUCCESS:
            return {
                ...state,
                githubCallback: action.payload,
                githubCallbackLoading: false,
                error: null,
            };

        case GITHUB_CALLBACK_FAILURE:
            return {
                ...state,
                githubCallback: null,
                githubCallbackLoading: false,
                error: action.payload,
            };

        case GITHUB_CALLBACK_CLEAR:
            return {
                githubCallback: null,
                githubCallbackLoading: false,
                error: null,
            };

        default:
            return state;
    }
};

export default githubCallbackReducer;