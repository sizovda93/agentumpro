"use client";

import { useState } from "react";
import TensionLine from "@/components/TensionLine";

// Карточка с формой регистрации агента
export default function RegisterCard() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка отправки");
      }

      setStatus("success");
      setName("");
      setPhone("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Произошла ошибка");
    }
  }

  return (
    <article
      id="register"
      className="card relative p-[3vw] max-md:p-[6vw] flex flex-col justify-between overflow-hidden bg-paper min-h-[50vh] max-lg:min-h-[40vh]"
    >
      <div className="flex justify-between items-start w-full">
        <div className="text-[0.85rem] leading-tight tracking-tight">
          <span className="block">Регистрация</span>
          <span className="block">Доступ по заявке</span>
        </div>
      </div>

      <div>
        <h2 className="text-[1.5rem] mb-4 max-w-[20ch] text-ink">
          Стать участником партнёрской сети.
        </h2>

        {status === "success" ? (
          <p className="text-[0.85rem] text-ink/70 mt-4">
            Заявка отправлена. Мы свяжемся с вами в ближайшее время.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-[400px] mt-8">
            <div className="mb-8">
              <input
                type="text"
                placeholder="Имя и Фамилия"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-ink py-2 text-base font-main outline-none placeholder:text-ink/40 rounded-none"
              />
            </div>
            <div className="mb-8">
              <input
                type="tel"
                placeholder="Номер телефона"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent border-b border-ink py-2 text-base font-main outline-none placeholder:text-ink/40 rounded-none"
              />
            </div>

            {status === "error" && (
              <p className="text-red-600 text-sm mb-4">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-transparent border-none font-main text-[0.85rem] cursor-pointer p-0 uppercase tracking-widest flex items-center gap-2 text-ink hover:opacity-50 disabled:opacity-30"
            >
              {status === "loading" ? "Отправка..." : "Отправить запрос"}
              <span className="font-mono text-xl">→</span>
            </button>
          </form>
        )}
      </div>

      <div className="flex justify-between items-end w-full mt-16">
        <TensionLine items={["R", "G"]} />
      </div>
    </article>
  );
}
