import { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";

type WeatherData = {
    city: string;
    country: string;
    celsius: number;
    fahrenheit: number;
    weather: string;
    icon: string;
}

function Home() {
    // TODO: Add routes and error page
    // TODO: Responsive design
    // TODO: Do components
    // TODO: Add loading state
    // TODO: Ogarnąć błędy, które mogą się pojawić
    // TODO: Weather based on current location
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [temperature, setTemperature] = useState<"celsius" | "fahrenheit">("celsius");
    const [fetched, isFetched] = useState<boolean>(false);
    const ref = useRef<HTMLInputElement>(null);

    const fetchWeather = async (location: string) => {
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + "/weather", { location });
            const data = response.data;
            setWeatherData(data);
            isFetched(false);
        } catch (error: any) {
            isFetched(true);
            console.error("Error:", error.response.data.error);
        }
    };

    return <>
        <div className="flex items-center">
            <div className="hidden md:flex h-[90px]">
                <img src="/logo.webp" alt="Sun behind cloud"  className="h-full logo-shadow" />
            </div>
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="text-4xl sm:text-5xl text-white font-header h1-shadow text-center">
                Weather App
            </motion.h1>
        </div>
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-8 sm:gap-16 px-6 sm:px-10 py-8 sm:py-12 h-[500px] sm:h-[600px] max-w-[475px] bg-background-primary font-body sm:rounded-xl text-[#4A6B8C] shadow-main"
        >
            <div className="flex flex-col gap-10 text-center">
                <h2 className="text-2xl sm:text-3xl h2-shadow">Welcome! <span className="hidden sm:visible">in Weather Application</span></h2>
                <p className="px-10 max-w-[350px]">Start by typing a city name. We'll help you check the weather and plan your day!</p>
            </div>
            <div className="flex flex-col gap-10">
                <form className="flex flex-col justify-center sm:gap-4" onSubmit={async (e) => {
                    e.preventDefault();
                    if (ref.current && ref.current.value.trim() !== "") {
                        const inputElement = ref.current;
                        const location = inputElement.value;
                        await fetchWeather(location);
                        inputElement.value = "";
                    }
                }}>
                    <div className="flex flex-col">
                        <label className="px-1 text-sm">Location:</label>
                        <motion.input
                            ref={ref}
                            type="text"
                            placeholder="Enter location"
                            aria-label="Location input"
                            className="px-2 py-1 border-2 border-[#9ec2e6] outline-none rounded text-[#333333] bg-white shadow-input"
                            whileHover={{ borderColor: "#0078d4" }}
                            whileFocus={{ borderColor: "#0078d4" }}
                            required
                        />
                        <p className={`px-2 text-sm text-[#FF6F61] ${!fetched ? "invisible" : "visible" }`}>Please enter a valid location!</p>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                        <motion.button
                            type="submit"
                            className="px-3 py-1 bg-[#0078d4] text-white rounded-md cursor-pointer"
                            whileHover={{ backgroundColor: "#3293dc", scale: 1.05 }}
                        >
                            Submit
                        </motion.button>
                        <motion.button
                            type="button"
                            onClick={() => {
                                isFetched(false);
                                setTemperature((prev) => prev === "celsius" ? "fahrenheit" : "celsius");
                            }}
                            className={`px-3 py-1 bg-[#0078d4] text-white rounded-md ${weatherData ? "cursor-pointer" : "cursor-not-allowed"}`}
                            whileHover={{ backgroundColor: "#3293dc", scale: weatherData !== null ? 1.05 : 1 }}
                            disabled={!weatherData}
                        >
                            Switch
                        </motion.button>
                    </div>
                </form>
                {weatherData && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col sm:gap-2 justify-center items-center h-[120px]"
                        key={weatherData.city}
                    >
                        <div className="flex flex-col items-center px-2">
                            <p>{weatherData.city},</p>
                            <p>{weatherData.country}</p>
                        </div>
                        <motion.div className="flex justify-center items-center gap-2 text-xl">
                            <img src={`https://${weatherData.icon}`} alt={weatherData.weather} />
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                key={temperature}
                            >
                                {weatherData[temperature]}{temperature === "celsius" ? "°C" : "°F"}
                            </motion.p>
                        </motion.div>
                    </motion.div>)}
            </div>
        </motion.div>
    </>
}

export default Home;
