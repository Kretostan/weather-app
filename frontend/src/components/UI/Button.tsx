import { motion } from "framer-motion";

const Button = () => {
	return (
		<div className="flex justify-center w-full">
			<motion.button
				type="submit"
				className="mt-4 py-2.5 w-1/2 bg-[#0078d4] text-white rounded-lg shadow-none cursor-pointer uppercase font-semibold"
				initial={{
					backgroundColor: "#0078d4",
					scale: 1,
					boxShadow: "none",
				}}
				whileHover={{
					backgroundColor: "#3293dc",
					scale: 1.05,
					boxShadow: "0 0 10px 5px rgba(0,120,212,0.4)",
				}}
				transition={{ duration: 0.2, type: "tween" }}
			>
				Submit
			</motion.button>
		</div>
	);
};

export default Button;
