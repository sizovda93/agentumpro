"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";

// Настройки сайта, которые можно менять из админки
const SETTINGS_FIELDS = [
  { key: "site_phone", label: "Телефон", placeholder: "+7 495 000 00 00" },
  { key: "site_email", label: "Email", placeholder: "info@agentum-pro.ru" },
  { key: "min_debt", label: "Мин. сумма долга", placeholder: "300 000" },
  { key: "reward_min", label: "Мин. вознаграждение", placeholder: "10 000" },
  { key: "reward_max", label: "Макс. вознаграждение", placeholder: "25 000" },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data.settings);
        setLoading(false);
      });
  }, []);

  async function saveSetting(key: string) {
    setSaving(key);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: settings[key] || "" }),
    });
    setSaving(null);
    setSaved(key);
    setTimeout(() => setSaved(null), 2000);
  }

  if (loading) {
    return (
      <AdminShell>
        <p className="text-sm text-ink/40">Загрузка...</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <h1 className="text-lg text-ink mb-6">Настройки сайта</h1>

      <div className="space-y-6 max-w-lg">
        {SETTINGS_FIELDS.map((field) => (
          <div key={field.key}>
            <label className="block text-sm text-ink/60 mb-1">
              {field.label}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={settings[field.key] || ""}
                placeholder={field.placeholder}
                onChange={(e) =>
                  setSettings({ ...settings, [field.key]: e.target.value })
                }
                className="flex-1 border border-ink/20 rounded px-3 py-2 text-sm bg-white outline-none focus:border-ink/50"
              />
              <button
                onClick={() => saveSetting(field.key)}
                disabled={saving === field.key}
                className="px-4 py-2 text-sm bg-ink text-paper rounded hover:opacity-80 disabled:opacity-40 border-none cursor-pointer"
              >
                {saving === field.key
                  ? "..."
                  : saved === field.key
                  ? "Сохранено"
                  : "Сохранить"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
