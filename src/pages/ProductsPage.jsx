import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

// const API_URL = `${import.meta.env.VITE_API_BASE_URL}/products`;
const API_URL =
  "https://sxw967m5i6.execute-api.eu-north-1.amazonaws.com/dev/products";

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(API_URL);
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

  // Extract unique categories
  const categories = [
    "ALL",
    ...new Set(products.map((p) => p.category))
  ];

  // Filter products by category
  const filteredProducts =
    selectedCategory === "ALL"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  if (loading) {
    return (
      <div
        style={{
          padding: "80px",
          textAlign: "center",
          color: "#233D4D"
        }}
      >
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "80px",
          textAlign: "center",
          color: "#FE7F2D"
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        minHeight: "100vh",
        padding: "40px 60px"
      }}
    >
      {/* ================= HERO BANNER ================= */}
      <div
        style={{
          width: "100%",
          height: "420px",
          borderRadius: "20px",
          overflow: "hidden",
          backgroundImage: "url('banners/banner_3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginBottom: "50px"
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: "20px",
            background:
              "linear-gradient(to right, rgba(33,94,97,0.85), rgba(33,94,97,0.3))",
            display: "flex",
            alignItems: "center",
            padding: "40px",
            color: "#FFFFFF"
          }}
        >
          <div>
            <h1 style={{ fontSize: "45px", marginBottom: "10px", marginTop: "150px" }}>
              Quality Products
            </h1>
            <p style={{ fontSize: "16px", maxWidth: "420px" }}>
              Discover fresh, reliable products selected just for you.
            </p>
          </div>
        </div>
      </div>

      {/* ================= CATEGORIES ================= */}
      <h2
        style={{
          color: "#233D4D",
          marginBottom: "20px",
          fontSize: "26px"
        }}
      >
        Categories
      </h2>

      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "50px",
          flexWrap: "wrap"
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "14px 22px",
              borderRadius: "14px",
              cursor: "pointer",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor:
                selectedCategory === cat ? "#FE7F2D" : "#F2F2F2",
              color:
                selectedCategory === cat ? "#FFFFFF" : "#233D4D",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
            }}
          >
            <i className="fas fa-layer-group"></i>
            {cat}
          </div>
        ))}
      </div>

      {/* ================= PRODUCTS GRID ================= */}
      <h2
        style={{
          color: "#233D4D",
          marginBottom: "30px",
          fontSize: "26px"
        }}
      >
        Products
      </h2>

      {filteredProducts.length === 0 ? (
        <div
          style={{
            color: "#215E61",
            fontSize: "16px"
          }}
        >
          No products available in this category.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "24px",
            
          }}
        >
          {filteredProducts.map((p) => (
            <ProductCard key={p.productId} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
