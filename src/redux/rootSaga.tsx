import { all } from "redux-saga/effects";

import { watchFetchUserLoginData } from "./saga/login/loginSaga";
import { watchFetchCreateUserData } from "./saga/auth/createUserSaga";
import { watchFetchUserLogoutData } from "./saga/auth/logoutSaga";
import { watchForgotPassword } from "./saga/auth/forgetPasswordSaga";

export default function* rootSaga() {
    yield all([
        watchFetchUserLoginData(),
        watchFetchCreateUserData(),
        watchFetchUserLogoutData(),
        watchForgotPassword(),


    ]);
}