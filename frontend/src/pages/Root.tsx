import { Outlet } from "react-router";
import Content from "@/components/Layout/Content.tsx";
import Header from "@/components/Layout/Header.tsx";
import { Space } from "../components/Space/Space.tsx";

const RootLayout = () => {
	return (
		<div className="flex flex-col items-center">
			<div className="fixed inset-0 z-5">
				<Space />
			</div>
			<div className="flex flex-col items-center gap-8 sm:gap-6 px-2 my-10 sm:my-8 z-10 w-full">
				<Header />
				<Content>
					<Outlet />
				</Content>
			</div>
		</div>
	);
};

export default RootLayout;
