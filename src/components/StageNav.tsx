import type { CSSProperties } from "react";

export type StageId = "dream" | "approval" | "existing" | "mortgage";

const STAGES: {
  id: StageId;
  label: string;
  icon: string;
}[] = [
  { id: "dream", label: "חולמים על בית", icon: "/figma/nav-icon-dream.svg" },
  { id: "approval", label: "בקשת אישור עקרוני", icon: "/figma/nav-icon-approval.svg" },
  { id: "existing", label: "יש לי בקשה קיימת", icon: "/figma/nav-icon-existing.svg" },
  { id: "mortgage", label: "יש לי כבר משכנתא", icon: "/figma/nav-icon-mortgage.svg" },
];

export function StageNav({
  active,
  onChange,
}: {
  active: StageId;
  onChange: (id: StageId) => void;
}) {
  return (
    <nav className="stage-nav" aria-label="שלב בחיי המשכנתא">
      {STAGES.map((stage) => (
        <button
          key={stage.id}
          type="button"
          className={`stage-nav-item${active === stage.id ? " is-active" : ""}`}
          onClick={() => onChange(stage.id)}
        >
          <span
            className="stage-icon"
            style={{ "--stage-icon": `url("${stage.icon}")` } as CSSProperties}
            aria-hidden="true"
          />
          <span>{stage.label}</span>
        </button>
      ))}
    </nav>
  );
}
