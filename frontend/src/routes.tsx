import { createBrowserRouter } from "react-router";
import Weather from "@/pages/Weather.tsx";
import Home from "./pages/Home.tsx";
import Root from "./pages/Root.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "weather", element: <Weather /> },
		],
	},
]);

export default router;
