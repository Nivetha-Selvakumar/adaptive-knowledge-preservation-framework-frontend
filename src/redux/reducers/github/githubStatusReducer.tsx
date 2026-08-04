import {
    GITHUB_STATUS_REQUEST,
    GITHUB_STATUS_SUCCESS,
    GITHUB_STATUS_FAILURE,
    GITHUB_STATUS_CLEAR,
} from "../../actionTypes/github/githubStatusActionTypes";

interface GithubStatusState {
    loading: boolean;
    connected: boolean;
    data: any;
    error: string | null;
}

const initialState: GithubStatusState = {
    loading: false,
    connected: false,
    data: null,
    error: null,
};

const githubStatusReducer = (
    state = initialState,
    action: any
): GithubStatusState => {

    switch (action.type) {

        case GITHUB_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case GITHUB_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                connected: action.payload.connected,
                data: action.payload,
                error: null,
            };

        case GITHUB_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                connected: false,
                data: null,
                error: action.payload,
            };

        case GITHUB_STATUS_CLEAR:
            return initialState;

        default:
            return state;
    }
};

export default githubStatusReducer;