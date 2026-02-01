import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../services/auth";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleBuy = async () => {
    const user = await getAuthUser();

    // 🔒 Not logged in
    if (!user) {
      navigate("/login");
      return;
    }

    // 🚫 Logged in but not a customer
    if (user.role !== "customer") {
      alert("Only customers are allowed to buy products.");
      return;
    }

    // ✅ Customer → continue to checkout (next step)
    console.log("Proceed to checkout for:", product.productId);
    // navigate(`/checkout/${product.productId}`);
  };

  const handleView = () => {
    console.log("View product:", product.productId);
    // navigate(`/product/${product.productId}`);
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        color: "#000",
        borderRadius: "10px",
        padding: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
      }}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px"
        }}
      />

      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <strong>Rs. {product.price}</strong>

      <div style={{ marginTop: "12px" }}>
        <button
          style={{ marginRight: "10px" }}
          onClick={handleView}
        >
          View
        </button>

        <button onClick={handleBuy}>
          Buy
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
