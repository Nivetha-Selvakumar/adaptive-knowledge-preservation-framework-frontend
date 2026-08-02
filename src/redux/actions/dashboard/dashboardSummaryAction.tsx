// actions.js

import { DASHBOARD_SUMMARY_REQUEST, DASHBOARD_SUMMARY_SUCCESS, DASHBOARD_SUMMARY_FAILURE, DASHBOARD_SUMMARY_CLEAR } from "../../actionTypes/dashboard/dashboardSummaryActionTypes";

export const fetchDashboardSummaryRequest = (payload: any) => ({
    type: DASHBOARD_SUMMARY_REQUEST,
    payload: payload,
});

export const fetchDashboardSummarySuccess = (data: string) => ({
    type: DASHBOARD_SUMMARY_SUCCESS,
    payload: data,
});

export const fetchDashboardSummaryFailure = (error: any) => ({
    type: DASHBOARD_SUMMARY_FAILURE,
    payload: error,
});
export const fetchDashboardSummaryClear = (data: any) => ({
    type: DASHBOARD_SUMMARY_CLEAR,
    payload: data,
});
