import { FaBox, FaHome } from "react-icons/fa"
import { FaCartShopping, FaPersonDress } from "react-icons/fa6"


const Nav = ()=>{
    return(
        <nav className="navbar navbar-expand-large bg-light fixed-top shadow w-100">
            <div className="container d-flex justify-content-evenly align-items-center">
                <div className="navbar-brand">
                    <FaPersonDress className="fs-2 rounded-circle border border-dark"/>
                </div>
                <div className="justify-content-center align-items-center">
                    <ul className="list-unstyled d-flex mt-3">
                        <li className="mx-3 nav-item"><a className="text-dark text-decoration-none d-flex align-items-center" style={{cursor:"pointer"}} href="/"><FaHome className="me-2"/>Home</a></li>
                        <li className="mx-3 nav-item"><a className="text-dark text-decoration-none d-flex align-items-center" style={{cursor:"pointer"}} href="/products"><FaBox className="me-2"/> Product</a></li>
                        <li className="mx-3 nav-item"><a className="text-dark text-decoration-none d-flex align-items-center" style={{cursor:"pointer"}} href="/cart"><FaCartShopping className="me-2"/>Cart</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav