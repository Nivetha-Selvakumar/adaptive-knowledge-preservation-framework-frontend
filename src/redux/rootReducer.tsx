import { combineReducers } from "@reduxjs/toolkit";
import UserLoginReducer from "./reducers/login/loginReducer";

const rootReducer = combineReducers({
   userLoginReducer: UserLoginReducer,


});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;