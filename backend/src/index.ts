import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import configData from './config/configFie'
import userRoute from './routes/userRoute'
import productRoute from './routes/productRoute'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()


const app = express()
const PORT = configData.PORT || 5000

mongoose.connect(configData.mongoURI!)
.then(()=>{
    console.log("connected to mongoDB")
})
.catch((err)=>{
    console.log(err)
})


const corsOptions = {
    origin : "*",
    methods:["GET", "POST", "DELETE", "PUT", "PATCH"],
    exposedHeaders: [
        "Cross-Origin-Opener-Policy",
        "Cross-Origin-Resource-Policy",
        "Access-Control-Allow-Origin",
      ],
}



app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(cors(corsOptions))

app.use('/', userRoute)
app.use('/products', productRoute)

app.listen(PORT, ()=>{
    console.log(`listening to Port ${PORT}`)
})