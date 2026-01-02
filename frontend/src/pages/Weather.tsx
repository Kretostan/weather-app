import { motion } from "framer-motion";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import SecondaryButton from "@/components/UI/SecondaryButton.tsx";
import Copy from "@/components/Weather/Copy.tsx";
import Current from "@/components/Weather/Current.tsx";
import CurrentCard from "@/components/Weather/CurrentCard.tsx";
import Forecast from "@/components/Weather/Forecast.tsx";
import { useForecast } from "@/hooks/useForecast.ts";
import type { Temperature } from "@/types/weather.ts";
import { copyWeather } from "@/utils/copyWeather.ts";

const Weather = () => {
	const navigate = useNavigate();
	const [temperature, setTemperature] = useState<Temperature>("celsius");
	const { data: weather, isPending } = useForecast();
	const [showMark, setShowMark] = useState(false);

	const temperatureHandler = () => {
		setTemperature((prevState) =>
			prevState === "celsius" ? "fahrenheit" : "celsius",
		);
	};

	if (isPending) {
		return (
			<>
				<div className="h-10 w-10 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
				<p>Loading...</p>
			</>
		);
	}

	if (!weather && !isPending) {
		return <Navigate to="/" replace />;
	}

	// TODO: Zrobić w środku podział na komponenty
	return (
		<>
			<SecondaryButton
				onClick={() => navigate("/")}
				className="absolute top-2 left-5 w-16"
			>
				<img src="/arrow-back.svg" alt="Go Back" className="h-5 w-5" />
			</SecondaryButton>
			<SecondaryButton
				onClick={async () => {
					if (!showMark) {
						await copyWeather(weather.location.name, weather.location.country);
						setShowMark(true);
						setTimeout(() => setShowMark(false), 2000);
					}
				}}
				className="absolute top-2 right-5 w-16"
			>
				<Copy mark={showMark} />
			</SecondaryButton>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.2 }}
				className="flex flex-col sm:gap-2 justify-center items-center w-full"
				key={weather?.location.name}
			>
				<div className="flex flex-col items-center gap-6 mb-4 text-center">
					<Current
						temperature={temperature}
						weather={weather.current}
						location={{
							name: weather.location.name,
							country: weather.location.country,
						}}
					/>
					<SecondaryButton onClick={temperatureHandler} className="w-32">
						Switch
					</SecondaryButton>
				</div>

				<div className="grid grid-cols-2 gap-4 w-full">
					<CurrentCard weather={weather.current} temperature={temperature} />
				</div>
			</motion.div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.2 }}
				className="flex flex-col gap-6 justify-center items-center max-w-115 w-full"
			>
				<h2 className="text-lg font-bold">3-Day Forecast</h2>
				<Forecast forecast={weather?.forecast} temperatureUnit={temperature} />
			</motion.div>
		</>
	);
};

export default Weather;
