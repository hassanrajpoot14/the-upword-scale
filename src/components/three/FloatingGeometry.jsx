"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Lightweight geometric mark — no transmission, no Float helper.
 * Calls invalidate() so frameloop="demand" still animates while active.
 */
export default function FloatingGeometry({ mouse, active }) {
  const group = useRef(null);
  const wire = useRef(null);
  const ring = useRef(null);
  const { invalidate } = useThree();

  const coreGeo = useMemo(() => new THREE.IcosahedronGeometry(1.05, 0), []);
  const wireGeo = useMemo(() => new THREE.IcosahedronGeometry(1.4, 1), []);
  const ringGeo = useMemo(() => new THREE.TorusGeometry(1.8, 0.018, 12, 64), []);

  useFrame((state, delta) => {
    if (!active || !group.current) return;

    const t = state.clock.elapsedTime;
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      mouse.current.x * 0.45,
      0.06
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      mouse.current.y * 0.28,
      0.06
    );

    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      mouse.current.y * 0.22 + Math.sin(t * 0.35) * 0.05,
      0.06
    );

    if (wire.current) {
      wire.current.rotation.y -= delta * 0.08;
    }
    if (ring.current) {
      ring.current.rotation.z += delta * 0.12;
    }

    // Keep demand-loop alive while hero is visible
    invalidate();
  });

  return (
    <group ref={group}>
      <mesh geometry={coreGeo}>
        <meshStandardMaterial
          color="#10b981"
          metalness={0.35}
          roughness={0.28}
          emissive="#065f46"
          emissiveIntensity={0.25}
        />
      </mesh>

      <mesh ref={wire} geometry={wireGeo}>
        <meshBasicMaterial
          color="#047857"
          wireframe
          transparent
          opacity={0.38}
        />
      </mesh>

      <mesh ref={ring} geometry={ringGeo} rotation={[Math.PI / 2.5, 0.3, 0]}>
        <meshStandardMaterial
          color="#14b8a6"
          emissive="#0f766e"
          emissiveIntensity={0.4}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      <pointLight color="#6ee7b7" intensity={1.1} distance={6} decay={2} />
    </group>
  );
}
