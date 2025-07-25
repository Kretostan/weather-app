import { Outlet } from "react-router";

const RootLayout = () => {
    return <div className="flex flex-1 flex-col items-center gap-12 sm:gap-16 py-12 sm:py-16 min-h-screen">
        <Outlet />
    </div>
}

export default RootLayout;