import { useState } from "react";
import { Button } from 'react-bootstrap';
import { FaTrash } from "react-icons/fa";
import './cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Red Dress", price: 50, quantity: 1, color: "Red", size: "M" },
        { id: 2, name: "Blue Dress", price: 60, quantity: 1, color: "Blue", size: "L" },
        { id: 3, name: "Green Dress", price: 40, quantity: 1, color: "Green", size: "S" },
    ]);

    const handleRemoveItem = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="container-fluid" style={{ marginTop: "100px" }}>
            <div className="row">
                <h3>Shopping Cart</h3>
                <div className="col-md-8 col-12 cart-items">
                    {cartItems.map((item) => (
                        <div key={item.id} className="card mb-3">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img
                                        src="https://via.placeholder.com/150"
                                        className="img-fluid rounded-start h-100"
                                        alt={item.name}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <div className="row">
                                            <div className="col-4">
                                                <p className="card-text">Price: ${item.price}</p>
                                                <p className="card-text">Quantity: {item.quantity}</p>
                                            </div>
                                            <div className="col-4">
                                                <p className="card-text">
                                                    Color: <strong>{item.color}</strong>
                                                </p>
                                                <p className="card-text">
                                                    Size: <strong>{item.size}</strong>
                                                </p>
                                            </div>
                                            <div className="col-4">
                                                <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
                                                    <FaTrash/>
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="d-flex mt-4 align-items-center justify-content-center me-4">
                                            <p className="mb-0 me-2">Select Quantity:</p>
                                            <select style={{ height: "auto", width: "40px" }} className="rounded">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-4 col-12">
                    <div className="p-3 border border-dark rounded shadow">
                        <h4>Summary</h4>
                        <ul className="list-group mb-3">
                            {cartItems.map((item) => (
                                <li key={item.id} className="list-group-item d-flex justify-content-between">
                                    <span>{item.name} ({item.size}, {item.color})</span>
                                    <span>${item.price * item.quantity}</span>
                                </li>
                            ))}
                        </ul>
                        <h5 className="d-flex justify-content-between">
                            <span>Total Amount:</span>
                            <span>${totalAmount}</span>
                        </h5>
                        <button className="btn btn-primary w-100 mt-3">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;