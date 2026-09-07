import { useEffect, useState } from "react";
import { Articles } from "./components/Articles";
import { Calculator } from "./components/Calculator";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { StageIntro } from "./components/StageIntro";
import type { StageId } from "./components/StageNav";

export default function App() {
  const [stage, setStage] = useState<StageId>("dream");

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page">
      <Header />
      <Hero stage={stage} onStageChange={setStage} />
      <StageIntro stage={stage} />
      <Calculator />
      <Articles />
    </div>
  );
}
