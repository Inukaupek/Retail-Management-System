import { useState } from "react";
import { confirmSignUp } from "aws-amplify/auth";
import { useLocation, useNavigate } from "react-router-dom";

export default function ConfirmSignup() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      // confirmed → go to login
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Invalid or expired verification code");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ffffff", // same as login
      }}
    >
      <form
        onSubmit={handleConfirm}
        style={{
          background: "#ffffff",
          padding: "40px",
          borderRadius: "14px",
          width: "360px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "6px",
            color: "#233D4D",
          }}
        >
          Verify Email
        </h2>

        <p
          style={{
            textAlign: "center",
            marginBottom: "24px",
            fontSize: "14px",
            color: "#6b7280",
          }}
        >
          Enter the verification code sent to
          <br />
          <b>{email}</b>
        </p>

        {error && (
          <div
            style={{
              background: "#fff1f2",
              color: "#b91c1c",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "14px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <label style={{ fontSize: "14px", color: "#233D4D" }}>
          Verification Code
        </label>
        <input
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "6px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#215E61", // brand teal
            border: "none",
            color: "#ffffff",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Confirm Email
        </button>

        <p
          style={{
            marginTop: "18px",
            fontSize: "14px",
            textAlign: "center",
            color: "#233D4D",
          }}
        >
          Already verified?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#FE7F2D", // accent orange
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
