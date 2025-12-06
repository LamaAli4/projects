import { useAuth } from "../useAuth";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div style={{ padding: 30 }}>
      <h2>Profile</h2>
      <p>User: {user}</p>
    </div>
  );
}
