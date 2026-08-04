import { combineReducers } from "@reduxjs/toolkit";
import UserLoginReducer from "./reducers/login/loginReducer";
import CreateUserReducer from "./reducers/auth/createUserReducer";
import UserLogoutReducer from "./reducers/auth/logoutReducer";
import ForgotPasswordReducer from "./reducers/auth/forgetPasswordReducer";
import ResetPasswordReducer from "./reducers/auth/resetPasswordReducer";
import GithubCallbackReducer from "./reducers/github/githubCallbackReducer";
import GithubConnectReducer from "./reducers/github/githubConnectReducer";
import GithubSyncReducer from "./reducers/github/githubSyncReducer";
import GithubHistoryReducer from "./reducers/github/githubHistoryReducer";
import GithubStatusReducer from "./reducers/github/githubStatusReducer";
import GithubDisconnectReducer from "./reducers/github/githubDisconnectReducer";
import GithubRepositoryReducer from "./reducers/github/githubRepositoryReducer";
import DashboardSummaryReducer from "./reducers/dashboard/dashboardSummaryReducers";

const rootReducer = combineReducers({
   userLoginReducer: UserLoginReducer,
   createUserReducer: CreateUserReducer,
   userLogoutReducer: UserLogoutReducer,
   forgotPasswordReducer: ForgotPasswordReducer,
   resetPasswordReducer: ResetPasswordReducer,
   githubCallbackReducer: GithubCallbackReducer,
   githubConnectReducer: GithubConnectReducer,
   githubSyncReducer: GithubSyncReducer,
   githubHistoryReducer: GithubHistoryReducer,
   dashboardSummaryReducer: DashboardSummaryReducer,
   githubStatusReducer: GithubStatusReducer,
   githubDisconnectReducer: GithubDisconnectReducer,
   githubRepositoryReducer: GithubRepositoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;