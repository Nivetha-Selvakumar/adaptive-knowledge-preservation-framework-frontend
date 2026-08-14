import {
    GITHUB_REPOSITORY_SYNC_REQUEST,
    GITHUB_REPOSITORY_SYNC_SUCCESS,
    GITHUB_REPOSITORY_SYNC_FAILURE,
    GITHUB_REPOSITORY_SYNC_CLEAR,
} from "../../actionTypes/github/githubRepositorySyncActionTypes";

interface GithubRepositorySyncState {
    loading: boolean;
    response: any;
    error: string | null;
}

const initialState: GithubRepositorySyncState = {
    loading: false,
    response: null,
    error: null,
};

const githubRepositorySyncReducer = (
    state = initialState,
    action: any
): GithubRepositorySyncState => {

    switch (action.type) {
        case GITHUB_REPOSITORY_SYNC_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case GITHUB_REPOSITORY_SYNC_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.payload,
            };

        case GITHUB_REPOSITORY_SYNC_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case GITHUB_REPOSITORY_SYNC_CLEAR:
            return initialState;

        default:
            return state;
    }
};

export default githubRepositorySyncReducer;