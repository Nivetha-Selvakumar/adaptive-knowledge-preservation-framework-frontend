import {
    DASHBOARD_SUMMARY_REQUEST,
    DASHBOARD_SUMMARY_SUCCESS,
    DASHBOARD_SUMMARY_FAILURE,
    DASHBOARD_SUMMARY_CLEAR
} from "../../actionTypes/dashboard/dashboardSummaryActionTypes";

const initialState = {
    dashboardSummary: null,
    dashboardSummaryLoading: false,
    dashboardSummaryError: null
};

const dashboardSummaryReducer = (
    state = initialState,
    action: any
) => {

    switch (action.type) {

        case DASHBOARD_SUMMARY_REQUEST:
            return {
                ...state,
                dashboardSummaryLoading: true,
                dashboardSummaryError: null
            };

        case DASHBOARD_SUMMARY_SUCCESS:
            return {
                ...state,
                dashboardSummaryLoading: false,
                dashboardSummary: action.payload,
                dashboardSummaryError: null
            };

        case DASHBOARD_SUMMARY_FAILURE:
            return {
                ...state,
                dashboardSummaryLoading: false,
                dashboardSummaryError: action.payload
            };

        case DASHBOARD_SUMMARY_CLEAR:
            return {
                ...initialState
            };

        default:
            return state;
    }

};

export default dashboardSummaryReducer;