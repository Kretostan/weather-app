import React, {useEffect} from "react";
import axios from "axios";

import {Weather} from "../types/weather";

interface WeatherResultProps {
    weather: Weather | null;
    temperature: "celsius" | "fahrenheit";
    location: string;
    setWeather: (weather: Weather | null) => void;
}

const WeatherResult = ({ weather, temperature, location, setWeather }: WeatherResultProps) => {
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post("/get-weather", { location });
                setWeather(response.data.weather);
            } catch (error) {
                console.error("Error: ", error);
            }
        })();
    }, [location, setWeather]);

    return <div className="flex flex-col gap-2 justify-center items-center h-[120px]">
        {weather ? <>
            <p className="px-2">{weather.city}, {weather.country}:</p>
            <div className="flex justify-center items-center">
                {/* TODO: Jeśli link weather.icon odpowiada np. chmurze to dajemy własny link do chmurki */}
                {/* https://www.weatherapi.com/docs/conditions.json */}
                <img src={`https://${weather.icon}`} alt={weather.weather} />
                <p>{weather[temperature]}{temperature === "celsius" ? "°C" : "°F"}</p>
            </div>
        </> : "Loading..."}
    </div>
}

export default WeatherResult;
