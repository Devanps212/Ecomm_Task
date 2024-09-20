import './products.css'

const Products = () => {
    
    const products = [
        { id: 1, name: "Product 1", price: "$20" },
        { id: 2, name: "Product 2", price: "$30" },
        { id: 3, name: "Product 3", price: "$40" },
        { id: 4, name: "Product 4", price: "$50" },
        { id: 5, name: "Product 5", price: "$60" },
        { id: 6, name: "Product 6", price: "$70" },
        { id: 7, name: "Product 7", price: "$80" },
        { id: 8, name: "Product 8", price: "$90" },
        { id: 9, name: "Product 9", price: "$100" },
    ];

    return (
        <>
            <div className="container-fluid vh-100 p-5" style={{marginTop:"75px"}}>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="row w-100">
                        <div className="col-md-3 col-12 d-none d-md-block">
                            <div className="left-content p-3 border border-dark rounded shadow">
                                <h3>Filter By</h3>
                                <h5 className="lead">Price:</h5>
                                <div>
                                    <label>
                                        <input type="checkbox" /> Under $₹20
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="checkbox" /> ₹20 - ₹50
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="checkbox" /> ₹50 - ₹100
                                    </label>
                                </div>
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
                            <div>
                                <h3>Products</h3>
                            </div>
                            <div className="d-flex">
                                <input type='text' className='form-control me-2' placeholder="Search" />
                                <button className='btn btn-primary'>Search</button>
                            </div>
                        </div>

                            <div className="right-content">
                                <div className="row">
                                    {products.map(product => (
                                        <div className="col-md-4 col-12 mb-4" key={product.id}>
                                            <div className="card h-100">
                                                <img className="card-img-top p-3" alt={product.name} src="https://via.placeholder.com/150"/>
                                                <div className="card-body">
                                                    <h5 className="card-title">{product.name}</h5>
                                                    <p className="card-text">{product.price}</p>
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
        </>
    );
};

export default Products;
