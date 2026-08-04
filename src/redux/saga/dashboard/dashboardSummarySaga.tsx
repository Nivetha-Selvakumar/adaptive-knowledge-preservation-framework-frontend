import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { AUTH } from "../../endpoints/endpoints";
import showToast from "../../../common-component/toastNotification";

import { DASHBOARD_SUMMARY_REQUEST } from "../../actionTypes/dashboard/dashboardSummaryActionTypes";
import { fetchDashboardSummaryFailure, fetchDashboardSummarySuccess } from "../../actions/dashboard/dashboardSummaryAction";


let isPrevent = false;

function* fetchDashboardSummarySaga(): Generator<any, void, any> {

    if (isPrevent) return;

    try {

        isPrevent = true;
        // const payload = action.payload;
        const response = yield call(axios.get, AUTH.DASHBOARD_SUMMARY,
            {
                headers: {
                    Authorization: localStorage.getItem("authToken"),
                },
            }
        );

        const data = response?.data;

        yield put(fetchDashboardSummarySuccess(data));

    } catch (error: any) {

        const message = error?.response?.data?.message || "Unable to fetch dashboard summary";
        yield put(fetchDashboardSummaryFailure(message));
        showToast(message, "error");

    } finally {
        isPrevent = false;
    }
}

export function* watchFetchDashboardSummary() {

    yield takeLatest(DASHBOARD_SUMMARY_REQUEST, fetchDashboardSummarySaga);

}