import { combineReducers } from "redux";
import token from "../slices/userToken/token";
import cart from '../slices/cart/cart'


const rootReducer  = combineReducers({
    token: token, 
    cart: cart
})

export default rootReducer

export type root = ReturnType<typeof rootReducer>