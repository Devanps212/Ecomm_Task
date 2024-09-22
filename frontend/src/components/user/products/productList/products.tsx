import './products.css';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { allProducts } from '../../../../features/api/products';
import { IProduct } from '../../../../interfaces/productInterface';



const Products = () => {

    const [products, setProducts] = useState<IProduct[]>([]);
    const [filterProducts, setFilterProducts] = useState<IProduct[]>([])
    const [filterPrice, setFilterPrice] = useState<number | null>(null)
    const [searchVal, setSearchVal] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)

    const itemsPerPage = 6

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await allProducts();
                if (response && response.products) {
                    setProducts(response.products);
                    setFilterProducts(response.products)

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

    

    const handlePriceChange = (price:number)=>{
        setFilterPrice(price)
        
        const data = products.filter((data)=>{
            if(price === 1000){
                return data.price < 1000
            }else if(price === 2500){
                return data.price > 2500
            }else{
                return data.price >= (price -500) && data.price <= price
            }
        })
        setFilterProducts(data)
        setCurrentPage(1)
    }

    const handleStockChange = ()=>{
        const data = filterProducts.filter(data=>data.stock > 0)
        console.log(data)
        setFilterProducts(data)
        setCurrentPage(1)
    }

    const handleSearch = ()=>{
        const regex = new RegExp(String(searchVal), 'i')

        const data = products.filter(product=>regex.test(product.name))
        setFilterProducts(data)
        setCurrentPage(1)
    }


    const totalPage = Math.ceil(filterProducts.length / itemsPerPage)

    const currentItems = filterProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center align-items-center">
                <div className="row w-100">
                    <div className="col-md-3 col-12 d-none d-md-block">
                        <div className="left-content p-3 border border-dark rounded shadow">
                            <h3>Filter By</h3>
                            <h5 className="lead">Price:</h5>
                            {[1000, 1500, 2000, 2500].map((price, index) => (
                                <div key={index}>
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            value={price}
                                            onChange={() => handlePriceChange(price)} 
                                            checked={filterPrice === price} 
                                        />
                                        {price === 1000 
                                            ? `Under ₹${price}` 
                                            : price !== 2500 
                                            ? `₹${price - 500} - ₹${price}`
                                            : `Above ₹${price}`}
                                    </label>
                                </div>
                            ))}
                            <h5 className='lead mt-5'>Stock available</h5>
                            <label>
                                <input type="radio" onChange={handleStockChange} /> In Stock
                            </label>
                            
                        </div>
                    </div>
                    <div className="col-md-9 col-12">
                        <div className='d-flex justify-content-between align-items-center mb-2'>
                            <h3>Products</h3>
                            <div className="d-flex">
                                <input type='text' onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSearchVal(e.target.value.trim())} className='form-control me-2' placeholder="Search" />
                                <button onClick={handleSearch} className='btn btn-primary'>Search</button>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="row">
                                { currentItems.length > 0 ?  currentItems.map(product => {
                                    const encodedId = btoa(product._id!)
                                    return(
                                    <div className="col-md-4 col-12 mb-4" key={encodedId}>
                                        <div className="card h-100 shadow-sm">
                                            <img className="card-img-top p-3" alt={product.name} src={product.images[0] || "https://via.placeholder.com/150"} />
                                            <div className="card-body">
                                                <h5 className="card-title">{product.name}</h5>
                                                <p className="card-text">₹{product.price}</p>
                                                <a href={`/detail/${encodedId}`} className="btn btn-primary ms-2 w-100">View Details</a>
                                            </div>
                                        </div>
                                    </div>
                                )}) : (
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <h1 className='display-3'>No products found</h1>
                                    </div>
                                )}
                            </div>
                        </div>
                        {
                            totalPage > 1 &&  (
                                <div className='d-flex justify-content-center align-items-center'>
                                    <Pagination>
                                        {
                                            Array.from({length: totalPage}).map((_, index)=>(
                                                <>
                                                <Pagination.Item key={index} active={index + 1 == currentPage} onClick={()=>setCurrentPage(index+1)}>{index+1}</Pagination.Item>
                                                </>
                                            ))
                                        }
                                    </Pagination>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
