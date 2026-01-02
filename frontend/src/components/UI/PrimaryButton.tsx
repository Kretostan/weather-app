import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PrimaryButtonProps {
	children: ReactNode;
	type?: string;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
}

const variants = {
	enabled: {
		color: "var(--text-primary)",
		backgroundColor: "var(--primary)",
		scale: 1,
		boxShadow: "none",
	},
	disabled: {
		color: "var(--text-disabled)",
		backgroundColor: "var(--primary-strong)",
		scale: 1,
		boxShadow: "none",
	},
	hover: {
		backgroundColor: "var(--primary-hover)",
		scale: 1.05,
		boxShadow: "0 0 5px 1px var(--primary-soft)",
	},
	focus: {
		boxShadow: "0 0 0 3px var(--glow-primary), 0 0 0 6px var(--glow-secondary)",
	},
};

const PrimaryButton = ({
	children,
	type = "button",
	onClick,
	disabled,
}: PrimaryButtonProps) => {
	const state = disabled ? "disabled" : "enabled";

	return (
		<motion.button
			type={type}
			className={`flex justify-center items-center px-10 py-2.5 rounded-lg uppercase outline-none font-semibold ${disabled ? "text-text-disabled cursor-not-allowed" : "text-text-primary cursor-pointer"}`}
			variants={variants}
			initial={state}
			animate={state}
			whileHover={disabled ? undefined : "hover"}
			whileFocus="focus"
			transition={{ duration: 0.2, type: "tween" }}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</motion.button>
	);
};

export default PrimaryButton;
