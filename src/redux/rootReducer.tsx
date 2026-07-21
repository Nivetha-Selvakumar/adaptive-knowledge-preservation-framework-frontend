import { combineReducers } from "@reduxjs/toolkit";
import UserLoginReducer from "./reducers/login/loginReducer";
import CreateUserReducer from "./reducers/auth/createUserReducer";
import UserLogoutReducer from "./reducers/auth/logoutReducer";
import ForgotPasswordReducer from "./reducers/auth/forgetPasswordReducer";

const rootReducer = combineReducers({
   userLoginReducer: UserLoginReducer,
   createUserReducer: CreateUserReducer,
   userLogoutReducer: UserLogoutReducer,
   forgotPasswordReducer: ForgotPasswordReducer,


});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;