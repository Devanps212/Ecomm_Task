const Detail = () => {
    
    const product = {
        id: 1,
        name: "Product 1",
        description: "This is a detailed description of Product 1, carefully crafted to highlight its premium features, outstanding benefits, and why it stands out in the market.",
        price: "$100",
        imageUrl: "https://via.placeholder.com/400",
    };

    return (
        <div className="container-fluid p-5" style={{marginTop:"75px"}}>
            <div className="row">
                <div className="col-md-4 col-12">
                    <img src={product.imageUrl} alt={product.name} className="img-fluid rounded shadow w-100" />
                </div>
                <div className="col-md-6 col-12">
                    <h1 className="mb-3">{product.name}</h1>
                    <p className="lead">{product.description}</p>
                    <h3 className="text-success mb-4">{product.price}</h3>
                    <h5>Select Colour:</h5>
                    <div className="d-flex my-4">
                        <div className="rounded-circle border border-dark bg-success" style={{width:"40px", height:"40px"}}></div>
                        <div className="rounded-circle border border-dark ms-2 bg-primary" style={{width:"40px", height:"40px"}}></div>
                        <div className="rounded-circle border border-dark ms-2 bg-warning" style={{width:"40px", height:"40px"}}></div>
                    </div>
                    <h5>Size:</h5>
                    <div>
                        <select>
                            <option>XL</option>
                            <option>XXL</option>
                            <option>LG</option>
                            <option>SM</option>
                        </select>
                    </div>
                    
                    <div className="mt-4">
                        <a href="/cart" className="btn btn-primary me-2">Add to Cart</a>
                        <button className="btn btn-outline-secondary">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
            <div className="col-12">
                    <h4>Additional Information</h4>
                    <p>
                        This product is built with precision and high-quality materials, ensuring longevity and consistent performance. 
                        The lightweight design allows for easy portability, while still maintaining a robust structure that can endure 
                        regular use. With dimensions of 12 x 8 x 4 inches, it offers a compact form factor that is convenient for both 
                        storage and daily use. Additionally, it comes in a range of stylish colors, including black, silver, and blue, 
                        allowing users to choose the best option to fit their personal preferences or home decor.
                    </p>
                    <p>
                        The product also boasts an impressive battery life, providing up to 12 hours of continuous use on a single charge, 
                        making it ideal for extended use without constant recharging. The cutting-edge technology integrated into this 
                        product ensures smooth and efficient operation, whether it's being used for personal tasks or professional applications. 
                        Moreover, the product is environmentally friendly, incorporating energy-efficient components that reduce power consumption 
                        and help lower your carbon footprint.
                    </p>
                    <p>
                        In terms of compatibility, this product can seamlessly integrate with a variety of other devices and systems, 
                        enhancing its functionality and versatility. Its user-friendly interface allows for simple and intuitive operation, 
                        even for first-time users. Whether you're a seasoned professional or a hobbyist, this product is designed to meet 
                        your needs with reliability and style.
                    </p>
                    <p>
                        Overall, this product offers a perfect balance of performance, durability, and design, making it a valuable addition 
                        to any setup. Whether you're looking for advanced features or simply a high-quality, long-lasting product, it provides 
                        exceptional value across the board.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Detail;
