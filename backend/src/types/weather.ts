export interface WeatherRequest {
	city: string;
	country?: string;
}

export interface WeatherSuccessResponse {
	location: object;
	current: {
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
	};
	forecast: object;
}

interface WeatherErrorResponse {
	error: string;
}

export type WeatherResponse = WeatherSuccessResponse | WeatherErrorResponse;
