import React, { SetStateAction} from "react";
import Button from "./UI/Button";

interface WeatherMenuProps {
    location: string;
    setLocation: (location: string) => void;
    setTemperature: React.Dispatch<SetStateAction<"fahrenheit" | "celsius">>;
}

const WeatherMenu = ({ location, setLocation, setTemperature }: WeatherMenuProps) => {
    return <div className="flex flex-col justify-center gap-6">
        <div className="flex flex-col">
            <label className="px-1 text-sm">Location:</label>
            {/* TODO: Zrobić walidacje. Jeśli jest puste bądź nie ma takiego miasta*/}
            <input
                type="text"
                placeholder="Enter location"
                aria-label="Location input"
                className="px-1 py-1 border-2 border-[#9ec2e6] outline-none rounded text-[#333333] focus:border-[#0078d4]"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                required
            />
        </div>
        <div className="flex justify-center items-center gap-6">
            {/* TODO: Jeśli location jest puste dać właściwość disabled submit buttonie */}
            <Button type="submit" onClick={() => setLocation(location)}>Submit</Button>
            <Button onClick={() => setTemperature((prevState) => prevState === "celsius" ? "fahrenheit" : "celsius")}>Switch</Button>
        </div>
    </div>
}

export default WeatherMenu;