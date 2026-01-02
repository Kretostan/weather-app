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
	initial: {
		backgroundColor: "var(--error)",
	},
	hover: {
		backgroundColor: "var(--error-hover)",
	},
	focus: {
		boxShadow: "0 0 0 3px var(--error-strong)",
	},
};

const Button = ({ children, onClick }: PrimaryButtonProps) => {
	return (
		<motion.button
			type="button"
			className="flex justify-center items-center px-10 py-2.5 rounded-lg uppercase outline-none font-semibold text-text-primary cursor-pointer"
			variants={variants}
			initial="initial"
			animate="initial"
			whileHover="hover"
			whileFocus="focus"
			transition={{ duration: 0.2, type: "tween" }}
			onClick={onClick}
		>
			{children}
		</motion.button>
	);
};

export default Button;
