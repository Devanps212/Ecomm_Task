import { productAdd, editProduct, deleteProduct, allProducts, oneProduct } from "../controller/productController";
import express from 'express'
import auth from "../middlewares/authentication";
import upload from "../services/multer";

const productRoute = express.Router()

productRoute.post('/add', upload.array('images', 3), productAdd)
productRoute.patch('/update', upload.array('images', 3), editProduct)
productRoute.delete('/delete/:_id', deleteProduct)
productRoute.get('/all', allProducts)
productRoute.get('/OneProduct/:id', oneProduct)

export default productRoute