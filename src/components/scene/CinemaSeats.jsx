// src/components/scene/CinemaSeats.jsx
import React from "react";
import * as THREE from "three";

// Seat layout constants
const ROW_COUNT = 4;
const SEATS_PER_ROW = 6;
const SEAT_WIDTH = 0.9;
const SEAT_SPACING = 1.1;
const ROW_SPACING = 1.5;

export function CinemaSeats() {
  const seatCushionGeo = new THREE.BoxGeometry(0.75, 0.12, 0.6);
  const seatBackGeo = new THREE.BoxGeometry(0.75, 0.7, 0.1);
  const armrestGeo = new THREE.BoxGeometry(0.08, 0.45, 0.55);
  const legGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8);

  const burgundyMaterial = new THREE.MeshStandardMaterial({
    color: "#6b2128", // faded burgundy velvet
    roughness: 0.9,
    metalness: 0.05
  });

  const ironMaterial = new THREE.MeshStandardMaterial({
    color: "#18181b", // cast-iron frame
    roughness: 0.6,
    metalness: 0.8
  });

  const rows = [];

  for (let r = 0; r < ROW_COUNT; r++) {
    // Stepped cinema riser elevation
    const yRiser = r * 0.18;
    const zPos = -3.5 - r * ROW_SPACING;

    for (let c = 0; c < SEATS_PER_ROW; c++) {
      // Split with center aisle
      const aisleOffset = c >= 3 ? 0.35 : -0.35;
      const xPos = (c - (SEATS_PER_ROW - 1) / 2) * SEAT_SPACING + aisleOffset;

      rows.push(
        <group key={`seat-${r}-${c}`} position={[xPos, yRiser, zPos]}>
          {/* SEAT CUSHION */}
          <mesh
            geometry={seatCushionGeo}
            material={burgundyMaterial}
            position={[0, 0.38, 0]}
            castShadow
            receiveShadow
          />

          {/* SEAT BACK (Slightly tilted) */}
          <mesh
            geometry={seatBackGeo}
            material={burgundyMaterial}
            position={[0, 0.72, -0.28]}
            rotation={[-0.14, 0, 0]}
            castShadow
            receiveShadow
          />

          {/* CAST-IRON ARMRESTS */}
          <mesh
            geometry={armrestGeo}
            material={ironMaterial}
            position={[-0.4, 0.5, -0.05]}
            castShadow
          />
          <mesh
            geometry={armrestGeo}
            material={ironMaterial}
            position={[0.4, 0.5, -0.05]}
            castShadow
          />

          {/* CAST-IRON LEGS */}
          <mesh
            geometry={legGeo}
            material={ironMaterial}
            position={[-0.35, 0.2, 0.2]}
            castShadow
          />
          <mesh
            geometry={legGeo}
            material={ironMaterial}
            position={[0.35, 0.2, 0.2]}
            castShadow
          />
          <mesh
            geometry={legGeo}
            material={ironMaterial}
            position={[-0.35, 0.2, -0.2]}
            castShadow
          />
          <mesh
            geometry={legGeo}
            material={ironMaterial}
            position={[0.35, 0.2, -0.2]}
            castShadow
          />
        </group>
      );
    }
  }

  return <group name="CinemaSeats">{rows}</group>;
}

export default CinemaSeats;
