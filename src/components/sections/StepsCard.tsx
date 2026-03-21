import TensionLine from "@/components/TensionLine";

// Широкая карточка: три шага процесса работы партнёра
const steps = [
  {
    number: "01",
    label: "Поиск & Передача",
    lines: [
      "Вы выявляете потенциального клиента с кредитными задолженностями от 300 000 ₽.",
      "Передаёте контактные данные в нашу закрытую CRM систему.",
    ],
  },
  {
    number: "02",
    label: "Квалификация",
    lines: [
      "Наши профильные юристы связываются с клиентом, проводят бесплатный финансовый аудит.",
      "Определяют перспективы дела и заключают официальный договор.",
    ],
  },
  {
    number: "03",
    label: "Вознаграждение",
    lines: [
      "После подписания договора и внесения первого платежа клиентом, выплата поступает на ваш счёт.",
      "От 10 000 ₽ до 25 000 ₽ за сделку.",
    ],
  },
];

export default function StepsCard() {
  return (
    <article className="card relative p-[3vw] max-md:p-[6vw] flex flex-col justify-between overflow-hidden bg-paper min-h-[50vh] max-lg:min-h-[40vh] col-span-2 max-lg:col-span-1">
      {/* Верхняя строка */}
      <div className="flex justify-between items-start w-full mb-16">
        <div className="text-[0.85rem] leading-tight tracking-tight">
          <span className="block">Процесс взаимодействия</span>
          <span className="block">Алгоритм работы партнёра</span>
        </div>
      </div>

      {/* Три шага */}
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-8 max-md:gap-16 w-full">
        {steps.map((step) => (
          <div key={step.number}>
            <div className="text-[clamp(3rem,6vw,6rem)] leading-[0.8] tracking-tighter">
              {step.number}
            </div>
            <div className="text-[0.85rem] leading-tight tracking-tight mt-8">
              <span className="block text-[#777] mb-2">{step.label}</span>
              {step.lines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
