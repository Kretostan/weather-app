import { OrbitControls, useTexture } from "@react-three/drei";
import type { FC } from "react";
import EarthSystem from "./EarthSystem.tsx";
import Stars from "./Stars.tsx";
import Sun from "./Sun.tsx";

const SPACE_TEXTURE = "space.jpg";

const Scene: FC = () => {
	const spaceTexture = useTexture(SPACE_TEXTURE);

	return (
		<>
			<primitive attach="background" object={spaceTexture} />
			<ambientLight intensity={0.1} />
			<group position={[10, 0, 0]}>
				<Stars />
				<Sun />
				<EarthSystem />
			</group>
			<OrbitControls enableDamping />
		</>
	);
};

export default Scene;
