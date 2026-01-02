import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useLocation } from "react-router";

const Content = ({ children }: { children: ReactNode }) => {
	const location = useLocation();
	const style =
		location.pathname !== "/not-found"
			? "from-surface-primary-from to-surface-primary-to border-border-primary"
			: "from-error-surface-from to-error-surface-to border-error-border";

	return (
		<motion.div
			initial={{ y: 40, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.35 }}
			className={`flex flex-col items-center gap-8 sm:gap-10 sm:mx-1 px-4 sm:px-10 py-8 sm:py-12 w-full max-w-115 rounded-3xl bg-linear-to-b backdrop-blur-xl border ${style} `}
		>
			{children}
		</motion.div>
	);
};

export default Content;
