import React, {useState} from 'react';

import {Weather} from "./types/weather";
import WeatherIntro from "./components/WeatherIntro";
import WeatherMenu from "./components/WeatherMenu";
import WeatherResult from "./components/WeatherResult";

import './App.css';

function App() {
    // TODO: Zoptymalizować te useState (jakiś Context może)
    const [location, setLocation] = useState<string>("Warsaw");
    const [weather, setWeather] = useState<Weather | null>(null)
    const [temperature, setTemperature] = useState<"celsius" | "fahrenheit">("celsius")

    return (
        // TODO: Animacje
        <div className="flex flex-1 flex-col items-center gap-16 py-16 h-screen bg-[url(background.png)]">
            <h1 className="text-5xl text-white font-header">Weather App</h1>
            <div className="flex flex-col justify-between items-center px-10 py-12 h-[550px] bg-[#c7e0f5] font-body rounded-lg text-[#212121]">
                <WeatherIntro />
                <WeatherMenu
                    location={location}
                    setLocation={setLocation}
                    setTemperature={setTemperature} />
                <WeatherResult
                    weather={weather}
                    temperature={temperature}
                    location={location}
                    setWeather={setWeather}
                />
            </div>
        </div>
    );
}

export default App;
