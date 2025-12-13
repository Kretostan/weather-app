import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const STAR_SIZE = 64;

const Stars = () => {
	const materialRef = useRef<THREE.PointsMaterial | null>(null);

	const starTexture = useMemo(() => {
		if (typeof document === "undefined") return null;

		const canvas = document.createElement("canvas");
		canvas.width = canvas.height = STAR_SIZE;
		const ctx = canvas.getContext("2d");
		if (!ctx) return null;

		const gradient = ctx.createRadialGradient(
			STAR_SIZE / 2,
			STAR_SIZE / 2,
			0,
			STAR_SIZE / 2,
			STAR_SIZE / 2,
			STAR_SIZE / 2,
		);

		gradient.addColorStop(0.0, "rgba(255,255,255,1)");
		gradient.addColorStop(0.3, "rgba(255,255,255,0.9)");
		gradient.addColorStop(1.0, "rgba(255,255,255,0)");

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, STAR_SIZE, STAR_SIZE);

		const tex = new THREE.CanvasTexture(canvas);
		tex.needsUpdate = true;
		return tex;
	}, []);

	const geometry = useMemo(() => {
		const count = 2000;
		const positions = new Float32Array(count * 3);

		const innerRadius = 100;
		const outerRadius = 800;

		for (let i = 0; i < count; i++) {
			const idx = i * 3;

			const u = Math.random();
			const v = Math.random();
			const theta = 2 * Math.PI * u;
			const phi = Math.acos(2 * v - 1);

			const r = innerRadius + Math.random() * (outerRadius - innerRadius);
			const sinPhi = Math.sin(phi);

			positions[idx] = r * sinPhi * Math.cos(theta);
			positions[idx + 1] = r * sinPhi * Math.sin(theta);
			positions[idx + 2] = r * Math.cos(phi);
		}

		const geom = new THREE.BufferGeometry();
		geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
		return geom;
	}, []);

	useFrame(({ clock }) => {
		const t = clock.getElapsedTime();
		if (materialRef.current) {
			const baseSize = 1.6;
			const amplitude = 0.3;
			materialRef.current.size = baseSize + Math.sin(t * 0.8) * amplitude;
		}
	});

	return (
		<points geometry={geometry}>
			<pointsMaterial
				ref={materialRef}
				size={1.6}
				map={starTexture ?? null}
				color="#ffffff"
				transparent
				opacity={0.95}
				alphaTest={0.5}
				depthWrite={false}
				blending={THREE.AdditiveBlending}
				sizeAttenuation
			/>
		</points>
	);
};

export default Stars;
