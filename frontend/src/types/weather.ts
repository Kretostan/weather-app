export interface WeatherSuccessResponse {
	location: {
		name: string;
		country: string;
	};
	current: WeatherCurrentData;
	forecast: WeatherDayData[];
}

export interface WeatherCurrentData {
	temp_c: number;
	temp_f: number;
	condition: {
		weather: string;
		icon: string;
	};
	wind_mph: number;
	wind_kph: number;
	pressure_mb: number;
	humidity: number;
	feelslike_c: number;
	feelslike_f: number;
}

export interface WeatherDayData {
	date: string;
	day: {
		avgtemp_c: number;
		avgtemp_f: number;
		condition: {
			text: string;
			icon: string;
		};
	};
	hour: WeatherHourData[];
}

export interface WeatherHourData {
	time: string;
	temp_c: number;
	temp_f: number;
	condition: {
		text: string;
		icon: string;
	};
	feelslike_c: number;
	feelslike_f: number;
	chance_of_rain: number;
}

export type Temperature = "celsius" | "fahrenheit";
