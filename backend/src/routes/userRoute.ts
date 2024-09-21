import { userLogin, userSignUp } from "../controller/userController";
import express from 'express'

const userRoute = express.Router()

userRoute.post('/login', userLogin)
userRoute.post('/signUp', userSignUp)


export default userRoute