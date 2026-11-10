// src/components/scene/CameraController.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGame } from "../../state/GameContext";
import { suspects } from "../../data/suspects";

export const CAMERA_STATES = {
  MAIN_THEATRE: "MAIN_THEATRE",
  SUSPECT_FOCUS: "SUSPECT_FOCUS",
  BOOTH_VIEW: "BOOTH_VIEW",
  SCREEN_VIEW: "SCREEN_VIEW",
  FREE_ORBIT: "FREE_ORBIT",
  EVIDENCE_INSPECTION: "EVIDENCE_INSPECTION",
  CUTSCENE: "CUTSCENE"
};

export function CameraController() {
  const { cameraState, selectedSuspect, reducedMotion, completeOpeningCameraPan } = useGame();
  const hasPlayedOpeningPan = useRef(false);
  const openingPanElapsed = useRef(0);

  // Target camera position and lookAt vectors
  const targetPos = useRef(new THREE.Vector3(0, 1.8, 1.0));
  const targetLook = useRef(new THREE.Vector3(0, 1.0, -5.2));
  const currentLook = useRef(new THREE.Vector3(0, 1.0, -5.2));

  useFrame((state, delta) => {
    // If player is in free orbit mode, let OrbitControls have full control
    if (cameraState === CAMERA_STATES.FREE_ORBIT) {
      return;
    }

    // Determine target coordinates based on cameraState
    if (cameraState === CAMERA_STATES.SUSPECT_FOCUS && selectedSuspect && suspects[selectedSuspect]) {
      const seat = suspects[selectedSuspect].seat?.position || [0, 0, -5];
      const isLeft = (seat[0] || 0) < 0;

      // Cinematic off-center framing:
      // Suspects on the left (Raju, Arvind, Bhola) are framed on the LEFT of the screen,
      // allowing the dossier card to appear cleanly on the RIGHT beside them.
      // Suspects on the right (Meera, Nusrat) are framed on the RIGHT of the screen,
      // allowing the dossier card to appear cleanly on the LEFT beside them.
      if (isLeft) {
        targetPos.current.set(seat[0] + 0.18, 1.45, seat[2] + 2.3);
        targetLook.current.set(seat[0] + 0.65, seat[1] + 0.65, seat[2]);
      } else {
        targetPos.current.set(seat[0] - 0.18, 1.45, seat[2] + 2.3);
        targetLook.current.set(seat[0] - 0.65, seat[1] + 0.65, seat[2]);
      }
    } else if (cameraState === CAMERA_STATES.BOOTH_VIEW) {
      // Look back and up at the projection booth aperture & brass plaque
      targetPos.current.set(0, 1.5, -8.0);
      targetLook.current.set(0, 4.6, 2.0);
    } else if (cameraState === CAMERA_STATES.SCREEN_VIEW) {
      // Look forward and up at the silver screen & stage
      targetPos.current.set(0, 1.2, -2.5);
      targetLook.current.set(0, 3.8, -15.0);
    } else if (cameraState === CAMERA_STATES.EVIDENCE_INSPECTION) {
      targetPos.current.set(0, 2.2, 1.4);
      targetLook.current.set(0, 0.8, -5.5);
    } else if (cameraState === CAMERA_STATES.CUTSCENE) {
      targetPos.current.set(1.5, 0.8, -2.0);
      targetLook.current.set(0, 1.2, -6.0);
    } else {
      // Default: MAIN_THEATRE
      targetPos.current.set(0, 1.8, 1.0);
      targetLook.current.set(0, 1.0, -5.2);
    }

    // On entry, sweep down from the auditorium ceiling before settling into the
    // established theatre composition. It runs only once and does not affect
    // later camera-state changes.
    if (!hasPlayedOpeningPan.current && cameraState === CAMERA_STATES.MAIN_THEATRE) {
      if (reducedMotion) {
        hasPlayedOpeningPan.current = true;
        completeOpeningCameraPan();
      } else {
        openingPanElapsed.current += delta;
        const progress = Math.min(openingPanElapsed.current / 2.35, 1);
        const easedProgress = progress * progress * (3 - 2 * progress);
        const overheadPosition = new THREE.Vector3(0, 10.5, 3.4);
        const overheadLook = new THREE.Vector3(0, 0.55, -5.2);

        state.camera.position.lerpVectors(overheadPosition, targetPos.current, easedProgress);
        currentLook.current.lerpVectors(overheadLook, targetLook.current, easedProgress);
        state.camera.lookAt(currentLook.current);

        if (progress >= 1) {
          hasPlayedOpeningPan.current = true;
          completeOpeningCameraPan();
        }
        return;
      }
    }

    // Smooth lerp camera position and lookAt (fast if reduced motion is on)
    const lerpSpeed = reducedMotion ? 1 : Math.min(delta * 3.5, 1);
    state.camera.position.lerp(targetPos.current, lerpSpeed);
    currentLook.current.lerp(targetLook.current, lerpSpeed);
    state.camera.lookAt(currentLook.current);
  });

  return null;
}
