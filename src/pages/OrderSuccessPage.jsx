import { useLocation, useNavigate } from "react-router-dom";

/* ---------------- THEME ---------------- */
const colors = {
  card: "#FFFFFF",
  primary: "#215E61",
  text: "#233D4D",
  border: "#E0E6D8"
};

export default function OrderSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>Invalid access</p>;

  const { orderId, cart, total, address, user } = state;

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "24px auto",
        padding: "0 24px"
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ color: colors.primary, marginBottom: 4 }}>
          Order Placed Successfully
        </h2>
        <p style={{ color: colors.text, fontSize: 14 }}>
          Order ID: <b>{orderId}</b>
        </p>
      </div>

      {/* TOP GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          marginBottom: 20
        }}
      >
        {/* CUSTOMER */}
        <Card title="Customer">
          <InfoRow label="Name" value={user.name} />
          <InfoRow label="Phone" value={user.phone_number} />
        </Card>

        {/* ADDRESS */}
        <Card title="Shipping Address">
          <p style={text}>{address.label}</p>
          <p style={text}>{address.line1}</p>
          <p style={text}>{address.city}</p>
        </Card>
      </div>

      {/* BILL */}
      <Card title="Bill">
        {cart.map(i => (
          <div
            key={i.productId}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "6px 0",
              borderBottom: `1px dashed ${colors.border}`,
              fontSize: 14
            }}
          >
            <span>{i.name} × {i.qty}</span>
            <span>Rs. {i.qty * i.price}</span>
          </div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
            fontWeight: 700,
            fontSize: 16,
            color: colors.primary
          }}
        >
          <span>Total</span>
          <span>Rs. {total}</span>
        </div>
      </Card>

      {/* ACTION */}
      <div style={{ textAlign: "right", marginTop: 16 }}>
        <button style={primaryBtn} onClick={() => navigate("/")}>
          Back to Shopping
        </button>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Card({ title, children }) {
  return (
    <div
      style={{
        background: colors.card,
        padding: 16,
        borderRadius: 14,
        boxShadow: "0 6px 16px rgba(0,0,0,0.05)"
      }}
    >
      <h4
        style={{
          color: colors.primary,
          marginBottom: 10,
          borderBottom: `1px solid ${colors.border}`,
          paddingBottom: 6,
          fontSize: 15
        }}
      >
        {title}
      </h4>
      {children}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: "flex", gap: 8, fontSize: 14, marginBottom: 6 }}>
      <b style={{ color: colors.text }}>{label}:</b>
      <span>{value}</span>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const text = {
  fontSize: 14,
  lineHeight: 1.4,
  color: colors.text
};

const primaryBtn = {
  background: colors.primary,
  color: "#fff",
  border: "none",
  padding: "10px 22px",
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 14
};
