import { all } from "redux-saga/effects";

import { watchFetchUserLoginData } from "./saga/login/loginSaga";

export default function* rootSaga() {
    yield all([
        watchFetchUserLoginData(),

    ]);
}