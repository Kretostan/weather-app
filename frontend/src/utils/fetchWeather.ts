import axios from "axios";

export const fetchWeather = async (location: string) => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_API_URL}/weather`,
			{ location },
		);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
	}
};
