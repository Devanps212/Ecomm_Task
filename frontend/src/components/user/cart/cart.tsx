import { Button } from 'react-bootstrap';
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../../../features/redux/slices/cart/cart";
import './cart.css';
import { toast } from "react-toastify";
import { root } from "../../../features/redux/reducers/reducer";
import { FaBoxOpen } from 'react-icons/fa6';
import { ICart } from '../../../interfaces/productInterface';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const Cart = () => {

    const dispatch = useDispatch()
    const items = useSelector((state: root)=>state.cart.items)
    const token = useSelector((state:root)=>state.token.token)
    const navigate = useNavigate()

    useEffect(()=>{
        if (!token) {
            toast.warning("Please login to add items to cart");
            navigate('/login')
            return;
        }
        try {
            jwtDecode(token);
        } catch (error) {
            console.error("Invalid token:", error);
            toast.warning("Your session has expired. Please log in again.", {
                onClose: ()=>{
                    navigate('/login')
                }
            });
            return;
        }
    })



    const handleRemoveItem = (id: string, name: string) => {
        dispatch(removeItem(id))
        toast.success(`${name} removed from cart`)
    };

    const handleChange = (quantity: number, id:string)=>{
        dispatch(updateQuantity({quantity, id}))
        toast.success("Quantity updated")
    }


    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <h3>Shopping Cart</h3>
                {
                    items.length  === 0 ? (
                        <div className='d-flex justify-content-center align-items-center'>
                            <h1 className='display-3'>No products found<FaBoxOpen className='ms-4'/></h1>
                        </div>
                    ) : (
                        <>
                        <div className="col-md-8 col-12 cart-items p-4">
                            {items.map((item: ICart) => (
                                <div key={item.id} className="card mb-3 shadow">
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img
                                                src={item.image}
                                                className="img-fluid rounded-start"
                                                alt={item.name}
                                                width={200}
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <p className="card-text">Price: ₹{item.price}</p>
                                                        <p className="card-text">Quantity: {item.quantity}</p>
                                                    </div>
                                                    <div className="col-4">
                                                        <p className="card-text">
                                                            Color: <strong>{item.color?.name}</strong>
                                                        </p>
                                                        <p className="card-text">
                                                            Size: <strong>{item.size}</strong>
                                                        </p>
                                                    </div>
                                                    <div className="col-4">
                                                        <Button variant="danger" onClick={() => handleRemoveItem(String(item.id), item.name)}>
                                                            <FaTrash/>
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="d-flex mt-4 align-items-center justify-content-center me-4">
                                                    <p className="mb-0 me-2">Select Quantity:</p>
                                                    <select value={item.quantity} onChange={(e)=>handleChange(Number(e.target.value), item.id)}>
                                                        {
                                                            Array.from({length: 6}).map((_, index)=>(
                                                                <option value={index+1} key={index}>{index+1}</option>
                                                            ))
                                                        }
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
                                    {items.map((item) => (
                                        <li key={item.id} className="list-group-item d-flex justify-content-between">
                                            <span>{item.name} ({item.size}, {item.color?.name})</span>
                                            <span>₹{item.price * item.quantity!}</span>
                                        </li>
                                    ))}
                                </ul>
                                <h5 className="d-flex justify-content-between">
                                    <span>Total Amount:</span>
                                    <span>₹{items.reduce((total, item) => total + item.price * item.quantity!, 0).toFixed(2)}</span>
                                </h5>
                            </div>
                        </div>
                        </>
                    )}
            </div>
        </div>
    );
};

export default Cart;