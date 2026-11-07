// src/components/scene/Theatre.jsx
import React from "react";
import { ProjectorBeam } from "./ProjectorBeam";
import { RainWindow } from "./RainWindow";
import { LightingRig } from "./LightingRig";
import { Atmosphere } from "./Atmosphere";
import { SuspectGroup } from "../characters/SuspectGroup";
import { EvidenceObject } from "../evidence/EvidenceObject";
import { initialEvidenceItems } from "../../data/evidence";
import { TheatreModel } from "./TheatreModel";

/**
 * 3D Auditorium Environment.
 * Procedural theatre room and cinema seats have been removed in favor of
 * the user-imported 3D Theatre Model (Home+Theatre).
 * Keeps atmospheric lighting, dust, rain window, projector beam, in-scene evidence,
 * and the 5 seated suspects in noir black silhouettes.
 */
export default function Theatre() {
  return (
    <group name="RexTalkiesAuditorium">
      {/* 3D THEATRE MODEL ADDED BY USER */}
      <TheatreModel position={[0, 0, -5]} scale={[1, 1, 1]} />

      {/* NOIR ATMOSPHERIC LIGHTING RIG */}
      <LightingRig />

      {/* ATMOSPHERIC PARTICLES & DUST */}
      <Atmosphere />

      {/* RAIN & MONSOON BLEED AT EXIT DOOR */}
      <RainWindow />

      {/* PROJECTOR VOLUMETRIC LIGHT BEAM */}
      <ProjectorBeam />

      {/* SUSPECT CHARACTERS SEATED (BLACK SILHOUETTES) */}
      <SuspectGroup />

      {/* IN-SCENE CLICKABLE EVIDENCE OBJECTS */}
      {initialEvidenceItems
        .filter((item) => item.inScene)
        .map((item) => (
          <EvidenceObject key={item.id} evidence={item} />
        ))}
    </group>
  );
}
