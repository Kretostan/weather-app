import { motion } from "framer-motion";
import type { Temperature, WeatherCurrentData } from "@/types/weather.ts";

interface CurrentProps {
	weather: WeatherCurrentData;
	temperature: Temperature;
	location: {
		name: string;
		country: string;
	};
}

const Current = ({ weather, temperature, location }: CurrentProps) => {
	return (
		<>
			<img src={weather.condition.icon} alt={weather.condition.weather} />
			<div className="flex flex-col gap-1">
				<p className="text-text-primary text-2xl font-bold">{location.name}</p>
				<p className="text-xs">{location.country}</p>
			</div>
			<div className="flex flex-col gap-2">
				<motion.p
					key={temperature}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					className="text-text-primary text-5xl font-bold"
				>
					{Math.round(weather[temperature === "celsius" ? "temp_c" : "temp_f"])}
					{temperature === "celsius" ? "°C" : "F"}
				</motion.p>
				<p>{weather.condition.weather}</p>
			</div>
		</>
	);
};

export default Current;
