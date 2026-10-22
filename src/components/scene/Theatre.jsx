// src/components/scene/Theatre.jsx
import React from "react";
import * as THREE from "three";
import { CinemaSeats } from "./CinemaSeats";
import { ProjectorBeam } from "./ProjectorBeam";
import { RainWindow } from "./RainWindow";
import { LightingRig } from "./LightingRig";
import { Atmosphere } from "./Atmosphere";
import { SuspectGroup } from "../characters/SuspectGroup";
import { EvidenceObject } from "../evidence/EvidenceObject";
import { initialEvidenceItems } from "../../data/evidence";

export default function Theatre() {
  // Atmospheric Noir Materials
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: "#18181b", // dark aged concrete / stained carpet
    roughness: 0.9,
    metalness: 0.1
  });

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: "#0c191c", // deep teal / charcoal plaster
    roughness: 0.85,
    metalness: 0.05
  });

  const screenFrameMaterial = new THREE.MeshStandardMaterial({
    color: "#0a0a0a",
    roughness: 0.9
  });

  const screenFabricMaterial = new THREE.MeshStandardMaterial({
    color: "#d4d4d8", // silver screen fabric catching dim projector bounce
    roughness: 0.45,
    metalness: 0.1
  });

  const curtainMaterial = new THREE.MeshStandardMaterial({
    color: "#450a0a", // heavy dark crimson velvet drapery
    roughness: 0.95
  });

  const brassMaterial = new THREE.MeshStandardMaterial({
    color: "#d97706",
    roughness: 0.4,
    metalness: 0.8
  });

  return (
    <group name="RexTalkiesAuditorium">
      {/* LIGHTING RIG */}
      <LightingRig />

      {/* ATMOSPHERIC PARTICLES & DUST */}
      <Atmosphere />

      {/* RAIN & MONSOON BLEED AT EXIT DOOR */}
      <RainWindow />

      {/* PROJECTOR VOLUMETRIC BEAM */}
      <ProjectorBeam />

      {/* CINEMA SEATING ROWS */}
      <CinemaSeats />

      {/* SUSPECT CHARACTERS SEATED */}
      <SuspectGroup />

      {/* IN-SCENE CLICKABLE EVIDENCE OBJECTS */}
      {initialEvidenceItems
        .filter((item) => item.inScene)
        .map((item) => (
          <EvidenceObject key={item.id} evidence={item} />
        ))}

      {/* FLOOR (Main Auditorium Floor) */}
      <mesh
        position={[0, -0.05, -7]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={floorMaterial}
        receiveShadow
      >
        <planeGeometry args={[22, 28]} />
      </mesh>

      {/* CEILING */}
      <mesh
        position={[0, 7.5, -7]}
        rotation={[Math.PI / 2, 0, 0]}
        material={wallMaterial}
      >
        <planeGeometry args={[22, 28]} />
      </mesh>

      {/* FRONT WALL & PROSCENIUM STAGE (Screen at front) */}
      <group position={[0, 0, -15.2]}>
        {/* Stage Platform */}
        <mesh position={[0, 0.45, 1.2]} material={wallMaterial} receiveShadow>
          <boxGeometry args={[16, 0.9, 3]} />
        </mesh>
        {/* Stage Steps */}
        <mesh position={[0, 0.22, 2.9]} material={wallMaterial}>
          <boxGeometry args={[4, 0.44, 0.6]} />
        </mesh>

        {/* Proscenium Arch Frame */}
        <mesh position={[-6.2, 4.2, 0]} material={screenFrameMaterial}>
          <boxGeometry args={[1.2, 7.5, 0.4]} />
        </mesh>
        <mesh position={[6.2, 4.2, 0]} material={screenFrameMaterial}>
          <boxGeometry args={[1.2, 7.5, 0.4]} />
        </mesh>
        <mesh position={[0, 7.4, 0]} material={screenFrameMaterial}>
          <boxGeometry args={[13.6, 1.2, 0.4]} />
        </mesh>

        {/* Vintage Velvet Drapery (Left & Right Flanks) */}
        <mesh position={[-5.0, 4.0, 0.15]} material={curtainMaterial}>
          <boxGeometry args={[1.6, 6.8, 0.3]} />
        </mesh>
        <mesh position={[5.0, 4.0, 0.15]} material={curtainMaterial}>
          <boxGeometry args={[1.6, 6.8, 0.3]} />
        </mesh>

        {/* SILVER SCREEN (Receives projector light bounce) */}
        <mesh position={[0, 4.0, 0.1]} material={screenFabricMaterial} receiveShadow>
          <planeGeometry args={[9.4, 5.4]} />
        </mesh>
      </group>

      {/* REAR WALL & PROJECTION BOOTH */}
      <group position={[0, 0, 2.5]}>
        {/* Full back wall */}
        <mesh position={[0, 4, 0]} material={wallMaterial} receiveShadow>
          <boxGeometry args={[22, 8, 0.5]} />
        </mesh>

        {/* Upper Balcony & Projection Booth Box */}
        <mesh position={[0, 5.2, -0.6]} material={wallMaterial}>
          <boxGeometry args={[6.5, 3.4, 1.8]} />
        </mesh>

        {/* Projection Booth Glass Aperture / Slit */}
        <mesh position={[0, 4.8, -1.52]}>
          <boxGeometry args={[1.4, 0.6, 0.1]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Brass Plaque: "REX TALKIES PROJECTION BOOTH - ESTD. 1948" */}
        <mesh position={[-1.6, 4.8, -1.52]} material={brassMaterial}>
          <boxGeometry args={[0.9, 0.3, 0.05]} />
        </mesh>

        {/* Booth Bell Cord Hanging from Balcony */}
        <mesh position={[-2.4, 3.6, -1.2]}>
          <cylinderGeometry args={[0.015, 0.015, 2.8, 6]} />
          <meshStandardMaterial color="#b45309" roughness={0.9} />
        </mesh>
        {/* Bell Pull Ring */}
        <mesh position={[-2.4, 2.1, -1.2]} rotation={[Math.PI / 2, 0, 0]} material={brassMaterial}>
          <torusGeometry args={[0.06, 0.012, 6, 12]} />
        </mesh>
      </group>

      {/* LEFT WALL WITH ART-DECO PILASTERS & POSTER FRAMES */}
      <group position={[-10.2, 0, -7]}>
        <mesh position={[0, 4, 0]} material={wallMaterial} receiveShadow>
          <boxGeometry args={[0.5, 8, 28]} />
        </mesh>

        {/* Art-Deco Fluted Acoustic Pilasters */}
        {[-8, -4, 0, 4].map((zPos, i) => (
          <group key={i} position={[0.28, 4, zPos]}>
            <mesh material={wallMaterial}>
              <boxGeometry args={[0.15, 7.2, 0.8]} />
            </mesh>
            {/* Amber Wall Sconce Light */}
            <mesh position={[0.1, 0.6, 0]}>
              <boxGeometry args={[0.12, 0.35, 0.22]} />
              <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.6} />
            </mesh>
            <pointLight position={[0.2, 0.6, 0]} color="#f59e0b" intensity={0.25} distance={3.5} />
          </group>
        ))}

        {/* Torn Vintage Hindi Movie Poster Frame 1 */}
        <group position={[0.28, 3.2, -6.5]}>
          <mesh material={screenFrameMaterial}>
            <boxGeometry args={[0.05, 1.8, 1.2]} />
          </mesh>
          <mesh position={[0.03, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[1.1, 1.7]} />
            <meshStandardMaterial color="#334155" roughness={0.8} />
          </mesh>
          {/* Torn Edge Marker */}
          <mesh position={[0.04, -0.4, 0.2]}>
            <coneGeometry args={[0.12, 0.2, 3]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </group>
      </group>

      {/* RIGHT WALL WITH GENERATOR CONTROL BOX & VINTAGE POSTERS */}
      <group position={[10.2, 0, -7]}>
        <mesh position={[0, 4, 0]} material={wallMaterial} receiveShadow>
          <boxGeometry args={[0.5, 8, 28]} />
        </mesh>

        {/* Art-Deco Pilasters */}
        {[-8, -4, 0, 4].map((zPos, i) => (
          <group key={i} position={[-0.28, 4, zPos]}>
            <mesh material={wallMaterial}>
              <boxGeometry args={[0.15, 7.2, 0.8]} />
            </mesh>
            <mesh position={[-0.1, 0.6, 0]}>
              <boxGeometry args={[0.12, 0.35, 0.22]} />
              <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.6} />
            </mesh>
            <pointLight position={[-0.2, 0.6, 0]} color="#f59e0b" intensity={0.25} distance={3.5} />
          </group>
        ))}

        {/* ELECTRICAL CONTROL BOX (Tampered Auxiliary Fuse Box) */}
        <group position={[-0.32, 2.4, -2.5]}>
          <mesh material={screenFrameMaterial} castShadow>
            <boxGeometry args={[0.18, 0.9, 0.65]} />
          </mesh>
          {/* Gauge Dial face on front */}
          <mesh position={[-0.1, 0.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <circleGeometry args={[0.14, 16]} />
            <meshStandardMaterial color="#fef08a" emissive="#ca8a04" emissiveIntensity={0.4} />
          </mesh>
          {/* Danger Warning Stripe */}
          <mesh position={[-0.1, -0.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[0.55, 0.12]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          {/* Sparking/Flickering Warning Light */}
          <pointLight position={[-0.25, 0.2, 0]} color="#ef4444" intensity={0.3} distance={2.5} />
        </group>

        {/* Old Film Reel Stacks near Corner */}
        <group position={[-1.2, 0.25, -12.5]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.5, 0.5, 0.12, 18]} />
            <meshStandardMaterial color="#52525b" metalness={0.7} />
          </mesh>
          <mesh position={[0, 0.14, 0]} rotation={[Math.PI / 2, 0, 0.4]} castShadow>
            <cylinderGeometry args={[0.48, 0.48, 0.12, 18]} />
            <meshStandardMaterial color="#3f3f46" metalness={0.7} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
