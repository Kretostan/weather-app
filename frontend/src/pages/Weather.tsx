import { motion } from "framer-motion";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import SecondaryButton from "@/components/UI/SecondaryButton.tsx";
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
					await copyWeather(weather.city, weather.country);
					if (!showMark) {
						setShowMark(true);
						setTimeout(() => setShowMark(false), 2000);
					}
				}}
				className="absolute top-2 right-5 w-16"
			>
				{!showMark ? (
					<motion.img
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						src="/copy.svg"
						alt="Copy weather"
						className="h-5 w-5"
					/>
				) : (
					<motion.img
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						src="/check.svg"
						alt="Copied weather"
						className="h-5 w-5"
					/>
				)}
			</SecondaryButton>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.2 }}
				className="flex flex-col sm:gap-2 justify-center items-center w-full"
				key={weather?.city}
			>
				<div className="flex flex-col items-center gap-6 mb-4 text-center">
					<img
						src={weather?.current.condition.icon}
						alt={weather?.current.condition.weather}
					/>
					<div className="flex flex-col gap-1">
						<p className="text-text-primary text-2xl font-bold">
							{weather?.city}
						</p>
						<p className="text-xs">{weather?.country}</p>
					</div>
					<div className="flex flex-col gap-2">
						<motion.p
							key={temperature}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8 }}
							className="text-text-primary text-5xl font-bold"
						>
							{weather.current[temperature === "celsius" ? "temp_c" : "temp_f"]}
							{temperature === "celsius" ? "°C" : "F"}
						</motion.p>
						<p>{weather?.current.condition.weather}</p>
					</div>
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
