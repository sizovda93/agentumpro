import TensionLine from "@/components/TensionLine";

// Левая верхняя карточка: логотип + бренд
export default function BrandCard() {
  return (
    <article className="card relative p-[3vw] max-md:p-[6vw] flex flex-col justify-between overflow-hidden bg-stone min-h-[50vh] max-lg:min-h-[40vh]">
      <div className="flex justify-between items-start w-full">
        <div className="text-[0.85rem] leading-tight tracking-tight">
          <span className="block">Агентум Про</span>
          <span className="block">Партнёрская сеть</span>
          <span className="block">Осн. 2024</span>
        </div>
        <div className="text-[0.85rem] leading-tight tracking-tight text-right">
          <span className="block">Россия — Москва</span>
        </div>
      </div>

      {/* Партнёры по центру */}
      <div className="flex justify-center items-center gap-12 max-md:gap-6 w-full my-auto text-[0.85rem] tracking-tight text-ink/70 max-md:text-center">
        <span className="whitespace-nowrap">СРО «Дело»</span>
        <span className="flex flex-col items-center text-center"><span>АСПБ</span><span className="text-[0.6rem] leading-tight">Агентство сопровождения<br />процедур банкротства</span></span>
        <span className="whitespace-nowrap">СРО «Гарантия»</span>
      </div>

      <p className="text-[0.85rem] tracking-tight text-ink/50 text-center">
        Сильное СРО Арбитражных управляющих — твои надёжные партнёры
      </p>

    </article>
  );
}
