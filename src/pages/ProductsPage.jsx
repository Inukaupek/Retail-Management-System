import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/products`;


function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(data => {
        console.log("API DATA:", data); // 👈 DEBUG
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "40px", color: "white" }}>
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px", color: "red" }}>
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        marginTop: "20px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "20px",
        backgroundColor: "#111",
      }}
    >
      {products.map(product => (
        <ProductCard
          key={product.productId}
          product={product}
        />
      ))}
    </div>
  );
}

export default Products;
