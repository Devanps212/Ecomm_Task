import Home from "./pages/home"
import ProductsLists from "./pages/products"
import ProductDetail from "./pages/productDetails"
import AddToCart from "./pages/addToCart"
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import UserLogin from "./pages/userLogin"
import UserSignUp from "./pages/signUp"

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<ProductsLists/>}/>
        <Route path="/detail" element={<ProductDetail/>}/>
        <Route path="/cart" element={<AddToCart/>}/>
        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/signUp" element={<UserSignUp/>}/>
      </Routes>  
    </Router>    
    </>
  )
}

export default App
