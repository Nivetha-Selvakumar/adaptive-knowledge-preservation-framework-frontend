import { combineReducers } from "@reduxjs/toolkit";
import UserLoginReducer from "./reducers/login/loginReducer";
import CreateUserReducer from "./reducers/auth/createUserReducer";
import UserLogoutReducer from "./reducers/auth/logoutReducer";
import ForgotPasswordReducer from "./reducers/auth/forgetPasswordReducer";
import ResetPasswordReducer from "./reducers/auth/resetPasswordReducer";
import GithubCallbackReducer from "./reducers/github/githubCallbackReducer";
import GithubConnectReducer from "./reducers/github/githubConnectReducer";

const rootReducer = combineReducers({
   userLoginReducer: UserLoginReducer,
   createUserReducer: CreateUserReducer,
   userLogoutReducer: UserLogoutReducer,
   forgotPasswordReducer: ForgotPasswordReducer,
   resetPasswordReducer: ResetPasswordReducer,
   githubCallbackReducer: GithubCallbackReducer,
   githubConnectReducer: GithubConnectReducer,


});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;