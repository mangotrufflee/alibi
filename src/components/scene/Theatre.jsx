// src/components/scene/Theatre.jsx
import React, { useMemo } from "react";
import * as THREE from "three";
import { CinemaSeats } from "./CinemaSeats";
import { ProjectorBeam } from "./ProjectorBeam";
import { RainWindow } from "./RainWindow";
import { LightingRig } from "./LightingRig";
import { Atmosphere } from "./Atmosphere";
import { SuspectGroup } from "../characters/SuspectGroup";
import { TheatreModel } from "./TheatreModel";

/**
 * 3D Auditorium Environment for Rex Talkies (Old Delhi, 1980s).
 * Provides the full architectural theatre:
 * - Auditorium floor and ceiling planes
 * - Front proscenium stage with silver screen, vintage velvet drapery, and steps
 * - Rear wall with projection booth box, balcony, aperture slit, brass plaque, and bell cord
 * - Left and right walls with art-deco fluted pilasters, sconces, vintage movie poster frames,
 *   tampered electrical control box, and vintage film reel stacks
 * - 4 rows of 24 cinema seats
 * - The 5 canonical suspects rendered with imported 3D people models
 * - Random audience members and spectators placed in seats and aisles
 * - Single ambient light for clean, uniform visibility
 */
export default function Theatre() {
  // Poly Haven PBR Texture loader helper
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);

  // Floor Material: Poly Haven dirty_carpet PBR
  const floorMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: "#3f3f46", // noir tone
      roughness: 0.85,
      metalness: 0.08
    });
    textureLoader.load("/assets/textures/environment/carpet_diff_1k.jpg", (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(6, 8);
      tex.colorSpace = THREE.SRGBColorSpace;
      mat.map = tex;
      mat.needsUpdate = true;
    });
    textureLoader.load("/assets/textures/environment/carpet_rough_1k.jpg", (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(6, 8);
      mat.roughnessMap = tex;
      mat.needsUpdate = true;
    });
    textureLoader.load("/assets/textures/environment/carpet_nor_1k.jpg", (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(6, 8);
      mat.normalMap = tex;
      mat.normalScale.set(0.6, 0.6);
      mat.needsUpdate = true;
    });
    return mat;
  }, [textureLoader]);

  // Wall Material: Poly Haven plaster_grey_04 PBR
  const wallMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: "#27272a", // dark aged slate
      roughness: 0.88,
      metalness: 0.04
    });
    textureLoader.load("/assets/textures/environment/plaster_diff_1k.jpg", (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 3);
      tex.colorSpace = THREE.SRGBColorSpace;
      mat.map = tex;
      mat.needsUpdate = true;
    });
    textureLoader.load("/assets/textures/environment/plaster_rough_1k.jpg", (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 3);
      mat.roughnessMap = tex;
      mat.needsUpdate = true;
    });
    textureLoader.load("/assets/textures/environment/plaster_nor_1k.jpg", (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 3);
      mat.normalMap = tex;
      mat.normalScale.set(0.5, 0.5);
      mat.needsUpdate = true;
    });
    return mat;
  }, [textureLoader]);

  // Stage Floor & Steps: Poly Haven dark_wooden_planks PBR
  const stageMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: "#3e2723", // aged dark teak proscenium planks
      roughness: 0.75,
      metalness: 0.12
    });
    textureLoader.load("/assets/textures/environment/wood_planks_diff_1k.jpg", (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 2);
      tex.colorSpace = THREE.SRGBColorSpace;
      mat.map = tex;
      mat.needsUpdate = true;
    });
    textureLoader.load("/assets/textures/environment/wood_planks_rough_1k.jpg", (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 2);
      mat.roughnessMap = tex;
      mat.needsUpdate = true;
    });
    textureLoader.load("/assets/textures/environment/wood_planks_nor_1k.jpg", (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 2);
      mat.normalMap = tex;
      mat.normalScale.set(0.7, 0.7);
      mat.needsUpdate = true;
    });
    return mat;
  }, [textureLoader]);

  // Architectural Pilasters: Poly Haven plaster with fluting repeat
  const pilasterMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: "#18181b",
      roughness: 0.8,
      metalness: 0.15
    });
    textureLoader.load("/assets/textures/environment/plaster_nor_1k.jpg", (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(1, 4);
      mat.normalMap = tex;
      mat.needsUpdate = true;
    });
    return mat;
  }, [textureLoader]);

  const screenFrameMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#09090b",
    roughness: 0.9,
    metalness: 0.1
  }), []);

  const screenFabricMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#e4e4e7", // silver screen fabric
    roughness: 0.5,
    metalness: 0.1
  }), []);

  const curtainMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#4c0519", // heavy crimson velvet drapery
    roughness: 0.95,
    metalness: 0.05
  }), []);

  const brassMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#d97706",
    roughness: 0.35,
    metalness: 0.8
  }), []);

  const sconceMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#f59e0b",
    emissive: "#d97706",
    emissiveIntensity: 0.6
  }), []);

  return (
    <group name="RexTalkiesAuditorium">
      {/* USER IMPORTED THEATRE MODEL FALLBACK (IF ASSET PRESENT) */}
      <TheatreModel position={[0, 0, -5]} scale={[1, 1, 1]} />

      {/* SINGLE AMBIENT LIGHTING RIG */}
      <LightingRig />

      {/* ATMOSPHERIC PARTICLES & DUST */}
      <Atmosphere />

      {/* RAIN & MONSOON BLEED AT EXIT DOOR */}
      <RainWindow />

      {/* PROJECTOR VOLUMETRIC LIGHT BEAM */}
      <ProjectorBeam />

      {/* CINEMA SEATING ROWS (4 ROWS x 6 SEATS) */}
      <CinemaSeats />

      {/* THE 5 SUSPECT CHARACTERS SEATED */}
      <SuspectGroup />

      {/* FLOOR (Main Auditorium Floor Plane) */}
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
        <mesh position={[0, 0.45, 1.2]} material={stageMaterial} receiveShadow>
          <boxGeometry args={[16, 0.9, 3]} />
        </mesh>
        {/* Stage Steps */}
        <mesh position={[0, 0.22, 2.9]} material={stageMaterial}>
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

        {/* SILVER SCREEN */}
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

        {/* Art-Deco Fluted Acoustic Pilasters & Sconces */}
        {[-8, -4, 0, 4].map((zPos, i) => (
          <group key={i} position={[0.28, 4, zPos]}>
            <mesh material={pilasterMaterial}>
              <boxGeometry args={[0.15, 7.2, 0.8]} />
            </mesh>
            {/* Amber Wall Sconce Emissive Fixture */}
            <mesh position={[0.1, 0.6, 0]} material={sconceMaterial}>
              <boxGeometry args={[0.12, 0.35, 0.22]} />
            </mesh>
          </group>
        ))}

        {/* Torn Vintage Movie Poster Frame 1 */}
        <group position={[0.28, 3.2, -6.5]}>
          <mesh material={screenFrameMaterial}>
            <boxGeometry args={[0.05, 1.8, 1.2]} />
          </mesh>
          <mesh position={[0.03, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[1.1, 1.7]} />
            <meshStandardMaterial color="#334155" roughness={0.8} />
          </mesh>
          <mesh position={[0.04, -0.4, 0.2]}>
            <coneGeometry args={[0.12, 0.2, 3]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </group>
      </group>

      {/* RIGHT WALL WITH ELECTRICAL FUSE BOX & VINTAGE FILM REELS */}
      <group position={[10.2, 0, -7]}>
        <mesh position={[0, 4, 0]} material={wallMaterial} receiveShadow>
          <boxGeometry args={[0.5, 8, 28]} />
        </mesh>

        {/* Art-Deco Pilasters */}
        {[-8, -4, 0, 4].map((zPos, i) => (
          <group key={i} position={[-0.28, 4, zPos]}>
            <mesh material={pilasterMaterial}>
              <boxGeometry args={[0.15, 7.2, 0.8]} />
            </mesh>
            <mesh position={[-0.1, 0.6, 0]} material={sconceMaterial}>
              <boxGeometry args={[0.12, 0.35, 0.22]} />
            </mesh>
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
            <meshStandardMaterial color="#fef08a" emissive="#ca8a04" emissiveIntensity={0.5} />
          </mesh>
          {/* Danger Warning Stripe */}
          <mesh position={[-0.1, -0.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[0.55, 0.12]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
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
