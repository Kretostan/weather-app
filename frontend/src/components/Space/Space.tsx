import { Canvas } from "@react-three/fiber";

import Scene from "./space/Scene.tsx";

const CAMERA_CONFIG = {
	fov: 75,
	near: 0.1,
	far: 1000,
	position: [-3, 0, 30] as [number, number, number],
};

export const Space = () => {
	return (
		<Canvas camera={CAMERA_CONFIG} className="h-screen w-screen" shadows>
			<Scene />
		</Canvas>
	);
};
