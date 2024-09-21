import { productAdd, editProduct, deleteProduct, allProducts } from "../controller/productController";
import express from 'express'
import auth from "../middlewares/authentication";
import upload from "../services/multer";

const productRoute = express.Router()

productRoute.post('/add', upload.array('images', 3), productAdd)
productRoute.patch('/update', upload.array('images', 3), editProduct)
productRoute.delete('/delete', deleteProduct)
productRoute.get('/all', allProducts)

export default productRoute