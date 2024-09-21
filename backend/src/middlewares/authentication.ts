import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken'

const auth = expressAsyncHandler(
    async(req: Request, res: Response, next: NextFunction)=>{
        const authHead = req.headers.authorization

        console.log("data : ", authHead)
        if(!authHead){
            res.status(401).json({message:"token not found user is un authorized"})
            return
        }
        const token = authHead.split(' ')[1]
        try{
            const verifyToken = jwt.verify(token, process.env.SECRET_kEY as string)

            if(!verifyToken){
                res.status(403).json({message:"Invalid token"})
                return
            }else{
                next()
            }
        } catch(error){
            res.status(500).json(error)
            return
        }
    }
)

export default auth
