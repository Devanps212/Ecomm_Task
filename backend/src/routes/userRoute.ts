import { userLogin, userSignUp } from "../controller/userController";
import express from 'express'
import { validateUserLogin, validateUserSignUp } from "../services/validator";

const userRoute = express.Router()

userRoute.post('/login', validateUserLogin, userLogin)
userRoute.post('/signUp', validateUserSignUp, userSignUp)


export default userRoute