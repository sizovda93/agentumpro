// Широкая карточка: три шага процесса работы партнёра
const steps = [
  {
    number: "01",
    label: "Передача контакта",
    title: "Поиск клиента",
    description:
      "Вы находите человека с\u00A0долгами от\u00A0300\u00A0000\u00A0₽ и\u00A0передаёте контакт в\u00A0систему.",
    footnote: "Передача занимает 1–2 минуты.",
  },
  {
    number: "02",
    label: "Проверка",
    title: "Квалификация",
    description:
      "Мы связываемся с\u00A0клиентом, проводим финансовый аудит и\u00A0определяем перспективы дела.",
    footnote: "Вы не тратите время на юридическую работу.",
  },
  {
    number: "03",
    label: "Выплата",
    title: "Вознаграждение",
    description:
      "После заключения договора и\u00A0первого платежа клиентом вы\u00A0получаете выплату.",
    footnote: "От 10 000 ₽ до 25 000 ₽ за сделку.",
  },
];

export default function StepsCard() {
  return (
    <article className="card relative p-[3vw] max-md:p-[6vw] flex flex-col justify-between overflow-hidden bg-paper min-h-[50vh] max-lg:min-h-[40vh] col-span-2 max-lg:col-span-1">
      {/* Заголовок секции */}
      <div className="w-full mb-16">
        <h2 className="text-[clamp(1.3rem,2.4vw,2rem)] leading-[1.1] tracking-tighter text-ink">
          Как работает партнёрство
        </h2>
        <p className="text-[0.85rem] tracking-tight text-ink/45 mt-2">
          Три простых шага от передачи контакта до выплаты вознаграждения
        </p>
      </div>

      {/* Три шага */}
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-8 max-md:gap-16 w-full">
        {steps.map((step, idx) => (
          <div key={step.number} className="flex flex-col">
            {/* Label */}
            <span className="text-[0.75rem] tracking-tight text-ink/35 mb-3">
              {step.label}
            </span>

            {/* Номер */}
            <div className="text-[clamp(3rem,6vw,6rem)] leading-[0.8] tracking-tighter text-ink">
              {step.number}
            </div>

            {/* Разделитель */}
            <div
              className="w-full mt-6 mb-5"
              style={{ height: "1px", background: "rgba(26,26,26,0.08)" }}
            />

            {/* Заголовок шага */}
            <span className="text-[0.95rem] tracking-tight text-ink font-normal mb-2">
              {step.title}
            </span>

            {/* Описание */}
            <p className="text-[0.85rem] leading-relaxed tracking-tight text-ink/65">
              {step.description}
            </p>

            {/* Итог */}
            <span className="text-[0.8rem] tracking-tight text-ink/35 mt-auto pt-6">
              {step.footnote}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
