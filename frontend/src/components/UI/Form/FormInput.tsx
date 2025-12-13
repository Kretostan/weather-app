import { motion } from "framer-motion";
import { forwardRef } from "react";
import type { FormInputProps } from "@/types/form.ts";

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	({ children, name, type = "text" }, ref) => {
		const capitalize = (str: string) =>
			str.charAt(0).toUpperCase() + str.slice(1);
		const capital = capitalize(name);

		return (
			<div className="flex flex-col gap-1.75">
				<label htmlFor={name} className="px-0.5 text-sm font-semibold">
					{children}
				</label>
				<motion.input
					name={name}
					ref={ref}
					type={type}
					placeholder={`Enter ${name} name`}
					aria-label={`${capital} input`}
					className="px-4 py-3 border-2 border-[#9ec2e6] outline-none rounded-lg text-white shadow-input"
					whileHover={{ borderColor: "#0078d4" }}
					whileFocus={{ borderColor: "#0078d4" }}
					required
				/>
			</div>
		);
	},
);

export default FormInput;
