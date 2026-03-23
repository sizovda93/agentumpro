// Левая верхняя карточка: бренд + графика партнёрской сети
export default function BrandCard() {
  /*
   * 7 узлов: центр + 3 верхних + 3 нижних
   * viewBox 200×140 — крупная, просторная сетка
   */
  const cx = 100; // центр X
  const cy = 68;  // центр Y — чуть выше середины

  const nodes = [
    // 0 — центральный
    { x: cx, y: cy, label: "Партнёры", labelDy: -10, primary: true },
    // верхний ряд (широкая дуга)
    { x: 28,  y: 24, label: "юристы",      labelDy: -7, primary: false },
    { x: cx,  y: 18, label: "брокеры",     labelDy: -7, primary: false },
    { x: 172, y: 24, label: "риелторы",    labelDy: -7, primary: false },
    // нижний ряд (чуть уже)
    { x: 36,  y: 112, label: "бухгалтеры", labelDy: 9, primary: false },
    { x: cx,  y: 118, label: "адвокаты",   labelDy: 9, primary: false },
    { x: 164, y: 112, label: "HR",         labelDy: 9, primary: false },
  ];

  // Связи: [from, to, primary (к центру)]
  const edges: [number, number, boolean][] = [
    // к центру
    [0, 1, true], [0, 2, true], [0, 3, true],
    [0, 4, true], [0, 5, true], [0, 6, true],
    // верхний ряд
    [1, 2, false], [2, 3, false],
    // нижний ряд
    [4, 5, false], [5, 6, false],
    // боковые вертикальные
    [1, 4, false], [3, 6, false],
  ];

  return (
    <article className="card relative p-[3vw] max-md:p-[6vw] flex flex-col justify-between overflow-hidden bg-stone min-h-[50vh] max-lg:min-h-[40vh]">
      {/* Верх: бренд + кнопка */}
      <div className="flex justify-between items-start w-full relative z-10">
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

      {/* Центр: сетевая диаграмма */}
      <div className="relative my-auto mx-auto w-full max-w-[520px] aspect-[10/7] max-md:max-w-none">
        <svg
          viewBox="0 0 200 140"
          fill="none"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Слой 1 — линии */}
          {edges.map(([a, b, isPrimary], i) => (
            <line
              key={i}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke={isPrimary ? "rgba(26,26,26,0.13)" : "rgba(26,26,26,0.06)"}
              strokeWidth={isPrimary ? 0.45 : 0.25}
            />
          ))}

          {/* Слой 2 — внешние узлы */}
          {nodes.slice(1).map((node, i) => (
            <circle
              key={`n-${i}`}
              cx={node.x}
              cy={node.y}
              r={2.2}
              fill="rgba(26,26,26,0.16)"
            />
          ))}

          {/* Слой 3 — центральный узел: ореол → кольцо → ядро */}
          <circle cx={cx} cy={cy} r={9} fill="rgba(26,26,26,0.03)" />
          <circle
            cx={cx} cy={cy} r={9}
            fill="none"
            stroke="rgba(26,26,26,0.08)"
            strokeWidth="0.3"
          />
          <circle cx={cx} cy={cy} r={4} fill="rgba(26,26,26,0.24)" />

          {/* Слой 4 — подписи */}
          {nodes.map((node, i) => (
            <text
              key={`t-${i}`}
              x={node.x}
              y={node.y + node.labelDy}
              textAnchor="middle"
              dominantBaseline="central"
              fill={node.primary ? "rgba(26,26,26,0.52)" : "rgba(26,26,26,0.36)"}
              style={{
                fontSize: node.primary ? "6.5px" : "4.8px",
                letterSpacing: node.primary ? "0.08em" : "0.03em",
              }}
            >
              {node.label}
            </text>
          ))}
        </svg>
      </div>

      {/* Низ: слой доверия */}
      <div className="flex items-center justify-center gap-10 max-md:gap-5 text-[0.8rem] tracking-tight text-ink/45 text-center w-full relative z-10">
        <span className="whitespace-nowrap">СРО «Дело»</span>
        <span className="flex flex-col items-center text-center">
          <span>АСПБ</span>
          <span className="text-[0.6rem] leading-tight">
            Агентство сопровождения
            <br />
            процедур банкротства
          </span>
        </span>
        <span className="whitespace-nowrap">СРО «Гарантия»</span>
      </div>
    </article>
  );
}
