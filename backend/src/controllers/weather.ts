import axios from "axios";
import type { Request, Response } from "express";
import type {
	WeatherDayData,
	WeatherHourData,
	WeatherRequest,
	WeatherResponse,
	WeatherSuccessResponse,
} from "../types";

const API_KEY = String(process.env.WEATHER_API_KEY);

const normalizeIconUrl = (icon: string) =>
	icon.startsWith("//") ? `https:${icon}` : icon;

// TODO: Zrobić oddzielnie current weather i forecast w celu optymalizacji zapytań

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
		// TODO: Ogarnąć, możliwe, że ze strony zwraca wystarczające informacje i nie muszę takiego dużego obiektu zwracać ręcznie tylko po prostu response.data
		const forecastData: WeatherSuccessResponse = {
			city: data.location.name,
			country: data.location.country,
			current: {
				temp_c: Math.round(data.current.temp_c),
				temp_f: Math.round(data.current.temp_f),
				condition: {
					weather: data.current.condition.text,
					icon: normalizeIconUrl(data.current.condition.icon),
				},
				wind_mph: data.current.wind_mph,
				wind_kph: data.current.wind_kph,
				pressure_mb: data.current.pressure_mb,
				humidity: data.current.humidity,
				feelslike_c: Math.round(data.current.feelslike_c),
				feelslike_f: Math.round(data.current.feelslike_f),
			},
			forecast: data.forecast.forecastday.map((day: WeatherDayData) => {
				return {
					date: day.date,
					day: {
						avgtemp_c: Math.round(day.day.avgtemp_c),
						avgtemp_f: Math.round(day.day.avgtemp_f),
						condition: {
							text: day.day.condition.text,
							icon: day.day.condition.icon,
						},
					},
					hour: day.hour.map((hourData: WeatherHourData) => {
						// TODO: Porównać hourData.time z aktualnym czasem, aby dodać tylko aktualną oraz przyszłe godziny dla dzisiejszej daty
						return {
							time: hourData.time,
							temp_c: Math.round(hourData.temp_c),
							temp_f: Math.round(hourData.temp_f),
							condition: {
								text: hourData.condition.text,
								icon: hourData.condition.icon,
							},
							feelslike_c: Math.round(hourData.feelslike_c),
							feelslike_f: Math.round(hourData.feelslike_f),
							chance_of_rain: hourData.chance_of_rain,
						};
					}),
				};
			}),
		};
		return res.json(forecastData);
	} catch (_error) {
		// TODO: Error handling
		return res.status(500).json({
			error: "An error occurred while fetching weather data",
		});
	}
};
