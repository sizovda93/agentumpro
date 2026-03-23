// Правая верхняя карточка: заголовок + описание
export default function HeroCard() {
  return (
    <article className="card relative p-[3vw] max-md:p-[6vw] flex flex-col justify-between overflow-hidden bg-paper min-h-[50vh] max-lg:min-h-[40vh]">
      {/* Главный заголовок + подзаголовок */}
      <div className="flex flex-col gap-5 mt-8">
        <h1 className="text-[clamp(2rem,4vw,4rem)] leading-[1.05] tracking-tighter max-w-[18ch] text-ink">
          Монетизируйте социальные связи.
        </h1>
        <p className="text-[0.95rem] leading-relaxed tracking-tight text-ink/50 max-w-[36ch]">
          Передавайте клиентов на&nbsp;банкротство физических лиц
          и&nbsp;получайте вознаграждение за&nbsp;каждую успешную сделку.
        </p>
      </div>

      {/* Нижняя строка: специализация + описание */}
      <div className="flex justify-between items-end w-full">
        <div className="text-[0.85rem] leading-tight tracking-tight">
          <span className="block text-ink/40 mb-2">Специализация</span>
          <span className="block">Банкротство физических лиц.</span>
          <span className="block">Списание долгов ФЗ-127.</span>
        </div>
        <div className="text-[0.85rem] leading-snug tracking-tight text-right max-w-[260px] text-ink/70">
          <span className="block">
            Рекомендуйте клиентов с&nbsp;долгами от&nbsp;300&nbsp;000&nbsp;₽.
          </span>
          <span className="block mt-1">
            Мы проводим аудит, заключаем договор и&nbsp;сопровождаем процедуру.
          </span>
        </div>
      </div>
    </article>
  );
}
