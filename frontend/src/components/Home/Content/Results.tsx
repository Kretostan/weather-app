import { motion } from "framer-motion";
import { useState } from "react";
import type { Temperature, Weather } from "@/types/weather.ts";

const Results = () => {
	const [weatherData, _setWeatherData] = useState<Weather | null>(null);
	const [temperature, _setTemperature] = useState<Temperature | null>(null);
	const [isLoading, _setIsLoading] = useState<boolean>(false);

	if (isLoading) return <div>Loading...</div>;

	return (
		weatherData &&
		!isLoading && (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.2 }}
				className="flex flex-col sm:gap-2 justify-center items-center h-[120px]"
				key={weatherData.city}
			>
				<div className="flex flex-col items-center px-2">
					<p>{weatherData.city},</p>
					<p>{weatherData.country}</p>
				</div>
				<motion.div className="flex justify-center items-center gap-2 text-xl">
					<img src={`https://${weatherData.icon}`} alt={weatherData.weather} />
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8 }}
						key={temperature}
					>
						{weatherData[temperature]}
						{temperature === "celsius" ? "°C" : "F"}
					</motion.p>
				</motion.div>
			</motion.div>
		)
	);
};

export default Results;
