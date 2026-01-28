function Navbar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      backgroundColor: "#222",
      color: "white"
    }}>
      <h2>Shop</h2>

      <button style={{
        padding: "8px 16px",
        backgroundColor: "#ff9800",
        border: "none",
        cursor: "pointer"
      }}>
        Login
      </button>
    </div>
  );
}

export default Navbar;
