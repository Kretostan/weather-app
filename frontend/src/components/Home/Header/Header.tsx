import type { ReactNode } from "react";
import Logo from "./Logo.tsx";
import Title from "./Title.tsx";

const Header = ({ children }: { children: ReactNode }) => {
	return <div className="flex items-center mb-6 text-center">{children}</div>;
};

Header.Logo = Logo;
Header.Title = Title;

export default Header;
