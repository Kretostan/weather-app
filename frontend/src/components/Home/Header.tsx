const Header = () => {
	return (
		<div className="flex flex-col gap-6 text-center">
			<h2 className="text-2xl sm:text-3xl bg-transparent h2-shadow text-text-primary font-bold">
				Welcome!
			</h2>
			<p className="max-w-87.5">
				Start by typing a city name. We'll help you check the weather and plan
				your day!
			</p>
		</div>
	);
};

export default Header;
