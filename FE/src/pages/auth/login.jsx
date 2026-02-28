import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Email atau password salah");
      }

      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-[#111111] border border-[#2a2a2a] rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukan email"
            className="w-full px-4 py-2 bg-black border border-gray-700 text-white rounded-lg"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukan Password"
            className="w-full px-4 py-2 bg-black border border-gray-700 text-white rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#7A1CAC] text-white py-2 rounded-lg"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
