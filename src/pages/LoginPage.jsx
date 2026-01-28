import "../styles/Login.css";

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // API call will be added later
    alert("Login clicked (API coming next 🚀)");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="login-footer">
          <a href="#">Forgot password?</a>
          <span> | </span>
          <a href="#">Create account</a>
        </div>
      </div>
    </div>
  );
}
