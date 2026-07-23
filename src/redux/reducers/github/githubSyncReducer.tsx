import {
    GITHUB_SYNC_REQUEST,
    GITHUB_SYNC_SUCCESS,
    GITHUB_SYNC_FAILURE,
    GITHUB_SYNC_CLEAR,
} from "../../actionTypes/github/githubSyncActionTypes";


const initialState = {
    githubSync: null,
    githubSyncLoading: false,
    error: null,
};

const githubSyncReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GITHUB_SYNC_REQUEST:
            return {
                ...state,
                githubSync: null,
                githubSyncLoading: true,
                error: null,
            };

        case GITHUB_SYNC_SUCCESS:
            return {
                ...state,
                githubSync: action.payload,
                githubSyncLoading: false,
                error: null,
            };

        case GITHUB_SYNC_FAILURE:
            return {
                ...state,
                githubSync: null,
                githubSyncLoading: false,
                error: action.payload,
            };

        case GITHUB_SYNC_CLEAR:
            return {
                githubSync: null,
                githubSyncLoading: false,
                error: null,
            };

        default:
            return state;
    }
};

export default githubSyncReducer;