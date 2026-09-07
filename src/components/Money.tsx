export function formatParts(value: number) {
  const formatted = Math.round(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const [whole, fraction] = formatted.split(".");
  return { whole, fraction };
}

type MoneySize = "sm" | "md" | "lg" | "xl";

export function Money({
  value,
  size = "md",
}: {
  value: number;
  size?: MoneySize;
}) {
  const { whole, fraction } = formatParts(value);
  return (
    <span className={`money money-${size}`} dir="ltr">
      <span className="money-currency">₪</span>
      <span className="money-gap"> </span>
      <span className="money-whole">{whole}</span>
      <span className="money-frac">.{fraction}</span>
    </span>
  );
}
