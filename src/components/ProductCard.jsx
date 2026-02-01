import { useNavigate } from "react-router-dom";
import { getAuthUser, getAuthSession } from "../services/auth";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const outOfStock = product.availableStock === 0;

  const handleAddToCart = async () => {
    // 🔐 Check login
    const user = await getAuthUser();
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "customer") {
      alert("Only customers can add items to cart.");
      return;
    }

    if (outOfStock) {
      alert("Product is out of stock.");
      return;
    }

    // 🧮 Ask quantity
    const qtyInput = prompt(
      `Enter quantity (Available: ${product.availableStock})`,
      "1"
    );

    if (!qtyInput) return;

    const qty = parseInt(qtyInput, 10);
    if (isNaN(qty) || qty <= 0) {
      alert("Invalid quantity");
      return;
    }

    // 🔑 Get Cognito access token
    const session = await getAuthSession();
    const token = session?.accessToken?.toString();

    try {
      const res = await fetch(
        `https://sxw967m5i6.execute-api.eu-north-1.amazonaws.com/dev/cart/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            productId: product.productId,
            qty
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add to cart");
        return;
      }

      alert("Item added to cart ✅");
      console.log("Cart response:", data);

    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Something went wrong");
    }
  };

  const outOfStock = product.availableStock === 0;

  return (
    <div
      style={{
        backgroundColor: "#fff",
        color: "#000",
        borderRadius: "12px",
        padding: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column"
        flexDirection: "column",
      }}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "10px"
        }}
      />

      <h3>{product.name}</h3>
      <p style={{ color: "#666" }}>Category: {product.category}</p>
      <strong>Rs. {product.price}</strong>

      <p
        style={{
          color: outOfStock ? "red" : "green",
          fontSize: "14px"
          marginBottom: "10px",
        }}
      />

      <h3 style={{ margin: "5px 0" }}>{product.name}</h3>

      <p style={{ fontSize: "14px", color: "#666", margin: "0 0 6px" }}>
        Category: {product.category}
      </p>

      <strong style={{ fontSize: "18px" }}>
        Rs. {product.price}
      </strong>

      <p
        style={{
          marginTop: "6px",
          fontSize: "14px",
          color: outOfStock ? "red" : "green",
        }}
      >
        {outOfStock
          ? "Out of stock"
          : `Available: ${product.availableStock}`}
      </p>

      <button
        style={{
          marginTop: "auto",
          backgroundColor: outOfStock ? "#ccc" : "#096B68",
          color: "#fff",
          padding: "8px",
          cursor: outOfStock ? "not-allowed" : "pointer"
        }}
        disabled={outOfStock}
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
      <div style={{ marginTop: "auto", display: "flex", gap: "10px" }}>
        <button style={{ flex: 1 }}>
          View
        </button>

        <button
          style={{
            flex: 1,
            backgroundColor: outOfStock ? "#ccc" : "#096B68",
            color: "#fff",
            cursor: outOfStock ? "not-allowed" : "pointer",
          }}
          disabled={outOfStock}
        >
          Buy
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
