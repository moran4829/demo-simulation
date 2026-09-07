import dreamIcon from "./img/חולמים על בית/Home Icon.svg";
import existingIcon from "./img/חולמים על בית/natch Icon.svg";
import approvalIcon from "./img/חולמים על בית/request Icon.svg";
import mortgageIcon from "./img/key.svg";

export type StageId = "dream" | "approval" | "existing" | "mortgage";

const STAGES: {
  id: StageId;
  label: string;
  icon: string;
}[] = [
  { id: "dream", label: "חולמים על בית", icon: dreamIcon },
  { id: "approval", label: "בקשת אישור עקרוני", icon: approvalIcon },
  { id: "existing", label: "יש לי בקשה קיימת", icon: existingIcon },
  { id: "mortgage", label: "יש לי כבר משכנתא", icon: mortgageIcon },
];

export function StageNav({
  active,
  onChange,
}: {
  active: StageId;
  onChange: (id: StageId) => void;
}) {
  return (
    <nav
      className="stage-nav reveal-item reveal-delay-3"
      data-reveal
      aria-label="שלב בחיי המשכנתא"
    >
      {STAGES.map((stage) => (
        <button
          key={stage.id}
          type="button"
          className={`stage-nav-item${active === stage.id ? " is-active" : ""}`}
          onClick={() => onChange(stage.id)}
        >
          <img className="stage-icon" src={stage.icon} alt="" aria-hidden="true" />
          <span>{stage.label}</span>
        </button>
      ))}
    </nav>
  );
}
