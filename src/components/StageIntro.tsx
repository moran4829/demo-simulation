import { CtaButton } from "./CtaButton";
import type { StageId } from "./StageNav";

const COPY: Record<
  StageId,
  { title: string; body: string }
> = {
  dream: {
    title: "חולמים על בית",
    body: "נמאס לכם לשלם שכירות? כאן תמצאו את כל הכלים להבין כמה אתם יכולים ללוות, לפני שמחפשים דירה.",
  },
  approval: {
    title: "בקשת אישור עקרוני",
    body: "התחילו בקשה לאישור עקרוני וקבלו הערכה ברורה להחזר החודשי ולסכום שתוכלו ללוות.",
  },
  existing: {
    title: "יש לי בקשה קיימת",
    body: "חזרו לבקשה שכבר התחלתם, בדקו את סטטוס הטיפול והמשיכו בדיוק מהמקום שבו עצרתם.",
  },
  mortgage: {
    title: "יש לי כבר משכנתא",
    body: "ניהול המשכנתא הקיימת, בדיקת כדאיות למחזור ועדכון פרטים — הכל במקום אחד.",
  },
};

export function StageIntro({ stage }: { stage: StageId }) {
  const copy = COPY[stage];
  return (
    <section className="stage-intro">
      <h2>{copy.title}</h2>
      <span className="stage-intro-rule" />
      <p>{copy.body}</p>
      <CtaButton>בקשה לאישור עקרוני</CtaButton>
    </section>
  );
}
