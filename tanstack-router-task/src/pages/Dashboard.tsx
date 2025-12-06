import { Link } from "@tanstack/react-router";
import { useAuth } from "../useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 30 }}>
      <h2>Dashboard</h2>
      <p>Welcome, {user}</p>

      <nav>
        <Link to="/about">About</Link> |{" "}
        <Link to="/profile">Profile</Link>
      </nav>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
