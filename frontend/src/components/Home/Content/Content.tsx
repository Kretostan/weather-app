import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Form from "@/components/UI/Form/Form.tsx";
import Header from "./Header.tsx";
import Results from "./Results.tsx";

const Content = ({ children }: { children: ReactNode }) => {
	return (
		<motion.div
			initial={{ y: 40, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.35 }}
			className="flex flex-col items-center gap-8 sm:gap-10 px-8 sm:px-10 py-8 sm:py-12 max-w-[450px] bg-[rgba(10,15,25,0.35)] backdrop-blur-xl rounded-3xl text-white border-3 border-[rgba(0,150,255,0.30)]"
		>
			{children}
		</motion.div>
	);
};

Content.Header = Header;
Content.Form = Form;
Content.Results = Results;

export default Content;
