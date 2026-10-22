// src/App.jsx
import React from "react";
import { GameProvider, useGame } from "./state/GameContext";
import HeaderNav from "./components/ui/HeaderNav";
import InterrogationRoom from "./components/interrogation/InterrogationRoom";
import GnaniPipelineVisualizer from "./components/gnani/GnaniPipelineVisualizer";
import EvidenceBoard from "./components/evidence/EvidenceBoard";
import CaseDossier from "./components/case/CaseDossier";
import "./styles/noir-theme.css";

function GameMain() {
  const { activeTab, generatorFlicker } = useGame();

  return (
    <div className={`alibi-noir-app ${generatorFlicker ? "generator-dip" : ""}`}>
      {/* MONSOON RAIN & SMOKE OVERLAY */}
      <div className="rain-atmosphere-layer" />

      {/* TOP HEADER */}
      <HeaderNav />

      {/* TAB CONTENT CONTAINER */}
      <main className="alibi-main-content">
        {activeTab === "interrogation" && <InterrogationRoom />}
        {activeTab === "gnani-pipeline" && <GnaniPipelineVisualizer />}
        {activeTab === "evidence" && <EvidenceBoard />}
        {activeTab === "dossier" && <CaseDossier />}
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
