import { useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/", { replace: true });
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h4 style={{ margin: 0, fontWeight: "bold" }}>
        Welcome, <span>{username}</span> 👋
      </h4>

      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#454040",
          color: "white",
          border: "none",
          padding: "8px 15px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
