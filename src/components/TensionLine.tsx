import React from "react";

// Декоративная линия с буквами по краям (из исходного дизайна)
// Пример: <TensionLine items={["A", "P"]} /> → A ———— P
type TensionLineProps = {
  items: string[];
  small?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function TensionLine({
  items,
  small,
  className = "",
  style,
}: TensionLineProps) {
  return (
    <div
      className={`tension-line ${small ? "small" : ""} ${className}`}
      style={style}
    >
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <span>{item}</span>
          {i < items.length - 1 && <div className="line" />}
        </React.Fragment>
      ))}
    </div>
  );
}
