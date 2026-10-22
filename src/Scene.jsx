// src/Scene.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Theatre from "./components/scene/Theatre";
import { CameraController } from "./components/scene/CameraController";
import { useGame } from "./state/GameContext";

export default function Scene() {
  const { debugMode } = useGame();

  return (
    <div className="canvas-container">
      <Canvas
        shadows
        camera={{ position: [0, 1.8, 0.5], fov: 48 }}
        style={{ width: "100%", height: "100%", background: "#06090a" }}
        gl={{ antialias: true, alpha: false }}
      >
        {/* CINEMATIC CAMERA CONTROLLER */}
        <CameraController />

        {/* 3D THEATRE ENVIRONMENT */}
        <Theatre />

        {/* DEVELOPMENT FREE-CAMERA CONTROLS (Only active if free-cam debug mode enabled) */}
        {debugMode && (
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2 + 0.1}
          />
        )}
      </Canvas>
    </div>
  );
}
