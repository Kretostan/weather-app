import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import type { Temperature, WeatherDayData } from "@/types/weather.ts";

interface ForecastProps {
	forecast: WeatherDayData[] | undefined;
	temperatureUnit: Temperature;
}

const Forecast = ({ forecast, temperatureUnit }: ForecastProps) => {
	const [showDetails, setShowDetails] = useState<string | null>(null);
	const [listHeight, setListHeight] = useState<string | null>(null);
	const hourRef = useRef<HTMLLIElement>(null);

	useLayoutEffect(() => {
		if (!showDetails) return;

		if (hourRef.current) {
			const height = hourRef.current.getBoundingClientRect().height;
			const listHeight = height * 4 + 12 * 3;
			setListHeight(listHeight.toString());
		}
	}, [showDetails]);

	const getDay = (day: WeatherDayData) => {
		const currentDay = new Date(day.date);
		return {
			date: currentDay.toLocaleString("en-US", {
				month: "short",
				day: "numeric",
				weekday: "long",
			}),
			avg: {
				celsius: day.day.avgtemp_c,
				fahrenheit: day.day.avgtemp_f,
			},
			show: showDetails === day.date,
			tempUnit: temperatureUnit === "celsius" ? "°C" : "F",
		};
	};

	return (
		<ul className="flex flex-col gap-3 w-full">
			{forecast?.map((day) => {
				const currentDay = getDay(day);

				return (
					<li
						key={day.date}
						className="bg-surface-secondary rounded-xl overflow-hidden"
					>
						<motion.button
							type="button"
							initial={{ borderColor: "var(--border-primary)" }}
							whileHover={{ borderColor: "var(--border-hover)" }}
							whileFocus={{ borderColor: "var(--border-focus)" }}
							onClick={() => setShowDetails(currentDay.show ? null : day.date)}
							className="flex justify-between items-center gap-4 px-4 py-3 border-3 w-full cursor-pointer font-semibold outline-none rounded-xl"
						>
							<p className="text-xs sm:text-base">{currentDay.date}</p>
							<div className="flex items-center gap-4">
								<img
									src={day.day.condition.icon}
									alt={day.day.condition.text}
									className="h-10 w-10 sm:h-14 sm:w-14"
								/>
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.8 }}
									className="font-bold sm:text-lg"
								>
									{currentDay.avg[temperatureUnit]}
									{currentDay.tempUnit}
								</motion.p>
								<motion.img
									initial={{ rotate: currentDay.show ? 0 : 180 }}
									animate={{ rotate: currentDay.show ? 0 : 180 }}
									transition={{ type: "tween" }}
									src="/arrow-show.svg"
									alt={currentDay.show ? "Hide" : "Show"}
									className="h-5 w-5 sm:h-7 sm:w-7"
								/>
							</div>
						</motion.button>
						<AnimatePresence>
							{currentDay.show && (
								<motion.div
									layout
									initial={{
										height: 0,
										opacity: 0,
									}}
									animate={{
										height: listHeight ? Number(listHeight) : 0,
										opacity: 1,
									}}
									exit={{
										height: 0,
										opacity: 0,
									}}
									transition={{ layout: { type: "tween", duration: 0.3 } }}
									className="flex flex-col gap-3 mx-2 my-3 px-2 overflow-hidden"
								>
									{/* TODO: Margines powoduje przeskok czy chowaniu listy */}
									<motion.ul className="flex flex-col gap-3 h-full overflow-y-auto outline-none">
										{day.hour.map((hour, i) => {
											const values = {
												temp: {
													celsius: hour.temp_c,
													fahrenheit: hour.temp_f,
												},
												feels: {
													celsius: hour.feelslike_c,
													fahrenheit: hour.feelslike_f,
												},
											};

											const condition = hour.condition.text.split(" ");

											return (
												<li
													ref={currentDay.show && i === 0 ? hourRef : null}
													key={hour.time}
													className="flex justify-between items-center pl-4 pr-2 py-1 text-xs border-2 bg-surface-tertiary rounded-lg border-border-primary"
												>
													<div className="flex items-center sm:gap-1">
														<p className="text-xs sm:text-md">
															{hour.time.split(" ")[1]}
														</p>
														<img
															src={hour.condition.icon}
															alt={hour.condition.text}
															className="h-8 w-8"
														/>
													</div>
													<p className="flex flex-col text-center text-xs">
														{condition[0]}
														{condition[1] && <span>{condition[1]}</span>}
													</p>
													<div className="flex items-center gap-1 sm:gap-4">
														<motion.div
															key={`${i.toString()} ${values.temp[temperatureUnit]}`}
															initial={{ opacity: 0 }}
															animate={{ opacity: 1 }}
															transition={{ duration: 0.8 }}
															className="text-center"
														>
															<p className="font-bold">
																{values.temp[temperatureUnit]}
																{temperatureUnit === "celsius" ? "°C" : "F"}
															</p>
															<p className="text-xs">
																({values.feels[temperatureUnit]}
																{temperatureUnit === "celsius" ? "°C" : "F"})
															</p>
														</motion.div>
														<p className="flex flex-col items-center justify-center gap-1 min-w-8 text-text-accent text-xs">
															<span>💧</span>
															{hour.chance_of_rain}%
														</p>
													</div>
												</li>
											);
										})}
									</motion.ul>
								</motion.div>
							)}
						</AnimatePresence>
					</li>
				);
			})}
		</ul>
	);
};

export default Forecast;
