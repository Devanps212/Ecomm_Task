import { ObjectId } from "mongoose"

export interface userInterface{
    _id?:ObjectId
    name: string,
    password: string
}