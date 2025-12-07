import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const EARTH_RADIUS = 3;
const EARTH_DISTANCE = 30;
const EARTH_ORBIT_SPEED = 0.1;
const EARTH_SPIN_SPEED = 1.0;

const MOON_RADIUS = 1;
const MOON_DISTANCE = 6;
const MOON_ORBIT_SPEED = 0.6;

const EarthSystem = () => {
	const [earthTexture, earthNormal] = useTexture([
		"earth.png",
		"earth_normal.png",
	]);
	const [moonTexture, moonNormal] = useTexture(["moon.jpg", "moon_normal.png"]);

	const earthOrbitRef = useRef<THREE.Group | null>(null);
	const moonOrbitRef = useRef<THREE.Group | null>(null);
	const earthRef = useRef<THREE.Mesh | null>(null);
	const moonRef = useRef<THREE.Mesh | null>(null);

	useFrame(({ clock }) => {
		const t = clock.getElapsedTime();

		const earthOrbitAngle = EARTH_ORBIT_SPEED * t;
		const moonOrbitAngle = MOON_ORBIT_SPEED * t;
		const earthSpinAngle = EARTH_SPIN_SPEED * t;

		if (earthOrbitRef.current) {
			earthOrbitRef.current.rotation.y = earthOrbitAngle;
		}
		if (moonOrbitRef.current) {
			moonOrbitRef.current.rotation.y = moonOrbitAngle;
		}
		if (earthRef.current) {
			earthRef.current.rotation.y = earthSpinAngle;
		}
		if (moonRef.current) {
			moonRef.current.rotation.y = -moonOrbitAngle;
		}
	});

	return (
		<group ref={earthOrbitRef} position={[0, 0, 0]}>
			<group position={[EARTH_DISTANCE, 0, 0]}>
				<mesh ref={earthRef} castShadow>
					<sphereGeometry args={[EARTH_RADIUS, 32, 32]} />
					<meshStandardMaterial
						map={earthTexture}
						normalMap={earthNormal}
						metalness={0}
						roughness={0.9}
					/>
				</mesh>
				<mesh castShadow={false} receiveShadow={false}>
					<sphereGeometry args={[EARTH_RADIUS * 1.05, 32, 32]} />
					<meshBasicMaterial
						color="#4db8ff"
						transparent
						opacity={0.18}
						blending={THREE.AdditiveBlending}
						depthWrite={false}
						side={THREE.BackSide}
					/>
				</mesh>
			</group>
			<group ref={moonOrbitRef} position={[EARTH_DISTANCE, 0, 0]}>
				<group position={[MOON_DISTANCE, 0, 0]}>
					<mesh ref={moonRef} castShadow receiveShadow>
						<sphereGeometry args={[MOON_RADIUS, 32, 32]} />
						<meshPhysicalMaterial
							map={moonTexture}
							normalMap={moonNormal}
							normalScale={[1, 1]}
							metalness={0}
							roughness={0.6}
						/>
					</mesh>
				</group>
			</group>
		</group>
	);
};

export default EarthSystem;
