// src/App.jsx
import React from "react";
import { GameProvider, useGame } from "./state/GameContext";
import HeaderNav from "./components/ui/HeaderNav";
import InterrogationRoom from "./components/interrogation/InterrogationRoom";
import CaseFilesHub from "./components/case/CaseFilesHub";
import "./styles/noir-theme.css";

function GameMain() {
  const { activeTab, generatorFlicker } = useGame();

  const isCaseFiles =
    activeTab === "case_files" || activeTab === "evidence" || activeTab === "dossier";

  return (
    <div className={`alibi-noir-app ${generatorFlicker ? "generator-dip" : ""}`}>
      {/* MONSOON RAIN ATMOSPHERE */}
      <div className="rain-atmosphere-layer" />

      {/* TOP HEADER */}
      <HeaderNav />

      {/* GAME VIEW CONTENT */}
      <main className="alibi-main-content">
        {activeTab === "interrogation" && <InterrogationRoom />}
        {isCaseFiles && <CaseFilesHub />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameMain />
    </GameProvider>
  );
}
