export interface Weather {
	city: string;
	country: string;
	celsius: number;
	fahrenheit: number;
	weather: string;
	icon: string;
}

export type Temperature = "celsius" | "fahrenheit" | "kelvin";
