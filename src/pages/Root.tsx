import { Outlet } from "react-router";
import backgroundImage from "../assets/background.webp";

const RootLayout = () => {
    window.addEventListener("load", () => {
        document.body.style.backgroundImage = `url(${backgroundImage})`;
    });

    return <div className="flex flex-1 flex-col items-center gap-12 sm:gap-16 py-12 sm:py-16 min-h-screen">
        <Outlet />
    </div>
}

export default RootLayout;
