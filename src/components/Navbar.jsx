import { useEffect, useState } from "react";
import { signOut, getCurrentUser, fetchAuthSession } from "aws-amplify/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getAuthUser } from "../services/auth";

function Navbar() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // --------------------------------------------------
  // LOAD AUTH USER
  // --------------------------------------------------
  const loadUser = async () => {
    try {
      await getCurrentUser();
      await fetchAuthSession({ forceRefresh: true });
      const authUser = await getAuthUser();
      setUser(authUser);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
  }, [location.pathname]);

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------
  const logout = async () => {
    await signOut();
    setUser(null);
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        padding: "14px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #E6E6E6"
      }}
    >
      {/* BRAND (ALWAYS HOME LINK) */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#FE7F2D"
        }}
      >
        <h2
          style={{
            margin: 0,
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer"
          }}
        >
          <i className="fas fa-store"></i>
          CloudRetail
        </h2>
      </Link>

      {/* RIGHT SIDE */}
      {user ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "26px"
          }}
        >
          {/* CART ICON */}
          <div
            onClick={() => navigate("/cart")}
            title="View Cart"
            style={{
              cursor: "pointer",
              fontSize: "22px",
              color: "#215E61"
            }}
          >
            <i className="fas fa-shopping-cart"></i>
          </div>

          {/* USER */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              color: "#233D4D",
              fontWeight: "500"
            }}
          >
            <i className="fas fa-user-circle"></i>
            {user.name || user.email}
          </div>

          {/* LOGOUT */}
          <div
            onClick={logout}
            title="Logout"
            style={{
              cursor: "pointer",
              fontSize: "20px",
              color: "#FE7F2D"
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      ) : (
        // 🔐 WHEN LOGGED OUT
        <div
          onClick={() => navigate("/login")}
          title="Login"
          style={{
            cursor: "pointer",
            fontSize: "20px",
            color: "#215E61",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <i className="fas fa-sign-in-alt"></i>
          <span style={{ fontSize: "14px", fontWeight: "500" }}>
            Login
          </span>
        </div>
      )}
    </div>
  );
}

export default Navbar;
