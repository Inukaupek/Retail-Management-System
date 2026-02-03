import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/ProductsPage";
import Login from "./pages/LoginPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Products />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
