import { motion } from "framer-motion";
import type { Temperature, WeatherCurrentData } from "@/types/weather.ts";

interface CurrentCardProps {
	weather: WeatherCurrentData;
	temperature: Temperature;
}

const CurrentCard = ({ weather, temperature }: CurrentCardProps) => {
	const values = {
		feels: {
			celsius: weather.feelslike_c,
			fahrenheit: weather.feelslike_f,
		},
		current: {
			celsius: weather.temp_c,
			fahrenheit: weather.temp_f,
		},
		wind: temperature === "celsius" ? weather.wind_kph : weather.wind_mph,
	};

	return (
		<>
			<p className="flex flex-col justify-center items-center gap-1 py-2 border border-border-primary bg-surface-secondary rounded-lg">
				<span className="text-xs">Humidity</span>
				<span className="text-lg font-semibold">{weather.humidity}%</span>
			</p>
			<p className="flex flex-col justify-center items-center gap-1 py-2 border border-border-primary bg-surface-secondary rounded-lg">
				<span className="text-xs">Wind</span>
				<motion.span
					key={temperature}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					className="text-lg font-semibold"
				>
					{values.wind}
					{values.wind === weather.wind_kph ? " km/h" : " mph"}
				</motion.span>
			</p>
			<p className="flex flex-col justify-center items-center gap-1 py-2 border border-border-primary bg-surface-secondary rounded-lg">
				<span className="text-xs">Pressure</span>
				<span className="text-lg font-semibold">{weather.pressure_mb} hPa</span>
			</p>
			<p className="flex flex-col justify-center items-center gap-1 py-2 border border-border-primary bg-surface-secondary rounded-lg">
				<span className="text-xs">Feels Like</span>
				<motion.span
					key={temperature}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					className="text-lg font-semibold"
				>
					{Math.round(values.feels[temperature])}
					{temperature === "celsius" ? "°C" : "°F"}
				</motion.span>
			</p>
		</>
	);
};

export default CurrentCard;
