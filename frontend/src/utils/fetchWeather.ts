import axios from "axios";
import type { WeatherFormData } from "@/components/Home/Content/Form.tsx";

export const fetchCurrentWeather = async (data: WeatherFormData) => {
	try {
		const response = await axios.post("/api/weather/current", data);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
	}
};
