import './navbar.css';
import { FaPersonDress } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { root } from "../../../features/redux/reducers/reducer";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { removeToken } from "../../../features/redux/slices/userToken/token";
import { toast } from "react-toastify";

const Nav = () => {
    const token = useSelector((state: root) => state.token.token) ?? '';
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(removeToken());
        toast.success("User logged out successfully!");
        navigate('/');
    }

    let valid = false;
    if (token) {
        try {
            jwtDecode(token);
            valid = true;
        } catch (error) {
            console.error("Invalid token:", error);
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    <FaPersonDress className="fs-2 rounded-circle border border-dark me-2" />
                    EMAX
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                Product
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                Cart
                            </Link>
                        </li>
                    </ul>
                    {
                        valid ? (
                            <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                        ) : (
                            <DropdownButton title="SignIn/SignUp" id="bg-nested-dropdown">
                                <Dropdown.Item as={Link} to='/login'>Login</Dropdown.Item>
                                <Dropdown.Item as={Link} to='/signUp'>Sign Up</Dropdown.Item>
                            </DropdownButton>
                        )
                    }
                </div>
            </div>
        </nav>
    );
}

export default Nav;
