"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import FloatingGeometry from "./FloatingGeometry";

function SceneContent({ mouse, active }) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 5, 3]} intensity={1.05} color="#f8fafc" />
      <directionalLight position={[-3, -1, -3]} intensity={0.35} color="#14b8a6" />
      <FloatingGeometry mouse={mouse} active={active} />
    </>
  );
}

function InvalidateOnMount() {
  const { invalidate } = useThree();
  useEffect(() => {
    invalidate();
  }, [invalidate]);
  return null;
}

/**
 * WebGL scene — demand loop only; parent toggles `active` via useInView.
 */
export default function HeroScene({ active = true }) {
  const mouse = useRef({ x: 0, y: 0 });

  const onPointerMove = (event) => {
    if (!active) return;
    const { clientX, clientY, currentTarget } = event;
    const rect = currentTarget.getBoundingClientRect();
    mouse.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <div
      className="absolute inset-0 h-full w-full"
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        mouse.current.x = 0;
        mouse.current.y = 0;
      }}
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 1.25]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0.15, 5.2], fov: 42, near: 0.1, far: 40 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <InvalidateOnMount />
          <SceneContent mouse={mouse} active={active} />
        </Suspense>
      </Canvas>
    </div>
  );
}
