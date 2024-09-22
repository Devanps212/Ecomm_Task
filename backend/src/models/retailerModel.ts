import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
},{timestamps:true})

const productModel = mongoose.model("Product", schema)

export default productModel