import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialValues = {
    token : localStorage.getItem('token') ?? null
}

const tokenSlice = createSlice({
    name:"token",
    initialState: initialValues,
    reducers:{
        setToken : (state, action: PayloadAction<string>)=>{
            state.token = action.payload
            localStorage.setItem('token', action.payload)
        },
        removeToken: (state)=>{
            state.token = null
            localStorage.removeItem("token")
        }
    }
})

export const { removeToken, setToken } = tokenSlice.actions
export default tokenSlice.reducer