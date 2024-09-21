import axios, { AxiosError, AxiosRequestConfig } from "axios";
import apiConfig from "../../utils/api";


export const allProducts = async()=>{
    try{
        const productConfig : AxiosRequestConfig = {
            url:apiConfig.allProducts,
            method:"get",
        }

        console.log(productConfig)
        const response = await axios(productConfig)
        return response.data

    }catch(error:unknown){
        console.log(error)
        throw new Error(error instanceof AxiosError ? error?.response?.data?.message : String(error))
    }
}