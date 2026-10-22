// src/components/scene/CameraController.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGame } from "../../state/GameContext";
import { suspects } from "../../data/suspects";

export const CAMERA_STATES = {
  MAIN_THEATRE: "MAIN_THEATRE",
  SUSPECT_FOCUS: "SUSPECT_FOCUS",
  EVIDENCE_INSPECTION: "EVIDENCE_INSPECTION",
  CUTSCENE: "CUTSCENE"
};

export function CameraController() {
  const { cameraState, selectedSuspect, reducedMotion } = useGame();

  // Target camera position and lookAt vectors
  const targetPos = useRef(new THREE.Vector3(0, 1.8, 0.5));
  const targetLook = useRef(new THREE.Vector3(0, 1.0, -5.2));
  const currentLook = useRef(new THREE.Vector3(0, 1.0, -5.2));

  useFrame((state, delta) => {
    // Determine target coordinates based on cameraState
    if (cameraState === CAMERA_STATES.SUSPECT_FOCUS && selectedSuspect && suspects[selectedSuspect]) {
      const seat = suspects[selectedSuspect].seat?.position || [0, 0, -5];
      // Frame the selected suspect while keeping the rest of the theatre visible
      targetPos.current.set(seat[0] * 0.55, 1.45, seat[2] + 2.4);
      targetLook.current.set(seat[0], seat[1] + 0.65, seat[2]);
    } else if (cameraState === CAMERA_STATES.EVIDENCE_INSPECTION) {
      targetPos.current.set(0, 2.2, 1.4);
      targetLook.current.set(0, 0.8, -5.5);
    } else if (cameraState === CAMERA_STATES.CUTSCENE) {
      targetPos.current.set(1.5, 0.8, -2.0);
      targetLook.current.set(0, 1.2, -6.0);
    } else {
      // Default: MAIN_THEATRE
      targetPos.current.set(0, 1.8, 0.5);
      targetLook.current.set(0, 1.0, -5.2);
    }

    // Smooth lerp camera position and lookAt (fast if reduced motion is on)
    const lerpSpeed = reducedMotion ? 1 : Math.min(delta * 3.5, 1);
    state.camera.position.lerp(targetPos.current, lerpSpeed);
    currentLook.current.lerp(targetLook.current, lerpSpeed);
    state.camera.lookAt(currentLook.current);
  });

  return null;
}
