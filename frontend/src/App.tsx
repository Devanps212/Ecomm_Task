import Home from "./pages/home";
import ProductsLists from "./pages/products";
import ProductDetail from "./pages/productDetails";
import AddToCart from "./pages/addToCart";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import UserLogin from "./pages/userLogin";
import UserSignUp from "./pages/signUp";
import { useSelector } from "react-redux";
import { jwtDecode } from 'jwt-decode';
import { root } from "./features/redux/reducers/reducer";

function App() {
    const state = useSelector((state: root) => state.token.token) ?? '';
    let token;

    try {
        if (state) {
            token = jwtDecode(state);
        } else {
            token = null;
        }
    } catch (error) {
        console.error("Invalid token:", error);
        token = null;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductsLists />} />
                <Route path="/detail/:productId" element={<ProductDetail />} />
                <Route path="/cart" element={<AddToCart />} />
                <Route path="/login" element={!token ? <UserLogin /> : <Home />} />
                <Route path="/signUp" element={!token ? <UserSignUp /> : <Home />} />
            </Routes>
        </Router>
    );
}

export default App;
