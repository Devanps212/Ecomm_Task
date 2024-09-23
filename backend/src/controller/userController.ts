import expressAsyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import userModel from '../models/userModel'
import bcrypt from 'bcrypt'
import { userInterface } from '../interfaces/userInterface'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'


const userLogin = expressAsyncHandler(
    async(req: Request, res: Response)=>{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
            return
        }

        const {email, password} = req.body

        console.log(email, password)
        const user :userInterface | null = await userModel.findOne({email})
        if(!user){
            res.status(409).json({message:"user not found"})
        }else{
            const passCheck = await bcrypt.compare(password, user.password)

            if(!passCheck){
                res.status(401).json({message:"Pasword not matching"})
            }else{
                const payload = {
                    role:"user",
                    id: user._id
                }
    
                const token = jwt.sign(payload, process.env.SECRET_kEY!, {expiresIn:"3d"})
    
                res.status(200).json({message: "Login success", token})
            }
        }
    }
)

const userSignUp = expressAsyncHandler(
    async(req: Request, res: Response)=>{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return
        }

        const { name, email, password } = req.body

        const user = await userModel.findOne({email})

        if(user){
            res.status(409).json({message:"user already exists"})
        }else{
            const hashPass = await bcrypt.hash(password, 10)

            const save = await userModel.create({name, password: hashPass,email})

            if(!save){
                res.status(500).json({error:"Internal Server error"})
            }else{
                res.status(200).json({message:"SignUp successfull"})
            }
        }
    }
)

export {
    userLogin,
    userSignUp
}