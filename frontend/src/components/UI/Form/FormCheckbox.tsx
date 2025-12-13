import { motion } from "framer-motion";
import { forwardRef, useState } from "react";
import type { FormCheckboxProps } from "@/types/form.ts";

const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
	({ children, name }, ref) => {
		const [checked, setChecked] = useState<boolean>(false);

		return (
			<div className="relative flex items-center gap-1">
				<motion.input
					name={name}
					ref={ref}
					type="checkbox"
					checked={checked}
					onChange={(e) => setChecked(e.target.checked)}
					aria-label="Forecast for 3 days"
					className="h-4 w-4 border-2 border-blue-400 appearance-none outline-none rounded text-[#333333] bg-white cursor-pointer font-bold text-xs"
				></motion.input>
				<label id={name} htmlFor={name} className="px-1 text-sm font-semibold">
					{children}
				</label>
			</div>
		);
	},
);

export default FormCheckbox;
