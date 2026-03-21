import TensionLine from "@/components/TensionLine";

// Правая верхняя карточка: заголовок + навигация
export default function HeroCard() {
  return (
    <article className="card relative p-[3vw] max-md:p-[6vw] flex flex-col justify-between overflow-hidden bg-paper min-h-[50vh] max-lg:min-h-[40vh]">
      {/* Верхняя строка: метка + навигация */}
      <div className="flex justify-between items-start w-full">
        <TensionLine items={["P", "01"]} small style={{ width: "30%" }} />
        <nav className="flex gap-8">
          <a href="#register" className="text-[0.85rem] text-ink">
            Регистрация агента
          </a>
        </nav>
      </div>

      {/* Главный заголовок */}
      <h1 className="text-[clamp(2rem,4vw,4rem)] leading-[1.05] tracking-tighter max-w-[18ch] mt-8 text-ink">
        Монетизируйте социальные связи.
      </h1>

      {/* Нижняя строка: специализация + описание */}
      <div className="flex justify-between items-end w-full mt-16">
        <div className="text-[0.85rem] leading-tight tracking-tight">
          <span className="block text-[#777] mb-2">Специализация</span>
          <span className="block">Банкротство физических лиц.</span>
          <span className="block">Списание долгов ФЗ-127.</span>
        </div>
        <div className="text-[0.85rem] leading-tight tracking-tight text-right max-w-[250px]">
          <span className="block">
            Рекомендуйте клиентов, нуждающихся в правовой защите от кредиторов.
            Получайте высокое агентское вознаграждение за каждый заключённый
            договор.
          </span>
        </div>
      </div>
    </article>
  );
}
