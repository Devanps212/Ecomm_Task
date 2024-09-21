import { combineReducers } from "redux";
import token from "../slices/userToken/token";

const rootReducer  = combineReducers({
    token: token
})

export default rootReducer

export type root = ReturnType<typeof rootReducer>