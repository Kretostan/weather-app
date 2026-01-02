import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const SUN_TEXTURE = "sun.jpg";
const SUN_SPIN_SPEED = 0.2;
const SUN_RADIUS = 5;
const GLOW_SIZE = 256;

const Sun = () => {
	const sunTexture = useTexture(SUN_TEXTURE);

	const sunRef = useRef<THREE.Mesh | null>(null);
	const glowRef = useRef<THREE.Sprite | null>(null);

	const glowTexture = useMemo(() => {
		if (typeof document === "undefined") return null;

		const canvas = document.createElement("canvas");
		canvas.width = canvas.height = GLOW_SIZE;
		const ctx = canvas.getContext("2d");
		if (!ctx) return null;

		const gradient = ctx.createRadialGradient(
			GLOW_SIZE / 2,
			GLOW_SIZE / 2,
			0,
			GLOW_SIZE / 2,
			GLOW_SIZE / 2,
			GLOW_SIZE / 2,
		);

		gradient.addColorStop(0.0, "rgba(255, 255, 230, 1.0)");
		gradient.addColorStop(0.4, "rgba(255, 180, 100, 0.4)");
		gradient.addColorStop(1.0, "rgba(255, 150, 80, 0.0)");

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, GLOW_SIZE, GLOW_SIZE);

		const texture = new THREE.CanvasTexture(canvas);
		texture.needsUpdate = true;
		return texture;
	}, []);

	useFrame((state, delta) => {
		if (sunRef.current) {
			sunRef.current.rotation.y += SUN_SPIN_SPEED * delta;
		}

		if (glowRef.current) {
			const t = state.clock.getElapsedTime();
			const pulse = 0.04 * Math.sin(t * 1.3) + 0.02 * Math.sin(t * 2.7);
			const baseScale = SUN_RADIUS * 4; // wielkość poświaty na ekranie
			const scale = baseScale * (1 + pulse);
			glowRef.current.scale.set(scale, scale, 1);
		}
	});

	return (
		<group>
			<pointLight position={[0, 0, 0]} intensity={150} decay={1} castShadow />
			<mesh ref={sunRef} position={[0, 0, 0]}>
				<sphereGeometry args={[SUN_RADIUS, 64, 64]} />
				<meshStandardMaterial
					map={sunTexture}
					emissiveMap={sunTexture}
					emissiveIntensity={2}
					emissive={"#ffffff"}
					toneMapped={false}
				/>
			</mesh>
			<sprite ref={glowRef} position={[0, 0, 0]} frustumCulled={false}>
				<spriteMaterial
					map={glowTexture ?? null}
					color="#ffdd99"
					transparent
					depthWrite={false}
					blending={THREE.AdditiveBlending}
				/>
			</sprite>
		</group>
	);
};

export default Sun;
