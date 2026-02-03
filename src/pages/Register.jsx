import { useState } from "react";
import { signUp } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name,
            phone_number: phone, // +94XXXXXXXXX
          },
        },
      });

      navigate("/confirm", { state: { email } });
    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ffffff", // ✅ white background
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          background: "#ffffff",
          padding: "40px",
          borderRadius: "14px",
          width: "380px",
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
          Create Account
        </h2>

        <p
          style={{
            textAlign: "center",
            marginBottom: "24px",
            fontSize: "14px",
            color: "#6b7280",
          }}
        >
          Sign up to get started
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
          Full Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "6px",
            marginBottom: "14px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
          }}
        />

        <label style={{ fontSize: "14px", color: "#233D4D" }}>
          Email
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "6px",
            marginBottom: "14px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
          }}
        />

        <label style={{ fontSize: "14px", color: "#233D4D" }}>
          Contact Number
        </label>
        <input
          type="text"
          placeholder="+94XXXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "6px",
            marginBottom: "14px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
          }}
        />

        <label style={{ fontSize: "14px", color: "#233D4D" }}>
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
            background: "#215E61", // ✅ brand teal
            border: "none",
            color: "#ffffff",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Create Account
        </button>

        <p
          style={{
            marginTop: "18px",
            fontSize: "14px",
            textAlign: "center",
            color: "#233D4D",
          }}
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#FE7F2D",
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
