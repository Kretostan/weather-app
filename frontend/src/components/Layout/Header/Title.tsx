import { motion } from "framer-motion";
import type { ReactNode } from "react";

const Title = ({ children }: { children: ReactNode }) => {
	return (
		<motion.h1
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.35 }}
			className="text-4xl sm:text-5xl text-text-primary font-header h1-shadow text-center"
		>
			{children}
		</motion.h1>
	);
};

export default Title;
