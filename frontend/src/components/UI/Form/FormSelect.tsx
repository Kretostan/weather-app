import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { FormSelectProps } from "@/types/form.ts";
import type { Temperature } from "@/types/weather.ts";

type TemperatureUnit = { value: Temperature; label: string };

const TEMPERATURE_UNITS: readonly TemperatureUnit[] = [
	{ value: "celsius", label: "Celsius (°C)" },
	{ value: "fahrenheit", label: "Fahrenheit (°F)" },
	{ value: "kelvin", label: "Kelvin (K)" },
];

const optionVariants = {
	initial: (isActive: boolean) => ({
		color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
		backgroundColor: "rgba(15,25,40)",
	}),
	hover: {
		color: "#ffffff",
		backgroundColor: "rgba(50,147,220,0.5)",
	},
};

const FormSelect = ({
	children,
	name,
	ref,
	value: temperature,
	onChange: onTempChange,
}: FormSelectProps) => {
	const [open, setOpen] = useState(false);

	return (
		<div className="relative flex flex-col gap-1.75">
			<label htmlFor={name} className="px-0.5 text-sm font-semibold">
				{children}
			</label>
			<input type="hidden" ref={ref} name={name} value={temperature} />
			<motion.button
				name={name}
				type="button"
				initial={{ borderColor: open ? "#0078d4" : "#9ec2e6" }}
				animate={{ borderColor: open ? "#0078d4" : "#9ec2e6" }}
				whileHover={{ borderColor: "#0078d4" }}
				className={`px-4 py-3 border-2 border-[#9ec2e6] rounded-lg text-white shadow-input flex justify-between items-center`}
				onClick={() => setOpen((prevState) => !prevState)}
			>
				<span>
					{TEMPERATURE_UNITS.find((unit) => unit.value === temperature)?.label}
				</span>
				<motion.svg
					aria-hidden="true"
					className="ml-2 h-5 w-5 text-white"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					viewBox="0 0 24 24"
					animate={{ rotate: open ? 180 : 0 }}
					transition={{ duration: 0.2, type: "tween" }}
				>
					<path d="M6 9l6 6 6-6" />
				</motion.svg>
			</motion.button>

			<AnimatePresence>
				{open && (
					<motion.ul
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={`absolute top-[100%] mt-0.25 z-20 w-full bg-[rgba(15,25,40)] border-2 border-[#9ec2e6] rounded-lg shadow-input overflow-hidden`}
					>
						{TEMPERATURE_UNITS.map((unit) => {
							const isActive = unit.value === temperature;

							return (
								<li key={unit.value}>
									<motion.button
										custom={isActive}
										variants={optionVariants}
										initial="initial"
										whileHover="hover"
										type="button"
										className={`w-full text-left px-4 py-3 ${isActive ? "text-white" : "text-white/50"}`}
										onClick={() => {
											onTempChange(unit.value);
											setOpen(false);
										}}
									>
										{unit.label}
									</motion.button>
								</li>
							);
						})}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
};

export default FormSelect;
