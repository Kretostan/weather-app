import Content from "../components/Home/Content/Content.tsx";
import Header from "../components/Home/Header/Header.tsx";

function Home() {
	// TODO: Error page (vercel redirecting)
	// TODO: Responsive design
	// TODO: Do components
	// TODO: Ogarnąć błędy, które mogą się pojawić
	return (
		<div className="relative inset-0 z-10 my-12 sm:my-6">
			<Header>
				<Header.Logo />
				<Header.Title>Weather App</Header.Title>
			</Header>
			<Content>
				<Content.Header />
				<Content.Form />
				<Content.Results />
			</Content>
		</div>
	);
}

export default Home;
