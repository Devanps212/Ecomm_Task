import { Request } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from '../config/cloudinaryConfig';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req: Request, file: Express.Multer.File) => {
        const folder = `Ecomm/${req.body.name}`;
        const public_id = `${Date.now()}-${file.originalname}`;

        return {
            folder: folder,
            public_id: public_id,
            transformation: [
                { width: 500, height: 500, crop: 'fill', quality: 'auto' }, // Change 'limit' to 'fill'
            ],
        };
    },
});

const upload = multer({ storage });

export default upload;
