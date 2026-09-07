import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { CtaButton } from "./CtaButton";
import { Money } from "./Money";

type Question = "monthly" | "afford";
type AptType = "first" | "replace" | "extra";

const YEARS = [10, 15, 20, 25, 30] as const;
const MIN_AMOUNT = 400_000;
const MAX_AMOUNT = 10_000_000;
const STEP = 50_000;

const LTV: Record<AptType, number> = {
  first: 0.75,
  replace: 0.7,
  extra: 0.5,
};

const APT_OPTIONS: { id: AptType; title: string; hint: string }[] = [
  { id: "first", title: "דירה ראשונה", hint: "עד 75% מימון" },
  { id: "replace", title: "דירה חליפית", hint: "עד 70% מימון" },
  { id: "extra", title: "דירה נוספת", hint: "עד 50% מימון" },
];

const DEFAULT = {
  amount: 2_000_000,
  years: 15,
  ltv: 0.75,
  monthly: 7_000,
  financing: 2_200_000,
  equity: 500_000,
  property: 1_932_959,
  income: 32_959,
};

function clampAmount(value: number) {
  const snapped = Math.round(value / STEP) * STEP;
  return Math.min(MAX_AMOUNT, Math.max(MIN_AMOUNT, snapped));
}

function compute(amount: number, years: number, ltv: number) {
  const scaleA = amount / DEFAULT.amount;
  const scaleY = DEFAULT.years / years;
  const scaleL = ltv / DEFAULT.ltv;
  return {
    monthly: Math.round(DEFAULT.monthly * scaleA * scaleY),
    financing: Math.round(DEFAULT.financing * scaleA * scaleL),
    equity: Math.round(
      DEFAULT.equity * scaleA * ((1 - ltv) / (1 - DEFAULT.ltv)),
    ),
    property: Math.round(DEFAULT.property * scaleA * (DEFAULT.ltv / ltv)),
    income: Math.round(DEFAULT.income * scaleA * scaleY),
    equityPct: Math.round((1 - ltv) * 100),
    financePct: Math.round(ltv * 100),
  };
}

