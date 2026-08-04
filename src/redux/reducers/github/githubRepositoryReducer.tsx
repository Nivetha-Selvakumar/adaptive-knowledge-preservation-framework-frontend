import {
    GITHUB_REPOSITORY_REQUEST,
    GITHUB_REPOSITORY_SUCCESS,
    GITHUB_REPOSITORY_FAILURE,
    GITHUB_REPOSITORY_CLEAR,
} from "../../actionTypes/github/githubRepositoryActionTypes";

interface GithubRepositoryState {
    loading: boolean;
    repositories: any[];
    error: string | null;
}

const initialState: GithubRepositoryState = {
    loading: false,
    repositories: [],
    error: null,
};

const githubRepositoryReducer = (state = initialState, action: any): GithubRepositoryState => {

    switch (action.type) {
        case GITHUB_REPOSITORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case GITHUB_REPOSITORY_SUCCESS:
            return {
                ...state,
                loading: false,
                repositories: action.payload,
            };

        case GITHUB_REPOSITORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case GITHUB_REPOSITORY_CLEAR:
            return initialState;

        default:
            return state;
    }
};
export default githubRepositoryReducer;