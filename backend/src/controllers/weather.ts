import axios from "axios";
import type { Request, Response } from "express";

const API_KEY = process.env.WEATHER_API_KEY;

interface WeatherRequest {
	city?: string;
	country?: string;
	threeDaysForecast?: boolean;
}

interface WeatherResponse {
	city?: string;
	country?: string;
	temperature?: {
		celsius?: number;
		fahrenheit?: number;
		kelvin?: number;
	};
	weather?: string;
	icon?: string;
	error?: string;
}

export const fetchCurrentWeather = async (
	req: Request<unknown, unknown, WeatherRequest>,
	res: Response<WeatherResponse>,
) => {
	const { city, country } = req.body;
	const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city},${country}`;
	try {
		const response = await axios.get(url);
		const data = response.data;
		return res.json({
			city: data.location.name,
			country: data.location.country,
			temperature: {
				celsius: Math.round(data.current.temp_c),
				fahrenheit: Math.round(data.current.temp_f),
				kelvin: Math.round(data.current.temp_c + 273.15),
			},
			weather: data.current.condition.text,
			icon: data.current.condition.icon.split("//")[1],
		});
	} catch (_error) {
		// TODO: Error handling
		return res.status(500).json({
			error: "An error occurred while fetching weather data",
		});
	}
};

export const fetchThreeDaysForecast = async (
	req: Request<unknown, unknown, WeatherRequest>,
	res: Response<WeatherResponse>,
) => {
	const { city, country, threeDaysForecast } = req.body;
	console.log(req.body);
	const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city},${country}&days=3`;
	try {
		if (!threeDaysForecast) {
			return res
				.status(400)
				.json({ error: "Three day forecast not requested" });
		}
		const response = await axios.get(forecastUrl);
		const data = response.data;
		return res.json(data);
	} catch (_error) {
		// TODO: Error handling
		return res.status(500).json({
			error: "An error occurred while fetching weather data",
		});
	}
};