function useAnimatedNumber(target: number, duration = 560) {
  const [value, setValue] = useState(target);
  const valueRef = useRef(value);
  valueRef.current = value;

  useEffect(() => {
    let frame = 0;
    const from = valueRef.current;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

function InfoLabel({ children }: { children: string }) {
  return (
    <legend>
      <span>{children}</span>
      <img src="/figma/icon-info.svg" alt="" width={24} height={24} />
    </legend>
  );
}

export function Calculator() {
  const [question, setQuestion] = useState<Question>("monthly");
  const [apt, setApt] = useState<AptType>("first");
  const [amount, setAmount] = useState(DEFAULT.amount);
  const [years, setYears] = useState(DEFAULT.years);

  const result = useMemo(
    () => compute(amount, years, LTV[apt]),
    [amount, years, apt],
  );

  const monthlyAnim = useAnimatedNumber(result.monthly);
  const financingAnim = useAnimatedNumber(result.financing);
  const equityAnim = useAnimatedNumber(result.equity);
  const propertyAnim = useAnimatedNumber(result.property);
  const incomeAnim = useAnimatedNumber(result.income);

  const amountLabel = amount.toLocaleString("en-US");
  const showMonthlyFields = question === "monthly";

  return (
    <section className="calculator-section" id="calculator">
      <h2>מה תרצו לבדוק היום?</h2>

      <div className="calc-mode">
        <div className="calc-card">
            <div className="calc-form">
              <p className="form-lead">
                שנו את הנתונים וקבלו מיד הערכה להחזר החודשי:
              </p>

            <fieldset className="form-block">
              <legend>מה תרצו לדעת</legend>
              <div className="choice-row">
                <button
                  type="button"
                  className={`choice-card${question === "monthly" ? " is-selected" : ""}`}
                  onClick={() => setQuestion("monthly")}
                >
                  כמה אשלם בכל חודש?
                </button>
                <button
                  type="button"
                  className={`choice-card${question === "afford" ? " is-selected" : ""}`}
                  onClick={() => setQuestion("afford")}
                >
                  כמה משכנתא אוכל לקחת?
                </button>
              </div>
            </fieldset>

            <div
              className={`form-fields${showMonthlyFields ? " is-visible" : " is-hidden"}`}
              aria-hidden={!showMonthlyFields}
            >
              {showMonthlyFields ? (
                <>
                  <fieldset className="form-block">
                    <InfoLabel>איזה סוג דירה אתם מתכננים לרכוש?</InfoLabel>
                    <div className="choice-row">
                      {APT_OPTIONS.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          className={`choice-card stacked${apt === option.id ? " is-selected" : ""}`}
                          onClick={() => setApt(option.id)}
                        >
                          <strong>{option.title}</strong>
                          <span>{option.hint}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="form-block">
                    <InfoLabel>גובה המשכנתא שתרצו לקחת</InfoLabel>
                    <div className="amount-stepper">
                      <button
                        type="button"
                        className="icon-btn"
                        aria-label="הגדל סכום"
                        onClick={() => setAmount((v) => clampAmount(v + STEP))}
                      >
                        <img
                          src="/figma/icon-expand.svg"
                          alt=""
                          width={24}
                          height={24}
                        />
                      </button>
                      <label className="amount-field">
                        <img
                          src="/figma/icon-shekel.svg"
                          alt=""
                          width={16}
                          height={16}
                        />
                        <input
                          type="text"
                          inputMode="numeric"
                          value={amountLabel}
                          onChange={(e) => {
                            const next = Number(
                              e.target.value.replace(/,/g, ""),
                            );
                            if (!Number.isNaN(next)) {
                              setAmount(clampAmount(next));
                            }
                          }}
                          aria-label="סכום המשכנתא"
                        />
                      </label>
                      <button
                        type="button"
                        className="icon-btn"
                        aria-label="הקטן סכום"
                        onClick={() => setAmount((v) => clampAmount(v - STEP))}
                      >
                        <img
                          src="/figma/icon-collapse.svg"
                          alt=""
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>
                    <div className="slider-block">
                      <input
                        className="amount-slider"
                        type="range"
                        min={MIN_AMOUNT}
                        max={MAX_AMOUNT}
                        step={STEP}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        aria-label="מחוון סכום המשכנתא"
                      />
                      <div className="slider-scale">
                        <span>₪ 10,000,000</span>
                        <span>₪ 400,000</span>
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className="form-block">
                    <InfoLabel>לכמה שנים תרצו לפרוס את המשכנתא?</InfoLabel>
                    <div className="year-row">
                      {YEARS.map((y) => (
                        <button
                          key={y}
                          type="button"
                          className={`year-chip${years === y ? " is-selected" : ""}`}
                          onClick={() => setYears(y)}
                        >
                          {y}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </>
              ) : (
                <div className="question-placeholder">
                  <p>השדות לשאלת «כמה משכנתא אוכל לקחת?» יתווספו כאן בקרוב.</p>
                </div>
              )}
            </div>
          </div>

          <div className={`calc-result${showMonthlyFields ? "" : " is-dimmed"}`}>
            <div className="donut-wrap">
              <div className="donut-stage">
                <Donut
                  equityPct={result.equityPct}
                  financePct={result.financePct}
                />
                <div className="donut-center">
                  <img
                    className="donut-home"
                    src="/figma/donut-home-icon.svg"
                    alt=""
                    width={48}
                    height={48}
                  />
                  <p className="donut-kicker">החזר חודשי משוער</p>
                  <div className="donut-pay">
                    <span className="donut-month">לחודש</span>
                    <Money value={monthlyAnim} size="xl" />
                  </div>
                  <p className="donut-sub">
                    לפי משכנתא של {amount.toLocaleString("en-US")} ₪ ל־{years}{" "}
                    שנים
                  </p>
                </div>
              </div>
            </div>

            <div className="split-tiles">
              <div className="split-tile split-tile-finance">
                <div className="split-legend">
                  <span className="dot dot-teal" />
                  <span>{result.financePct}% מימון</span>
                </div>
                <Money value={financingAnim} size="lg" />
              </div>
              <div className="split-tile split-tile-equity">
                <div className="split-legend">
                  <span>{result.equityPct}% הון עצמי</span>
                  <span className="dot dot-blue" />
                </div>
                <Money value={equityAnim} size="lg" />
              </div>
            </div>

            <div className="stat-rows">
              <div className="stat-row">
                <span>שווי הדירה שתוכלו לרכוש</span>
                <Money value={propertyAnim} size="md" />
              </div>
              <div className="stat-row">
                <span>הכנסה נטו מומלצת למשק הבית</span>
                <Money value={incomeAnim} size="md" />
              </div>
            </div>

            <CtaButton>בקשה לאישור עקרוני</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Donut({
  equityPct,
  financePct,
}: {
  equityPct: number;
  financePct: number;
}) {
  const size = 518.11;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 203.4;
  const tealStroke = 5.2;
  const blueStroke = 18.4;
  const tealR = outerR - tealStroke / 2;
  const blueR = outerR - blueStroke / 2;
  const blueC = 2 * Math.PI * blueR;
  const equityLen = (equityPct / 100) * blueC;
  const startDeg = 276;
  const spanDeg = (equityPct / 100) * 360;
  const equityLabelDeg = startDeg + spanDeg / 2;
  const financeLabelDeg = equityLabelDeg + 180;

  const orbitStyle = (angle: number, radius: number) =>
    ({
      "--orbit-angle": `${angle}deg`,
      "--orbit-counter-angle": `${-angle}deg`,
      "--orbit-radius": `${radius}%`,
    }) as CSSProperties;

  return (
    <>
      <svg
        className="donut-svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        <circle
          cx={cx}
          cy={cy}
          r={tealR}
          fill="none"
          stroke="#22AFB5"
          strokeWidth={tealStroke}
        />
        <circle
          className="donut-arc"
          cx={cx}
          cy={cy}
          r={blueR}
          fill="none"
          stroke="#2F5EB1"
          strokeWidth={blueStroke}
          strokeLinecap="round"
          style={{
            strokeDasharray: `${equityLen} ${Math.max(blueC - equityLen, 0)}`,
            transform: `rotate(${startDeg}deg)`,
            transformOrigin: `${cx}px ${cy}px`,
          }}
        />
      </svg>

      <div
        className="donut-label-orbit"
        style={orbitStyle(equityLabelDeg, 40.5)}
      >
        <div className="donut-label donut-label-equity">
          {equityPct}% הון עצמי
        </div>
      </div>

      <div
        className="donut-label-orbit"
        style={orbitStyle(financeLabelDeg, 34)}
      >
        <div className="donut-label donut-label-finance">
          {financePct}% מימון
        </div>
      </div>
    </>
  );
}
