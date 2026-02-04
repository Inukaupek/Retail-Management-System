import { useState } from "react";

function QuantityModal({ open, max, onClose, onConfirm }) {
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  if (!open) return null;

  const confirm = () => {
    if (qty <= 0 || qty > max) {
      setError(`Enter a value between 1 and ${max}`);
      return;
    }

    setError("");
    onConfirm(qty);
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3 style={{ color: "#233D4D", marginBottom: "10px" }}>
          Select Quantity
        </h3>

        <p style={{ color: "#215E61", fontSize: "14px" }}>
          Available: {max}
        </p>

        <input
          type="number"
          min="1"
          max={max}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          style={input}
        />

        {error && (
          <div style={{ color: "#FE7F2D", fontSize: "13px" }}>
            {error}
          </div>
        )}

        <div style={actions}>
          <button onClick={onClose} style={cancelBtn}>
            Cancel
          </button>
          <button onClick={confirm} style={confirmBtn}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuantityModal;

/* ---------------- STYLES ---------------- */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999
};

const modal = {
  background: "#FFFFFF",
  padding: "24px",
  borderRadius: "16px",
  width: "320px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.25)"
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px"
};

const actions = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "20px"
};

const cancelBtn = {
  background: "#E0E0E0",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer"
};

const confirmBtn = {
  background: "#FE7F2D",
  color: "#FFF",
  border: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600"
};
