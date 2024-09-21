import apiConfig from "../../utils/api";
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const login = async(email: string, password: string)=>{
    try{
        const loginConfig : AxiosRequestConfig = {
            url:apiConfig.login,
            method:"post",
            data:{
                email, 
                password
            }
        }

        const response = await axios(loginConfig)
        console.log(response)
        return response.data

    }catch (error: unknown) {
        console.log(error)
        throw new Error(error instanceof AxiosError ? error?.response?.data.message : String(error));
    }
}

export const signUp = async(name:string, email: string, password: string)=>{
    try{
        const signUpConfig : AxiosRequestConfig = {
            url:apiConfig.signUp,
            method:"post",
            data:{
                name,
                email, 
                password
            }
        }

        const response = await axios(signUpConfig)
        console.log(response)
        return response.data

    }catch(error:unknown){
        console.log(error)
        throw new Error(error instanceof AxiosError ? error?.response?.data?.message : String(error))
    }
}

