import { StageNav, type StageId } from "./StageNav";

export function Hero({
  stage,
  onStageChange,
}: {
  stage: StageId;
  onStageChange: (id: StageId) => void;
}) {
  return (
    <section className="hero">
      <div className="hero-art" aria-hidden="true">
        <img
          className="hero-dome"
          src="/figma/hero-full-transparent.png"
          alt=""
          width={900}
          height={590}
        />
        <img
          className="hero-house"
          src="/figma/home-3d.svg"
          alt=""
          width={430}
          height={407}
        />
        <img
          className="hero-tree"
          src="/figma/hero-people-transparent.png"
          alt=""
          width={96}
          height={239}
        />
      </div>
      <div className="hero-copy">
        <h1>איפה אתם בחיי המשכנתא?</h1>
        <p>בחרו את השלב שבו אתם נמצאים ואנחנו נלווה אתכם מכאן</p>
      </div>
      <StageNav active={stage} onChange={onStageChange} />
    </section>
  );
}
