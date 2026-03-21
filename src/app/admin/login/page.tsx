"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ошибка входа");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Ошибка соединения");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-void p-4">
      <div className="w-full max-w-sm bg-paper p-8">
        <h1 className="text-xl font-normal mb-1 text-ink">Agentum Pro</h1>
        <p className="text-sm text-ink/50 mb-8">Вход в панель управления</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-ink py-2 text-sm outline-none placeholder:text-ink/40 rounded-none"
              autoComplete="email"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Пароль"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-ink py-2 text-sm outline-none placeholder:text-ink/40 rounded-none"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-paper py-3 text-sm uppercase tracking-widest hover:opacity-80 disabled:opacity-40 transition-opacity"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        <a
          href="/"
          className="block mt-6 text-center text-xs text-ink/40 hover:text-ink/60"
        >
          ← На главную
        </a>
      </div>
    </div>
  );
}
