import Logo from "@/components/Layout/Header/Logo.tsx";
import Title from "@/components/Layout/Header/Title.tsx";

const Header = () => {
	return (
		<header className="flex justify-center items-center text-center">
			<Logo />
			<Title>Weather App</Title>
		</header>
	);
};

export default Header;
