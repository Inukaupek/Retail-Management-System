import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/products`;

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(API_URL); // ✅ NO AUTH
        if (!res.ok) throw new Error("API error");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div style={{ color: "white", padding: "40px" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red", padding: "40px" }}>{error}</div>;
  }

  return (
    <div
      style={{
        padding: "40px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "20px",
        backgroundColor: "#111",
      }}
    >
      {products.map((p) => (
        <ProductCard key={p.productId} product={p} />
      ))}
    </div>
  );
}

export default Products;
