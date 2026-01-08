import axios from "axios";
import type { WeatherFormData } from "@/components/Home/Form.tsx";

export const fetchWeather = async (data: WeatherFormData) => {
	try {
		const response = await axios.post("/api/weather/weather", data);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
	}
};
