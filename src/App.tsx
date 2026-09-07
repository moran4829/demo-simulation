import { useState } from "react";
import { Articles } from "./components/Articles";
import { Calculator } from "./components/Calculator";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { StageIntro } from "./components/StageIntro";
import type { StageId } from "./components/StageNav";

export default function App() {
  const [stage, setStage] = useState<StageId>("dream");

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
