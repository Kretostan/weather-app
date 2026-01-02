import { motion } from "framer-motion";
import { forwardRef, useState } from "react";
import type { FormInputProps } from "@/types/form.ts";

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	({ children, name, onChange }, ref) => {
		const [isFocused, setIsFocused] = useState<boolean>(false);

		const capitalize = (str: string) =>
			str.charAt(0).toUpperCase() + str.slice(1);
		const capital = capitalize(name);

		return (
			<div className="flex flex-col gap-1.75 w-full">
				<label htmlFor={name} className="px-0.5 text-sm font-semibold">
					{children}
				</label>
				<motion.input
					name={name}
					ref={ref}
					type="text"
					placeholder={`Enter ${name} name`}
					aria-label={`${capital} input`}
					className="px-4 py-3 border-2 border-border-primary outline-none rounded-lg text-text-primary"
					initial={{ borderColor: "var(--border-primary)" }}
					whileHover={{
						borderColor: isFocused
							? "var(--border-focus)"
							: "var(--border-hover)",
					}}
					whileFocus={{ borderColor: "var(--border-focus)" }}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					onChange={onChange}
				/>
			</div>
		);
	},
);

export default FormInput;
