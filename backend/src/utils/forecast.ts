import "dotenv/config.js";
import axios from "axios";

const API_KEY = process.env.WEATHER_API_KEY;

export const getCurrentWeather = async (location: string = "Warszawa") => {
    const url: string = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        const weatherIcon = data.current.condition.icon.split("//")

        return {
            city: data.location.name,
            country: data.location.country,
            celsius: Math.round(data.current.temp_c),
            fahrenheit: Math.round(data.current.temp_f),
            weather: data.current.condition.text,
            icon: weatherIcon[1]
        }
    } catch (error) {
        console.error("Error: ", error);
        return { message: "Failed to download weather data." };
    }
}

// current.condition.text - Clear (icon based on that)
