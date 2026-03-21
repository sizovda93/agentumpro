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

      <div className="flex justify-between items-end w-full mt-16">
        <TensionLine items={["A", "P"]} />
      </div>
    </article>
  );
}
