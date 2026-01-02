import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SecondaryButtonProps {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
}

const SecondaryButton = ({
	children,
	className,
	onClick,
}: SecondaryButtonProps) => {
	return (
		<motion.button
			type="submit"
			className={`flex justify-center items-center mt-4 py-2.5 bg-surface-secondary rounded-lg outline-none cursor-pointer uppercase font-semibold border-2 border-border-primary ${className}`}
			initial={{
				backgroundColor: "var(--surface-secondary)",
				boxShadow: "none",
				color: "var(--text-secondary)",
			}}
			whileHover={{
				backgroundColor: "var(--surface-secondary-hover)",
				boxShadow: "0 0 10px 5px var(--border-hover)",
				borderColor: "var(--border-hover)",
				color: " var(--text-primary)",
			}}
			whileFocus={{
				borderColor: "var(--border-focus)",
			}}
			transition={{ duration: 0.2, type: "tween" }}
			onClick={onClick}
		>
			{children}
		</motion.button>
	);
};

export default SecondaryButton;
