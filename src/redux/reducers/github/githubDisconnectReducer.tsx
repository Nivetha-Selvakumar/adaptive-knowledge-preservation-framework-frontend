import {
    GITHUB_DISCONNECT_REQUEST,
    GITHUB_DISCONNECT_SUCCESS,
    GITHUB_DISCONNECT_FAILURE,
    GITHUB_DISCONNECT_CLEAR,
} from "../../actionTypes/github/githubDisconnectActionTypes";

interface GithubDisconnectState {
    loading: boolean;
    success: boolean;
    message: string | null;
    error: string | null;
}

const initialState: GithubDisconnectState = {
    loading: false,
    success: false,
    message: null,
    error: null,
};

const githubDisconnectReducer = (
    state = initialState,
    action: any
): GithubDisconnectState => {

    switch (action.type) {

        case GITHUB_DISCONNECT_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                message: null,
                error: null,
            };

        case GITHUB_DISCONNECT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload,
                error: null,
            };

        case GITHUB_DISCONNECT_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                message: null,
                error: action.payload,
            };

        case GITHUB_DISCONNECT_CLEAR:
            return initialState;

        default:
            return state;
    }

};

export default githubDisconnectReducer;