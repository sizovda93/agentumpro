"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

// Обёртка для всех admin-страниц (навигация + выход)
const navItems = [
  { href: "/admin", label: "Заявки" },
  { href: "/admin/settings", label: "Настройки" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Шапка */}
      <header className="border-b border-ink/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/admin" className="text-sm font-normal text-ink tracking-tight">
            Agentum Pro
          </Link>
          <nav className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm ${
                  pathname === item.href
                    ? "text-ink"
                    : "text-ink/40 hover:text-ink/70"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-ink/40 hover:text-ink/70 bg-transparent border-none cursor-pointer"
        >
          Выйти
        </button>
      </header>

      {/* Контент */}
      <main className="p-6 max-w-5xl mx-auto">{children}</main>
    </div>
  );
}
