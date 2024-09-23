import productModel from '../models/retailerModel'
import expressAsyncHandler from 'express-async-handler'
import { Request, Response } from 'express'


const productAdd = expressAsyncHandler(
    async(req: Request, res: Response)=>{
        const { name, description, price, stock} = req.body
        
        const product = await productModel.findOne({name})

        if(product){
            res.status(409).json({message:"Product already exists"})
            return
        }else{
            const files = req.files;
            
            let imagesPaths : string[] = []
            if (!files || files.length === 0) {
                res.status(404).json({ message: "No uploaded image found" });
                return;
            } else if (Array.isArray(files)) {
                imagesPaths = files.map((file) => file.path);
            } else {
                console.error("Files is not an array");
            }

            console.log(imagesPaths)

            const productCreate = await productModel.create({
                name,
                description,
                price,
                stock,
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
    async (req: Request, res: Response) => {
        const { _id, name, description, price, stock, imagesToDelete } = req.body;

        const product = await productModel.findById(_id);

        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return
        }

        product.name = name;
        product.description = description;
        product.price = price;
        product.stock = stock;

        const files = req.files as Express.Multer.File[];
        let newImages: string[] = [];

        if (files && Array.isArray(files)) {
            newImages = files.map(file => file.path);
        }

        const imagesToDeleteArray = Array.isArray(imagesToDelete) ? imagesToDelete : []

        product.images = product.images.filter(img => !imagesToDeleteArray.includes(img))

        product.images.push(...newImages)

        try {
            const savedProduct = await product.save();
            res.status(200).json({ message: "Updated successfully", product: savedProduct })
        } catch (error) {
            res.status(500).json({ error: "Internal server error while saving product" })
        }
    }
);



const deleteProduct = expressAsyncHandler(
    async(req: Request, res: Response)=>{
        const { _id } = req.params

        const product = await productModel.findOneAndDelete({_id:_id})

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

        if(products.length > 0){
            res.status(200).json({message:"success", products})
            return
        }

        res.status(404).json({ message: "No products found" });
    }
)

const oneProduct = expressAsyncHandler(
    async(req: Request, res: Response)=>{
        const {id} = req.params

        const product = await productModel.findOne({_id: id})
        
        if(!product){
            res.status(404).json({message:"product not found"})
            return
        }
        res.status(200).json({message:"product found", product})
    }
)

export {
    productAdd,
    editProduct,
    deleteProduct,
    allProducts,
    oneProduct
}