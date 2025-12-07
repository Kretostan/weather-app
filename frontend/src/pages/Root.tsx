import { Outlet } from "react-router";
import backgroundImage from "../assets/background.webp";
import { Space } from "../components/Space/Space.tsx";

const RootLayout = () => {
	window.addEventListener("load", () => {
		document.body.style.backgroundImage = `url(${backgroundImage})`;
	});

	return (
		<div className="flex flex-1 flex-col items-center gap-12 sm:gap-16 min-h-screen h-full w-full">
			<div className="fixed inset-0 z-5">
				<Space />
			</div>
			<Outlet />
		</div>
	);
};

export default RootLayout;
