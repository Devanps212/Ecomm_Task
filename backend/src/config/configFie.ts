import dotenv from 'dotenv'

dotenv.config()

const configData = {
    mongoURI: process.env.MONGO_URI,
    PORT: process.env.PORT
}


export default configData