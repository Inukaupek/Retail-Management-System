import { useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const getToken = async () => {
    const session = await fetchAuthSession();
    return session.tokens?.idToken?.toString();
  };

  const loadCart = async () => {
    try {
      const token = await getToken();
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch(
        "https://sxw967m5i6.execute-api.eu-north-1.amazonaws.com/dev/cart/view",
        {
          headers: { Authorization: token }
        }
      );

      if (!res.ok) throw new Error();

      const data = await res.json();
      setItems(data);
    } catch {
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  // ➕➖ UPDATE QTY (UNCHANGED)
  const updateQty = async (productId, newQty) => {
    if (newQty < 1) return;

    const token = await getToken();

    await fetch(
      "https://sxw967m5i6.execute-api.eu-north-1.amazonaws.com/dev/cart/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          productId,
          qty: newQty
        })
      }
    );

    loadCart();
  };

  // ❌ REMOVE ITEM (UNCHANGED)
  const removeItem = async (productId) => {
    const token = await getToken();

    await fetch(
      "https://sxw967m5i6.execute-api.eu-north-1.amazonaws.com/dev/cart/remove",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ productId })
      }
    );

    loadCart();
  };

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (loading) return <div style={{ padding: 40 }}>Loading cart...</div>;
  if (error) return <div style={{ padding: 40, color: "red" }}>{error}</div>;
  if (items.length === 0)
    return <div style={{ padding: 40 }}>Your cart is empty</div>;

  return (
    <div
      style={{
        padding: "40px 60px",
        background: "#ffffff",
        minHeight: "100vh"
      }}
    >
      <h2 style={{ color: "#233D4D", marginBottom: 30 }}>
        Your Cart
      </h2>

      {items.map(item => (
        <div
          key={item.productId}
          style={{
            background: "#fff",
            border: "1px solid #eaeaea",
            borderRadius: 14,
            padding: 18,
            marginBottom: 18,
            display: "grid",
            gridTemplateColumns: "200px 1fr auto auto auto",
            gap: 20,
            alignItems: "center",
            boxShadow: "0 6px 16px rgba(0,0,0,0.04)"
          }}
        >
          {/* PRODUCT IMAGE (S3 STYLE – SAME AS PRODUCTS PAGE) */}
          <img
            src={item.imageUrl}
            alt={item.name}
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              borderRadius: "12px"
            }}
          />

          {/* PRODUCT INFO */}
          <div>
            <div style={{ fontWeight: 600, color: "#233D4D" }}>
              {item.name}
            </div>
            <div style={{ fontSize: 13, color: "#888" }}>
              {item.category}
            </div>
          </div>

          {/* QTY CONTROLS */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#f6f6f6",
              borderRadius: 999,
              padding: "6px 12px"
            }}
          >
            <button
              onClick={() => updateQty(item.productId, item.qty - 1)}
              style={qtyBtn}
            >
              −
            </button>

            <span style={{ minWidth: 18, textAlign: "center" }}>
              {item.qty}
            </span>

            <button
              onClick={() => updateQty(item.productId, item.qty + 1)}
              style={qtyBtn}
            >
              +
            </button>
          </div>

          {/* PRICE */}
          <div
            style={{
              fontWeight: 600,
              minWidth: 90,
              textAlign: "right"
            }}
          >
            Rs. {item.price * item.qty}
          </div>

          {/* REMOVE ICON */}
          <button
            onClick={() => removeItem(item.productId)}
            title="Remove"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 6
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FE7F2D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </button>
        </div>
      ))}

      {/* TOTAL */}
      <div
        style={{
          marginTop: 30,
          display: "flex",
          justifyContent: "flex-end",
          fontSize: 18,
          fontWeight: 600,
          color: "#233D4D"
        }}
      >
        Total: Rs. {total}
      </div>

      {/* CHECKOUT */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <button
          onClick={() => navigate("/checkout")}
          style={{
            padding: "14px 32px",
            backgroundColor: "#215E61",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 500,
            cursor: "pointer"
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

/* QTY BUTTON STYLE */
const qtyBtn = {
  border: "none",
  background: "#ffffff",
  width: 28,
  height: 28,
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: 16,
  fontWeight: 600,
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
};

export default Cart;
