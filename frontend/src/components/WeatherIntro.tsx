import React from "react";

const WeatherIntro = () => {
    return <div className="flex flex-col gap-10 text-center">
        <h2 className="text-3xl">Welcome! <span className="hidden sm:visible">in Weather Application</span></h2>
        <p>Type name of location below to check weather.</p>
    </div>
}

export default WeatherIntro;