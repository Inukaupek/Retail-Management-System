import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCart,
  getAddresses,
  addAddress,
  placeOrder
} from "../services/api";
import { fetchAuthSession } from "aws-amplify/auth";

/* ---------------- THEME ---------------- */
const colors = {
  bg: "#F5FBE6",
  card: "#FFFFFF",
  primary: "#215E61",
  text: "#233D4D",
  accent: "#FE7F2D",
  border: "#E0E6D8"
};

export default function Checkout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [total, setTotal] = useState(0);

  const [showAdd, setShowAdd] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "",
    line1: "",
    street: "",
    city: ""
  });

  const [placing, setPlacing] = useState(false);
  const [timer, setTimer] = useState(5);
  const [addressError, setAddressError] = useState("");

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const session = await fetchAuthSession();
    const idToken = session.tokens?.idToken;
    if (!idToken) return;

    const claims = idToken.payload;
    setUser({
      name: claims.name || claims.email || "User",
      phone_number: claims.phone_number || "-"
    });

    const cartRes = await getCart();
    setCart(cartRes || []);

    setTotal(
      (cartRes || []).reduce(
        (sum, i) => sum + i.qty * i.price,
        0
      )
    );

    const addrRes = await getAddresses();
    setAddresses(addrRes.addresses || []);

    const def = addrRes.addresses?.find(a => a.isDefault);
    if (def) setSelectedAddress(def.addressId);
  }

  /* ---------------- ADD ADDRESS ---------------- */
  async function handleAddAddress() {
    await addAddress({
      label: newAddress.label,
      line1: `${newAddress.line1}, ${newAddress.street}`,
      city: newAddress.city,
      postalCode: "00000",
      country: "Sri Lanka",
      isDefault: true
    });
    setShowAdd(false);
    loadData();
  }

  /* ---------------- PLACE ORDER ---------------- */
  async function handlePlaceOrder() {
    if (!selectedAddress) {
      setAddressError("Please select a delivery address to continue.");
      return;
    }

    setAddressError("");
    setPlacing(true);

    let t = 5;
    setTimer(t);

    const interval = setInterval(() => {
      t--;
      setTimer(t);
      if (t === 0) {
        clearInterval(interval);
        submitOrder();
      }
    }, 1000);
  }

  async function submitOrder() {
    const res = await placeOrder(selectedAddress);

    navigate("/order-success", {
      state: {
        orderId: res.orderId,
        cart,
        total,
        address: addresses.find(a => a.addressId === selectedAddress),
        user
      }
    });
  }

  if (!user) return <p style={{ padding: 20 }}>Loading...</p>;

  /* ---------------- UI ---------------- */
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "0 24px"
      }}
    >
      <h2 style={{ color: colors.text, marginBottom: 24 }}>
        Checkout
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "380px 1fr",
          gap: 32,
          alignItems: "flex-start"
        }}
      >
        {/* LEFT : ORDER SUMMARY */}
        <OrderSummary cart={cart} total={total} />

        {/* RIGHT : CHECKOUT FLOW */}
        <div>
          <Card title="Customer">
            <p><b>Name:</b> {user.name}</p>
            <p><b>Phone:</b> {user.phone_number}</p>
          </Card>

          <Card title="Shipping Address">
            {addresses.map(a => (
              <label
                key={a.addressId}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: 12,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 12,
                  marginBottom: 10,
                  cursor: "pointer",
                  background:
                    selectedAddress === a.addressId
                      ? "#F0F7F6"
                      : "#fff"
                }}
              >
                <input
                  type="radio"
                  checked={selectedAddress === a.addressId}
                  onChange={() => {
                    setSelectedAddress(a.addressId);
                    setAddressError("");
                  }}
                />
                <span>
                  <b>{a.label}</b> — {a.line1}, {a.city}
                </span>
              </label>
            ))}

            {addressError && (
              <p style={{ color: colors.accent, fontSize: 14 }}>
                ⚠️ {addressError}
              </p>
            )}

            <button style={linkBtn} onClick={() => setShowAdd(!showAdd)}>
              + Add new address
            </button>

            {showAdd && (
              <div style={{ marginTop: 16 }}>
                <Input placeholder="Label" onChange={v => setNewAddress({ ...newAddress, label: v })} />
                <Input placeholder="Address line 1" onChange={v => setNewAddress({ ...newAddress, line1: v })} />
                <Input placeholder="Street" onChange={v => setNewAddress({ ...newAddress, street: v })} />
                <Input placeholder="City" onChange={v => setNewAddress({ ...newAddress, city: v })} />

                <button style={primaryBtn} onClick={handleAddAddress}>
                  Save Address
                </button>
              </div>
            )}
          </Card>

          <Card title="Payment">
            <p>Cash on Delivery</p>
          </Card>

          <div style={{ textAlign: "right", marginTop: 24 }}>
            {!placing ? (
              <button
                style={{
                  ...primaryBtn,
                  opacity: selectedAddress ? 1 : 0.5,
                  cursor: selectedAddress ? "pointer" : "not-allowed"
                }}
                disabled={!selectedAddress}
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            ) : (
              <p style={{ color: colors.accent }}>
                Placing order in {timer}s…
                <button
                  style={linkBtn}
                  onClick={() => window.location.reload()}
                >
                  Cancel
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- ORDER SUMMARY ---------------- */
function OrderSummary({ cart, total }) {
  return (
    <div style={{ position: "sticky", top: 24 }}>
      <Card title="Order Summary">
        {cart.map(i => (
          <div
            key={i.productId}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 12
            }}
          >
            <span>{i.name} × {i.qty}</span>
            <span>Rs. {i.qty * i.price}</span>
          </div>
        ))}

        <hr />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 700,
            color: colors.primary
          }}
        >
          <span>Total</span>
          <span>Rs. {total}</span>
        </div>
      </Card>
    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */
function Card({ title, children }) {
  return (
    <section
      style={{
        background: colors.card,
        padding: 20,
        borderRadius: 16,
        marginBottom: 20,
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
      }}
    >
      <h4 style={{ color: colors.primary, marginBottom: 12 }}>
        {title}
      </h4>
      {children}
    </section>
  );
}

function Input({ placeholder, onChange }) {
  return (
    <input
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: 12,
        marginBottom: 10,
        borderRadius: 12,
        border: `1px solid ${colors.border}`
      }}
    />
  );
}

/* ---------------- BUTTONS ---------------- */
const primaryBtn = {
  background: colors.primary,
  color: "#fff",
  border: "none",
  padding: "12px 24px",
  borderRadius: 14,
  cursor: "pointer",
  fontWeight: 600
};

const linkBtn = {
  background: "none",
  border: "none",
  color: colors.accent,
  cursor: "pointer",
  marginTop: 10,
  fontWeight: 600
};
