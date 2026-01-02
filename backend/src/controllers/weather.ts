import axios from "axios";
import type { Request, Response } from "express";
import type { WeatherRequest, WeatherResponse } from "../types";

const API_KEY = String(process.env.WEATHER_API_KEY);

export const fetchWeather = async (
	req: Request<unknown, unknown, WeatherRequest>,
	res: Response<WeatherResponse>,
) => {
	const { city, country } = req.body;
	const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city},${country}&days=3`;
	try {
		if (!city) {
			return res
				.status(400)
				.json({ error: "Three day forecast not requested" });
		}
		const response = await axios.get(forecastUrl);
		const data = response.data;
		const weatherData = {
			location: data.location,
			current: data.current,
			forecast: data.forecast.forecastday,
		};
		return res.json(weatherData);
	} catch (error) {
		// TODO: Error handling
		console.error(error);
		return res.status(500).json({
			error: "An error occurred while fetching weather data",
		});
	}
};
