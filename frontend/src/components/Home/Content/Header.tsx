const Header = () => {
	return (
		<div className="flex flex-col gap-6 text-center">
			<h2 className="text-2xl sm:text-3xl h2-shadow font-bold">Welcome!</h2>
			<p className="max-w-[350px] opacity-70">
				Start by typing a city name. We'll help you check the weather and plan
				your day!
			</p>
		</div>
	);
};

export default Header;
