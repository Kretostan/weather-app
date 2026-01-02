import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import type { WeatherSuccessResponse } from "@/types/weather.ts";
import { fetchWeather } from "@/utils/fetchWeather.ts";

export const useForecast = () => {
	const [params] = useSearchParams();
	const city = params.get("city");
	const country = params.get("country");

	return useQuery<WeatherSuccessResponse>({
		queryKey: ["forecast", `${city}${country ? `-${country}` : ""}`],
		queryFn: () => fetchWeather({ city: city || "", country: country || "" }),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
};
