import axios from "axios";
import type { Request, Response } from "express";

export const getWeather = async (req: Request, res: Response) => {
	const location = req.body.location;
	const API_KEY = process.env.WEATHER_API_KEY;
	const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;
	try {
		const response = await axios.get(url);
		const data = response.data;
		return res.json({
			city: data.location.name,
			country: data.location.country,
			celsius: Math.round(data.current.temp_c),
			fahrenheit: Math.round(data.current.temp_f),
			weather: data.current.condition.text,
			icon: data.current.condition.icon.split("//")[1],
		});
	} catch (error) {
		// TODO: Make error handler
		// const error = new Error("Brak danych.");
		// error.code = 400; // Możesz dodać niestandardowe właściwości
		// return error;
		// if (error.status === 400) {
		//     return res.status(422).json({
		//         error: "Weather data not found for the specified location"
		//     });
		// }
		return res.status(500).json({
			error: "An error occurred while fetching weather data",
		});
	}
};
