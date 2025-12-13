import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{html,js,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				header: ["Montserrat", "sans-serif"],
				body: ["Inter", "sans-serif"],
			},
			colors: {
				primary: "#3b82f6",
				secondary: "#0078d4",
				"background-primary": "#c7e0f5",
				"background-secondary": "#9ec2e6",
				"primary-text": "#4A6B8C",
				"input-text": "#333333",
			},
		},
	},
	plugins: [],
} satisfies Config;
