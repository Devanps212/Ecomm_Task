import productModel from '../models/retailerModel'
import expressAsyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { ImageType } from '../interfaces/productInterface'
import cloudinary from '../config/cloudinaryConfig'
import exp from 'constants'


const productAdd = expressAsyncHandler(
    async(req: Request, res: Response)=>{
        const { name, description, price, stock, colour, size } = req.body
        
        const product = await productModel.findOne({name})

        if(product){
            res.status(409).json({message:"Product already exists"})
            return
        }else{

            console.log("file check")
            const files = req.files;
            
            let imagesPaths : ImageType[] = []
            if (!files || files.length === 0) {
                res.status(404).json({ message: "No uploaded image found" });
                return;
            } else if (Array.isArray(files)) {
                imagesPaths = files.map((file) => ({
                    public_id: file.filename, 
                    url: file.path          
                }));
            } else {
                console.error("Files is not an array");
            }

            console.log(imagesPaths)

            const productCreate = await productModel.create({
                name,
                description,
                price,
                stock,
                colour,
                size,
                images:imagesPaths
            })

            if(productCreate){
                res.status(200).json({message:"product creation success"})
            }else{
                res.status(500).json({error:"Internal server error"})
            }
        }
    }
)

const editProduct = expressAsyncHandler(
    async(req: Request, res:Response)=>{
        console.log("reached controller for update")
        const { _id, name, description, price, stock, colour, size, deletedImage } = req.body

        const product = await productModel.findById(_id)

        const files = req.files as Express.Multer.File[]

        console.log("updating")

        if(!product){
            res.status(404).json({message:"product not found"})
            return
        }

        product.name = name
        product.description = description
        product.price = price
        product.stock = stock
        
        if(colour && Array.isArray(colour)){
            product.colour = colour
        }

        if(size && Array.isArray(size)){
            product.size = size
        }
        try{
            if(deletedImage){
                const image = Array.isArray(deletedImage) ? deletedImage : [deletedImage]
                
                for(const public_id of image){
                    
                    await cloudinary.uploader.destroy(public_id)

                    await productModel.updateOne({_id:_id},{$pull:{images:{public_id}}}) 
                }
            }
            console.log("updating")
        }catch(error){
            res.status(500).json({message:"Internal server error"})
        }

        let newImages : ImageType[] = []
        if(files && Array.isArray(files)){
            newImages = files.map(data=>({
                public_id: data.filename,
                url:data.path
            }))
        }

        product.images.push(...newImages)

        try {
            const savedProduct = await product.save();
            res.status(200).json({ message: "Updated successfully", product: savedProduct });
            return
        } catch (error) {
            res.status(500).json({ error: "Internal server error while saving product" });
            return
        }
    }
)

const deleteProduct = expressAsyncHandler(
    async(req: Request, res: Response)=>{
        const { _id } = req.body

        const product = await productModel.findOneAndDelete(_id)

        if (!product) {
            res.status(404).json({ message: "Product not found." });
            return;
        }

        res.status(200).json({ message: "Product deleted successfully." });
    }
)

const allProducts = expressAsyncHandler(
    async(req:Request, res:Response)=>{
        const products =await productModel.find()
        console.log(products)

        if(products.length > 0){
            res.status(200).json({message:"success", products})
            return
        }

        res.status(404).json({ message: "No products found" });
    }
)

export {
    productAdd,
    editProduct,
    deleteProduct,
    allProducts
}