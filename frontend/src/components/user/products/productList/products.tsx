import './products.css';
import { allProducts } from '../../../../features/api/products';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IProduct } from '../../../../interfaces/productInterface';

const Products = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await allProducts();
                if (response && response.products) {
                    setProducts(response.products);
                } else {
                    toast.error("No products found.");
                }
            } catch (error: unknown) {
                console.error("error : ", error);
                toast.error(String(error));
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center align-items-center">
                <div className="row w-100">
                    <div className="col-md-3 col-12 d-none d-md-block">
                        <div className="left-content p-3 border border-dark rounded shadow">
                            <h3>Filter By</h3>
                            <h5 className="lead">Price:</h5>
                            {[20, 50, 100].map((price, index) => (
                                <div key={index}>
                                    <label>
                                        <input type="checkbox" /> {price === 20 ? `Under ₹${price}` : `₹${price - 30} - ₹${price}`}
                                    </label>
                                </div>
                            ))}
                            <div>
                                <label>
                                    <input type="checkbox" /> Above ₹100
                                </label>
                            </div>
                            <h5 className="lead mt-4">Categories:</h5>
                            <select className="form-select">
                                <option value="">Select a category</option>
                                <option value="electronics">Electronics</option>
                                <option value="books">Books</option>
                                <option value="clothing">Clothing</option>
                                <option value="toys">Toys</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-9 col-12">
                        <div className='d-flex justify-content-between align-items-center mb-2'>
                            <h3>Products</h3>
                            <div className="d-flex">
                                <input type='text' className='form-control me-2' placeholder="Search" />
                                <button className='btn btn-primary'>Search</button>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="row">
                                {products.map(product => (
                                    <div className="col-md-4 col-12 mb-4" key={product._id}>
                                        <div className="card h-100">
                                            <img className="card-img-top p-3" alt={product.name} src={product.images[0]?.url || "https://via.placeholder.com/150"} />
                                            <div className="card-body">
                                                <h5 className="card-title">{product.name}</h5>
                                                <p className="card-text">₹{product.price}</p>
                                                <a href="/cart" className="btn btn-primary">Add to Cart</a>
                                                <a href="/detail" className="btn btn-primary ms-2">View</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <h5 className='text-center p-2'>Pagination</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
