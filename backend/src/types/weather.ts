export interface WeatherRequest {
	city: string;
	country?: string;
}

export interface WeatherSuccessResponse {
	location: object;
	current: object;
	forecast: object;
}

interface WeatherErrorResponse {
	error: string;
}

export type WeatherResponse = WeatherSuccessResponse | WeatherErrorResponse;
