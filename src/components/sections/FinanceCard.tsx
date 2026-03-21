import TensionLine from "@/components/TensionLine";

// Карточка «Финансовая прозрачность»: условия выплат и статистика
export default function FinanceCard() {
  return (
    <article className="card relative p-[3vw] max-md:p-[6vw] flex flex-col justify-between overflow-hidden bg-stone min-h-[50vh] max-lg:min-h-[40vh]">
      {/* Верхняя декоративная линия */}
      <div className="flex justify-between items-start w-full">
        <TensionLine items={["F", "N"]} small style={{ width: "100%" }} />
      </div>

      {/* Основной контент */}
      <div className="my-auto">
        <h2 className="text-[2rem] mb-8 text-ink">
          Финансовая
          <br />
          прозрачность
        </h2>
        <div className="text-[0.85rem] leading-tight tracking-tight mb-6">
          <span className="block text-[#777] mb-2">Выплаты</span>
          <span className="block">Еженедельные переводы</span>
          <span className="block">СЗ / ИП / Физ. лица</span>
        </div>
        <div className="text-[0.85rem] leading-tight tracking-tight">
          <span className="block text-[#777] mb-2">Статистика</span>
          <span className="block">Личный кабинет агента</span>
          <span className="block">Отслеживание статуса лидов 24/7</span>
        </div>
      </div>

      {/* Контакты */}
      <div className="flex justify-between items-end w-full">
        <div className="text-[0.85rem] leading-tight tracking-tight">
          <span className="block">info@agentum-pro.ru</span>
          <span className="block">+7 495 000 00 00</span>
        </div>
      </div>
    </article>
  );
}
