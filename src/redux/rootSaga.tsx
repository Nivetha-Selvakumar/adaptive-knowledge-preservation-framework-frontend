import { all } from "redux-saga/effects";

import { watchFetchUserLoginData } from "./saga/login/loginSaga";
import { watchFetchCreateUserData } from "./saga/auth/createUserSaga";
import { watchFetchUserLogoutData } from "./saga/auth/logoutSaga";
import { watchForgotPassword } from "./saga/auth/forgetPasswordSaga";
import { watchResetPassword } from "./saga/auth/resetPasswordSaga";
// import { watchFetchGithubCallback } from "./saga/github/githubCallbackSaga";
import { watchFetchGithubConnect } from "./saga/github/githubConnectSaga";
import { watchGithubSync } from "./saga/github/githubSyncSaga";
import { watchFetchGithubStatus } from "./saga/github/githubStatusSaga";
import { watchFetchGithubDisconnect } from "./saga/github/githubDisconnectSaga";
import { watchFetchGithubRepository } from "./saga/github/githubRepositorySaga";

export default function* rootSaga() {
    yield all([
        watchFetchUserLoginData(),
        watchFetchCreateUserData(),
        watchFetchUserLogoutData(),
        watchForgotPassword(),
        watchResetPassword(),
        // watchFetchGithubCallback(),
        watchFetchGithubConnect(),
        watchGithubSync(),
        watchFetchGithubStatus(),
        watchFetchGithubDisconnect(),
        watchFetchGithubRepository(),
    ]);
}