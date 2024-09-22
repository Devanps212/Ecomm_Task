import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { singleProduct } from "../../../../features/api/products";
import { ICart, IProduct } from "../../../../interfaces/productInterface";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../../../features/redux/slices/cart/cart';
import { Color } from "../../../../interfaces/productInterface";
import './productDetail.css';
import { root } from "../../../../features/redux/reducers/reducer";
import { jwtDecode } from "jwt-decode";
import { payload } from "../../../../interfaces/productInterface";


const Detail = () => {
    const [product, setProduct] = useState<IProduct | null>(null);
    const [size, setSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<{ name: string; color: string } | null>(null);
    const [activeImage, setActiveImage] = useState('');

    const token = useSelector((state:root)=>state.token.token)

    const { productId } = useParams();
    const dispatch = useDispatch();
    const Pid = atob(productId!);

    useEffect(() => {
        const productFind = async () => {
            try {
                const response = await singleProduct(Pid);
                setProduct(response.product);
                setActiveImage(response.product.images[0])
                setSize('M')
                setSelectedColor({ name: "Muted_Blue_Gradient", color: Color.Muted_Blue_Gradient })
            } catch (error) {
                toast.error(String(error));
            }
        };
        productFind();
    }, [Pid]);

    const handleAddToCart = (product: IProduct) => {

        if (!token) {
            toast.warning("Please login to add items to cart");
            return;
        }

        let validCheck : payload;

        try {
            validCheck = jwtDecode(token);
        } catch (error) {
            console.error("Invalid token:", error);
            toast.warning("Your session has expired. Please log in again.");
            return;
        }
        const cartItem: ICart = {
            id: product._id!,
            name: product.name,
            price: product.price,
            size: size,
            color: selectedColor!,
            image: product.images[0],
            userId: validCheck.id
        };

        dispatch(addItem(cartItem));
        toast.success(`${product.name} added to cart`);
    };

    
    const clothColors = [
        { name: "Muted_Blue_Gradient", color: Color.Muted_Blue_Gradient },
        { name: "Crimson_Red", color: Color.Crimson_Red },
        { name: "Tropical", color: Color.Tropical },
    ];

    const handleSetColour = (color: { name: string; color: string }) => {
        setSelectedColor(color);
    };

    return (
        <div className="container-fluid p-5">
            {product && (
                <>
                    <div className="row">
                        <div className="col-md-4 col-12 d-flex justify-content-center align-items-center">
                            <div>
                                <img src={activeImage} alt={product.name} className="img-fluid rounded shadow w-100 mb-3" />
                                <div className="d-flex">
                                    {product.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Thumbnail ${index}`}
                                            className="img-thumbnail me-2"
                                            style={{
                                                cursor: "pointer",
                                                width: "80px",
                                                height: "80px",
                                                objectFit: "cover",
                                            }}
                                            onClick={() => setActiveImage(image)} 
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-12">
                            <h1 className="mb-3">{product.name}</h1>
                            <p className="lead">{product.description}</p>
                            <h3 className="text-success mb-4">₹{product.price}</h3>
                            <h5>Select Colour:</h5>
                            <div className="d-flex my-4">
                                {clothColors.map((color, index) => (
                                    <div
                                        key={index}
                                        className="rounded-circle me-3"
                                        onClick={() => handleSetColour(color)}
                                        style={{
                                            background: color.color,
                                            width: "40px",
                                            height: "40px",
                                            border: selectedColor?.name === color.name ? "2px solid #333" : "none",
                                            cursor: "pointer",
                                        }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                            <h5>Size:</h5>
                            <div>
                                <select onChange={(e) => setSize(e.target.value)} value={size}>
                                    {["S", "M", "L", "XL", "XXL"].map((data, index) => (
                                        <option value={data} key={index}>
                                            {data}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4">
                                <button onClick={() => handleAddToCart(product)} className="btn btn-primary me-2">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12">
                        <h4>Additional Information</h4>
                            <p>
                                This product is built with precision and high-quality materials, ensuring longevity and consistent performance. 
                                Crafted from durable fabrics, it provides exceptional comfort and breathability, making it ideal for both everyday wear and special occasions.
                            </p>
                            <p>
                                <strong>Key Features:</strong>
                            </p>
                            <ul>
                                <li>Enhanced durability: Reinforced stitching and high-quality materials that withstand wear and tear.</li>
                                <li>Comfort fit: Designed to provide a flattering fit while allowing for easy movement.</li>
                                <li>Versatile style: Suitable for a variety of occasions, from casual outings to formal events.</li>
                                <li>Easy care: Machine washable for hassle-free maintenance, retaining its shape and color after multiple washes.</li>
                            </ul>
                            <p>
                                <strong>Care Instructions:</strong>
                            </p>
                            <ul>
                                <li>Machine wash cold with similar colors.</li>
                                <li>Tumble dry low or hang to dry to maintain fabric quality.</li>
                                <li>Iron on low heat if necessary, avoiding direct contact with printed designs.</li>
                            </ul>
                            <p>
                                Elevate your wardrobe with this premium product that combines style, comfort, and practicality. Perfect for those who appreciate quality craftsmanship and attention to detail.
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Detail;
