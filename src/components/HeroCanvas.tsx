import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Sparse star / atmospheric particle field.
 * Fills the full 3D volume visible to the camera so the upper half
 * of the hero section isn't empty black space.
 */
function StarField() {
  const ref = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const count = 1400;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      /* Spread across the entire depth of the scene,
         biased upward so the top half gets coverage.     */
      pos[i * 3]     = (Math.random() - 0.5) * 26;      // X: wide
      pos[i * 3 + 1] = Math.random() * 10 - 1;          // Y: -1 → 9 (mostly above camera)
      pos[i * 3 + 2] = Math.random() * -16 - 0.5;       // Z: behind scene

      /* Color palette: blue-indigo 55%, purple 30%, near-white 15% */
      const t = Math.random();
      if (t < 0.55) {
        col[i * 3] = 0.35 + Math.random() * 0.2;
        col[i * 3 + 1] = 0.45 + Math.random() * 0.2;
        col[i * 3 + 2] = 1.0;
      } else if (t < 0.85) {
        col[i * 3] = 0.58 + Math.random() * 0.2;
        col[i * 3 + 1] = 0.25 + Math.random() * 0.2;
        col[i * 3 + 2] = 0.92 + Math.random() * 0.08;
      } else {
        col[i * 3] = 0.82 + Math.random() * 0.18;
        col[i * 3 + 1] = 0.85 + Math.random() * 0.15;
        col[i * 3 + 2] = 1.0;
      }
    }
    return [pos, col];
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    // Extremely slow drift — barely perceptible, just alive
    ref.current.rotation.y = clock.elapsedTime * 0.003;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.0018) * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.023}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}

type MouseRef = React.MutableRefObject<{ x: number; y: number }>;

function Scene({ mouse }: { mouse: MouseRef }) {
  const glowRef = useRef<THREE.Mesh>(null!);
  const oct0    = useRef<THREE.Mesh>(null!);
  const oct1    = useRef<THREE.Mesh>(null!);
  const oct2    = useRef<THREE.Mesh>(null!);

  /**
   * A soft radial gradient texture for the floor glow spot.
   * Created once on mount via a Canvas 2D element — no external assets needed.
   */
  const glowTex = useMemo(() => {
    const sz = 256;
    const c  = document.createElement('canvas');
    c.width  = sz;
    c.height = sz;
    const ctx  = c.getContext('2d')!;
    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0,    'rgba(59, 79, 255, 0.55)');
    grad.addColorStop(0.38, 'rgba(59, 79, 255, 0.18)');
    grad.addColorStop(0.72, 'rgba(80, 40, 220, 0.07)');
    grad.addColorStop(1,    'rgba(59, 79, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, sz, sz);
    return new THREE.CanvasTexture(c);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    /* ── Floor glow spot tracks mouse with smooth lerp ── */
    if (glowRef.current) {
      const tx = mouse.current.x * 4.5;
      const tz = -mouse.current.y * 3.2;
      glowRef.current.position.x += (tx - glowRef.current.position.x) * 0.038;
      glowRef.current.position.z += (tz - glowRef.current.position.z) * 0.038;
    }

    /* ── Crystalline octahedra — very slow rotation + sine float ── */
    if (oct0.current) {
      oct0.current.rotation.x = t * 0.08;
      oct0.current.rotation.y = t * 0.12 + mouse.current.x * 0.06;
      oct0.current.position.y = -0.4 + Math.sin(t * 0.40) * 0.15;
    }
    if (oct1.current) {
      oct1.current.rotation.y = t * 0.06;
      oct1.current.rotation.z = t * 0.09;
      oct1.current.position.y = 1.2 + Math.sin(t * 0.32 + 1.2) * 0.10;
    }
    if (oct2.current) {
      oct2.current.rotation.x = t * 0.14;
      oct2.current.rotation.y = t * 0.05;
      oct2.current.position.y = 0.9 + Math.sin(t * 0.44 + 2.5) * 0.08;
    }
  });

  return (
    <>
      {/* Subtle ambient fills the dark scene just enough to see shapes */}
      <ambientLight intensity={0.22} />

      {/* Two accent point lights that tint the wireframe octahedra */}
      <pointLight color="#3B4FFF" intensity={2.8} distance={10} position={[0, 2, 1.5]} />
      <pointLight color="#7C3AED" intensity={1.4} distance={8}  position={[-4, 3, -1]} />
      <pointLight color="#06B6D4" intensity={0.9} distance={7}  position={[4, 1, -2]}  />

      {/* ── Obsidian base floor — flat dark navy, no PBR needed ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
        <planeGeometry args={[90, 90]} />
        <meshBasicMaterial color="#07071C" />
      </mesh>

      {/* Coarse grid — vivid purple-indigo lines */}
      <gridHelper args={[52, 32, '#7060FF', '#4838D0']} position={[0, -2.19, 0]} />

      {/* Fine grid — mid-depth purple lines */}
      <gridHelper args={[52, 160, '#2018A0', '#180E78']} position={[0, -2.18, 0]} />

      {/* ── Mouse-tracking radial glow spot on the floor ── */}
      <mesh ref={glowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.17, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial map={glowTex} transparent depthWrite={false} />
      </mesh>

      {/* ── Atmospheric star-particle field — fills the upper half ── */}
      <StarField />

      {/* ── Floating crystalline wireframe octahedra ── */}
      <mesh ref={oct0} position={[-2.8, -0.4, -2.0]}>
        <octahedronGeometry args={[0.40, 0]} />
        <meshBasicMaterial color="#4B5FFF" transparent opacity={0.30} wireframe />
      </mesh>

      <mesh ref={oct1} position={[2.7, 1.2, -2.4]}>
        <octahedronGeometry args={[0.28, 0]} />
        <meshBasicMaterial color="#9B6BFF" transparent opacity={0.26} wireframe />
      </mesh>

      <mesh ref={oct2} position={[-1.5, 0.9, -3.1]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.22} wireframe />
      </mesh>
    </>
  );
}

/**
 * active=false  → frameloop="demand" pauses RAF entirely (no GPU cost off-screen)
 * reduced=true  → canvas not mounted at all (zero WebGL context overhead)
 */
export default function HeroCanvas({
  mouse,
  active,
  reduced,
}: {
  mouse: MouseRef;
  active: boolean;
  reduced: boolean;
}) {
  if (reduced) return null;
  return (
    <Canvas
      frameloop={active ? 'always' : 'demand'}
      camera={{ position: [0, 0.7, 4.2], fov: 60 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      {/* Blue-tinted deep fog — makes distant floor fade naturally */}
      <fogExp2 args={['#07071C', 0.062]} />
      <Scene mouse={mouse} />
    </Canvas>
  );
}
