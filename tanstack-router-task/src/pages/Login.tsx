import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useAuth } from "../useAuth";

export default function Login() {
  const [name, setName] = useState("");
  const auth = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    if (name.trim().length > 0) {
      auth.login(name);
      router.navigate({ to: "/dashboard" });
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Login</h2>
      <input
        placeholder="Enter username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
