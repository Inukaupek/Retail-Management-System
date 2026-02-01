import { useEffect, useState } from "react";
import { signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../services/auth";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAuthUser().then(setUser);
  }, []);

  const logout = async () => {
    await signOut();
    setUser(null);
    navigate("/");
  };

  return (
    <div style={{
      padding: "16px",
      background: "#111",
      color: "white",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        Shop
      </h2>

      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
    </div>
  );
}

export default Navbar;
