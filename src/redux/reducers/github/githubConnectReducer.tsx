import {
    GITHUB_CONNECT_REQUEST,
    GITHUB_CONNECT_SUCCESS,
    GITHUB_CONNECT_FAILURE,
    GITHUB_CONNECT_CLEAR,
} from "../../actionTypes/github/githubConnectActionTypes";


const initialState = {
    githubConnect: null,
    githubConnectLoading: false,
    error: null,
};

const githubConnectReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GITHUB_CONNECT_REQUEST:
            return {
                ...state,
                githubConnect: null,
                githubConnectLoading: true,
                error: null,
            };

        case GITHUB_CONNECT_SUCCESS:
            return {
                ...state,
                githubConnect: action.payload,
                githubConnectLoading: false,
                error: null,
            };

        case GITHUB_CONNECT_FAILURE:
            return {
                ...state,
                githubConnect: null,
                githubConnectLoading: false,
                error: action.payload,
            };

        case GITHUB_CONNECT_CLEAR:
            return {
                githubConnect: null,
                githubConnectLoading: false,
                error: null,
            };

        default:
            return state;
    }
};

export default githubConnectReducer;