import { useNavigate } from "react-router-dom";
import { fetchAuthSession } from "aws-amplify/auth";
import { getAuthUser } from "../services/auth";
import { useState } from "react";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const outOfStock = product.availableStock === 0;

  const [showSuccess, setShowSuccess] = useState(false);

  // --------------------------------------------------
  // ADD TO CART (DIRECT ADD = 1)
  // --------------------------------------------------
  const handleAddToCart = async () => {
    try {
      const user = await getAuthUser();

      if (!user) {
        navigate("/login");
        return;
      }

      if (user.role !== "customer") return;
      if (outOfStock) return;

      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();

      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch(
        "https://sxw967m5i6.execute-api.eu-north-1.amazonaws.com/dev/cart/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            productId: product.productId,
            qty: 1
          })
        }
      );

      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      } else {
        const data = await res.json();
        console.error("Add to cart failed:", data);
      }

    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          padding: "16px",
          boxShadow: "0 8px 20px rgba(35, 61, 77, 0.12)",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Image */}
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "12px",
            marginBottom: "12px"
          }}
        />

        {/* Product name */}
        <h3 style={{ color: "#233D4D", fontSize: "18px", margin: "4px 0" }}>
          {product.name}
        </h3>

        {/* Category */}
        <p
          style={{
            color: "#215E61",
            fontSize: "14px",
            marginBottom: "6px",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <i className="fas fa-tag"></i>
          {product.category}
        </p>

        {/* Price */}
        <strong
          style={{
            color: "#233D4D",
            fontSize: "16px",
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <i>Rs</i>
          {product.price}
        </strong>

        {/* Stock */}
        <span
          style={{
            fontSize: "13px",
            color: outOfStock ? "#FE7F2D" : "#215E61",
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <i
            className={`fas ${
              outOfStock ? "fa-times-circle" : "fa-check-circle"
            }`}
          ></i>
          {outOfStock
            ? "Out of stock"
            : `Available: ${product.availableStock}`}
        </span>

        {/* Button */}
        <button
          disabled={outOfStock}
          onClick={handleAddToCart}
          style={{
            marginTop: "auto",
            border: "none",
            borderRadius: "10px",
            padding: "10px",
            fontSize: "14px",
            fontWeight: "600",
            backgroundColor: outOfStock ? "#ccc" : "#FE7F2D",
            color: "#FFFFFF",
            cursor: outOfStock ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}
        >
          <i className="fas fa-shopping-cart"></i>
          Add to Cart
        </button>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            background: "#61b53d",
            color: "#FFFFFF",
            padding: "14px 20px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            fontSize: "14px",
            fontWeight: "600",
            zIndex: 1000
          }}
        >
          Item added to cart
        </div>
      )}
    </>
  );
}

export default ProductCard;
