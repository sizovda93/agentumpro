// Левая верхняя карточка: паспорт системы
export default function BrandCard() {
  return (
    <article className="card relative p-[3vw] max-md:p-[6vw] flex flex-col justify-between overflow-hidden bg-stone min-h-[50vh] max-lg:min-h-[40vh]">
      {/* Верх: бренд + кнопка */}
      <div className="flex justify-between items-start w-full">
        <div className="text-[0.85rem] leading-tight tracking-tight">
          <span className="block">Агентум Про</span>
          <span className="block">Партнёрская сеть</span>
          <span className="block">Осн. 2024</span>
        </div>
        <a
          href="https://app.agentum.club"
          className="inline-block bg-ink text-white text-[0.85rem] leading-tight tracking-tight px-5 py-2.5 rounded-full hover:bg-ink/85 transition-colors"
        >
          Стать партнёром
        </a>
      </div>

      {/* Центр: паспорт системы */}
      <div className="my-auto flex flex-col gap-5">
        <div className="flex flex-col gap-1 text-[0.85rem] leading-snug tracking-tight">
          <span className="text-ink/30 text-[0.75rem] mb-1">Платформа</span>
          <span className="text-ink">Партнёрская модель</span>
          <span className="text-ink">Банкротство физических лиц</span>
          <span className="text-ink">Сопровождение по ФЗ-127</span>
        </div>

        <div
          className="w-full"
          style={{ height: "1px", background: "rgba(26,26,26,0.08)" }}
        />

        <div className="flex gap-8 max-md:gap-5 text-[0.8rem] tracking-tight text-ink/35">
          <span className="whitespace-nowrap">СРО «Дело»</span>
          <span className="whitespace-nowrap">АСПБ</span>
          <span className="whitespace-nowrap">СРО «Гарантия»</span>
        </div>
      </div>
    </article>
  );
}
