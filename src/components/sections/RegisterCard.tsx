"use client";

import { useState } from "react";

// Карточка с формой регистрации партнёра
export default function RegisterCard() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
        body: JSON.stringify({ name: `${firstName} ${lastName}`.trim(), phone }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка отправки");
      }

      setStatus("success");
      setFirstName("");
      setLastName("");
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
      {/* Служебная метка */}
      <div className="text-[0.85rem] leading-tight tracking-tight">
        <span className="block">Регистрация</span>
        <span className="block text-ink/40">Доступ к платформе по заявке</span>
      </div>

      {/* Заголовок + форма */}
      <div className="mt-auto mb-auto">
        <h2 className="text-[1.5rem] leading-[1.15] tracking-tighter text-ink max-w-[22ch]">
          Стать участником партнёрской сети
        </h2>
        <p className="text-[0.85rem] tracking-tight text-ink/45 mt-2 max-w-[34ch]">
          Оставьте заявку — мы свяжемся с&nbsp;вами и&nbsp;откроем доступ после модерации.
        </p>

        {status === "success" ? (
          <div className="mt-8">
            <p className="text-[0.95rem] text-ink">
              Заявка отправлена.
            </p>
            <p className="text-[0.85rem] text-ink/45 mt-1">
              Мы свяжемся с вами в течение 1 рабочего дня.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-[380px] mt-8">
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-[0.75rem] tracking-tight text-ink/35 mb-1.5">
                  Имя
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-transparent border-b border-ink/15 focus:border-ink/40 py-2 text-[0.9rem] font-main outline-none rounded-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[0.75rem] tracking-tight text-ink/35 mb-1.5">
                  Фамилия
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-transparent border-b border-ink/15 focus:border-ink/40 py-2 text-[0.9rem] font-main outline-none rounded-none transition-colors"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-[0.75rem] tracking-tight text-ink/35 mb-1.5">
                Телефон
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent border-b border-ink/15 focus:border-ink/40 py-2 text-[0.9rem] font-main outline-none rounded-none transition-colors"
              />
            </div>

            {status === "error" && (
              <p className="text-[0.8rem] text-red-700/70 mb-4">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-ink text-white text-[0.85rem] tracking-tight px-6 py-3 rounded-full hover:bg-ink/85 transition-colors disabled:opacity-30 cursor-pointer"
            >
              {status === "loading" ? "Отправка..." : "Отправить заявку →"}
            </button>

            <p className="text-[0.75rem] tracking-tight text-ink/30 mt-4">
              Ответ в течение 1 рабочего дня.
            </p>
          </form>
        )}
      </div>
    </article>
  );
}
