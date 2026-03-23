// Карточка «Финансовая прозрачность»: выплаты, отслеживание, контакты
export default function FinanceCard() {
  return (
    <article className="card relative p-[3vw] max-md:p-[6vw] flex flex-col justify-between overflow-hidden bg-stone min-h-[50vh] max-lg:min-h-[40vh]">
      {/* Заголовок + подзаголовок */}
      <div>
        <h2 className="text-[2rem] leading-[1.1] tracking-tighter text-ink">
          Финансовая
          <br />
          прозрачность
        </h2>
        <p className="text-[0.85rem] tracking-tight text-ink/45 mt-3 max-w-[30ch]">
          Прозрачные условия выплат и&nbsp;контроль статуса каждой сделки.
        </p>
      </div>

      {/* Три модуля */}
      <div className="flex flex-col gap-6">
        <div className="text-[0.85rem] leading-tight tracking-tight">
          <span className="block text-ink/35 mb-1.5">Выплаты</span>
          <span className="block text-ink">Еженедельные переводы</span>
        </div>

        <div className="text-[0.85rem] leading-tight tracking-tight">
          <span className="block text-ink/35 mb-1.5">Отслеживание</span>
          <span className="block text-ink">Личный кабинет партнёра</span>
          <span className="block text-ink">Статусы лидов и договоров 24/7</span>
        </div>

        <div className="text-[0.85rem] leading-tight tracking-tight">
          <span className="block text-ink/35 mb-1.5">Контакты</span>
          <span className="block text-ink">info@agentum-pro.ru</span>
          <span className="block text-ink">+7 495 000 00 00</span>
        </div>
      </div>
    </article>
  );
}
