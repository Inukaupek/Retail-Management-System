import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// PAGES
import Products from "./pages/ProductsPage";
import Login from "./pages/LoginPage";
import Register from "./pages/Register";
import ConfirmSignup from "./pages/ConfirmSignup";
import Cart from "./pages/CartPage";
import Checkout from "./pages/CheckoutPage";

import OrderSuccess from "./pages/OrderSuccessPage";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm" element={<ConfirmSignup />} />

        {/* ================= PROTECTED ================= */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* <Route path="/address" element={<Address />} /> */}
     
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
    </>
  );
}

export default App;
