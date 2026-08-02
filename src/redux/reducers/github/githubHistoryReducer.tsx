import {
    GITHUB_HISTORY_REQUEST,
    GITHUB_HISTORY_SUCCESS,
    GITHUB_HISTORY_FAILURE,
    GITHUB_HISTORY_CLEAR
} from "../../actionTypes/github/githubHistoryActionTypes";

const initialState = {
    githubHistory: [],
    githubHistoryLoading: false,
    githubHistoryError: null

};

const githubHistoryReducer = (
    state = initialState,
    action: any
) => {

    switch (action.type) {
        case GITHUB_HISTORY_REQUEST:
            return {
                ...state,
                githubHistoryLoading: true,
                githubHistoryError: null
            };

        case GITHUB_HISTORY_SUCCESS:
            return {
                ...state,
                githubHistoryLoading: false,
                githubHistory: action.payload,
                githubHistoryError: null
            };

        case GITHUB_HISTORY_FAILURE:
            return {
                ...state,
                githubHistoryLoading: false,
                githubHistoryError: action.payload
            };

        case GITHUB_HISTORY_CLEAR:
            return initialState;

        default:
            return state;
    }
};

export default githubHistoryReducer;