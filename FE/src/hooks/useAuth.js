import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "./useApi";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { post } = useApi();
  const navigate = useNavigate();

  async function login(email, password) {
    setLoading(true);
    setError("");
    try {
      const data = await post("/auth/login", { email, password });
      localStorage.setItem("token", data.access_token);
      navigate("/admin");
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Email atau password salah";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/log1n");
  }

  return { login, logout, loading, error, setError };
}
