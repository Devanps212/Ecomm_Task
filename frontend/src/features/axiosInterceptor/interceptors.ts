import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"

export const userInterceptor = ()=>{
    const token = localStorage.getItem('token')

    axios.interceptors.request.use(
        (config: InternalAxiosRequestConfig<unknown>)=>{
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            }else{
                throw new Error("no token found")
            }
            return config
        },
        (error: AxiosError) => {
            throw new Error(error.message);
        }
    )
}