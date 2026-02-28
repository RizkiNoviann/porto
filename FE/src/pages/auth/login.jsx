import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
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
            disabled={loading}
            className="w-full bg-[#7A1CAC] text-white py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
