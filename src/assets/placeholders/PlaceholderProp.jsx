// src/assets/placeholders/PlaceholderProp.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Procedural 3D primitive geometry for all evidence objects.
 * Distinct, recognizable silhouettes and materials for detective inspection.
 */
export function PlaceholderProp({
  type = "prop",
  isSelected = false,
  isHovered = false,
  debug = false,
  interactive = true
}) {
  const meshRef = useRef();

  // Subtle floating highlight if hovered
  useFrame((state) => {
    if (isHovered && meshRef.current && interactive) {
      meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 4) * 0.001;
    }
  });

  const highlightColor = isSelected ? "#f59e0b" : isHovered ? "#38bdf8" : null;

  switch (type) {
    case "ticket":
      return (
        <group ref={meshRef}>
          {/* Main rectangular cardboard ticket */}
          <mesh castShadow>
            <boxGeometry args={[0.22, 0.008, 0.44]} />
            <meshStandardMaterial
              color={highlightColor || "#dfd7c2"}
              roughness={0.8}
              wireframe={debug}
            />
          </mesh>
          {/* Printed ink band */}
          <mesh position={[0, 0.005, 0]}>
            <boxGeometry args={[0.18, 0.002, 0.12]} />
            <meshStandardMaterial color="#6b2128" />
          </mesh>
          {/* Triangular punch notch cutout marker */}
          <mesh position={[0.08, 0.006, 0.18]}>
            <coneGeometry args={[0.02, 0.01, 3]} />
            <meshStandardMaterial color="#0c191c" />
          </mesh>
        </group>
      );

    case "key":
      return (
        <group ref={meshRef}>
          {/* Key bow ring */}
          <mesh position={[0, 0, -0.12]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[0.045, 0.012, 8, 20]} />
            <meshStandardMaterial
              color={highlightColor || "#d97706"}
              metalness={0.85}
              roughness={0.3}
              wireframe={debug}
            />
          </mesh>
          {/* Key shaft */}
          <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.012, 0.012, 0.22, 8]} />
            <meshStandardMaterial
              color={highlightColor || "#b45309"}
              metalness={0.9}
              roughness={0.35}
            />
          </mesh>
          {/* Key bit (teeth) */}
          <mesh position={[0.025, 0, 0.09]} castShadow>
            <boxGeometry args={[0.04, 0.01, 0.06]} />
            <meshStandardMaterial
              color={highlightColor || "#d97706"}
              metalness={0.85}
              roughness={0.3}
            />
          </mesh>
        </group>
      );

    case "glass":
      return (
        <group ref={meshRef}>
          {/* Flared glass body */}
          <mesh position={[0, 0.1, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.05, 0.2, 16]} />
            <meshPhysicalMaterial
              color={highlightColor || "#94a3b8"}
              transmission={0.7}
              opacity={0.85}
              transparent
              roughness={0.15}
              ior={1.45}
              wireframe={debug}
            />
          </mesh>
          {/* Tea liquid & dregs inside */}
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.055, 0.045, 0.09, 12]} />
            <meshStandardMaterial color="#78350f" roughness={0.4} />
          </mesh>
        </group>
      );

    case "ledger":
      return (
        <group ref={meshRef}>
          {/* Hardbound book cover */}
          <mesh castShadow>
            <boxGeometry args={[0.34, 0.06, 0.46]} />
            <meshStandardMaterial
              color={highlightColor || "#3f3f46"}
              roughness={0.85}
              wireframe={debug}
            />
          </mesh>
          {/* Paper pages block */}
          <mesh position={[0.01, 0, 0]}>
            <boxGeometry args={[0.32, 0.048, 0.44]} />
            <meshStandardMaterial color="#f5f5f4" roughness={0.9} />
          </mesh>
          {/* Red spine binding */}
          <mesh position={[-0.165, 0, 0]}>
            <boxGeometry args={[0.02, 0.064, 0.46]} />
            <meshStandardMaterial color="#991b1b" roughness={0.5} />
          </mesh>
        </group>
      );

    case "filmstrip":
      return (
        <group ref={meshRef}>
          {/* Celluloid curved ribbon */}
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.004, 0.6]} />
            <meshPhysicalMaterial
              color={highlightColor || "#1e293b"}
              transmission={0.5}
              transparent
              opacity={0.8}
              roughness={0.2}
              wireframe={debug}
            />
          </mesh>
          {/* Tape splice indicator */}
          <mesh position={[0, 0.003, 0]}>
            <boxGeometry args={[0.085, 0.002, 0.04]} />
            <meshStandardMaterial color="#fef08a" transparent opacity={0.85} />
          </mesh>
        </group>
      );

    case "gauge":
      return (
        <group ref={meshRef}>
          {/* Gauge housing */}
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.14, 0.14, 0.06, 24]} />
            <meshStandardMaterial color={highlightColor || "#18181b"} metalness={0.7} />
          </mesh>
          {/* Dial Face */}
          <mesh position={[0, 0.032, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.12, 24]} />
            <meshStandardMaterial color="#fafaf9" />
          </mesh>
          {/* Needle bent at high reading */}
          <mesh position={[0.03, 0.035, 0.02]} rotation={[0, 0, -0.9]}>
            <boxGeometry args={[0.08, 0.006, 0.002]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
        </group>
      );

    case "phone":
      return (
        <group ref={meshRef}>
          {/* Phone body */}
          <mesh castShadow>
            <boxGeometry args={[0.14, 0.016, 0.28]} />
            <meshStandardMaterial color={highlightColor || "#09090b"} metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Screen glow */}
          <mesh position={[0, 0.009, 0]}>
            <boxGeometry args={[0.125, 0.002, 0.25]} />
            <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.5} />
          </mesh>
        </group>
      );

    case "canister":
      return (
        <group ref={meshRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.22, 0.08, 24]} />
            <meshStandardMaterial color={highlightColor || "#475569"} metalness={0.7} roughness={0.4} />
          </mesh>
          {/* Central hub recess */}
          <mesh position={[0, 0.042, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.01, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
        </group>
      );

    case "clamp":
      return (
        <group ref={meshRef}>
          <mesh castShadow>
            <cylinderGeometry args={[0.06, 0.06, 0.16, 6]} />
            <meshStandardMaterial color={highlightColor || "#713f12"} metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[0.18, 0.02, 0.04]} />
            <meshStandardMaterial color="#ca8a04" metalness={0.8} />
          </mesh>
        </group>
      );

    case "token":
      return (
        <group ref={meshRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.014, 8]} />
            <meshStandardMaterial color={highlightColor || "#d97706"} metalness={0.85} roughness={0.25} />
          </mesh>
        </group>
      );

    default:
      return (
        <mesh ref={meshRef} castShadow>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color={highlightColor || "#94a3b8"} wireframe={debug} />
        </mesh>
      );
  }
}
