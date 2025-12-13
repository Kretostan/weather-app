import { type FormEvent, useRef, useState } from "react";
import type { Temperature } from "@/types/weather.ts";
import { fetchWeather } from "@/utils/fetchWeather.ts";
import Tip from "../../Home/Content/Tip.tsx";
import Button from "../Button.tsx";
import FormCheckbox from "./FormCheckbox.tsx";
import FormInput from "./FormInput.tsx";
import FormSelect from "./FormSelect.tsx";

const Form = () => {
	const [temperature, setTemperature] = useState<Temperature>("celsius");
	const cityRef = useRef<HTMLInputElement>(null);
	const countryRef = useRef<HTMLInputElement>(null);
	const forecastRef = useRef<HTMLInputElement>(null);
	const temperatureRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData);
		console.log(data);
		if (cityRef.current && cityRef.current.value.trim() !== "") {
			const inputElement = cityRef.current;
			const location = inputElement.value;
			await fetchWeather(location);
			setTemperature("celsius");
			form.reset();
		}
	};

	return (
		<form
			className="flex flex-col justify-center gap-6 w-full"
			onSubmit={handleSubmit}
		>
			<FormInput ref={cityRef} name="city">
				City:
			</FormInput>
			<FormInput ref={countryRef} name="country">
				Country (Optional):
			</FormInput>
			<FormSelect
				ref={temperatureRef}
				name="temperature"
				value={temperature}
				onChange={setTemperature}
			>
				Temperature Units:
			</FormSelect>
			<FormCheckbox ref={forecastRef} name="threeDayForecast">
				Include 3-day forecast
			</FormCheckbox>
			<Button />
			<Tip />
		</form>
	);
};

export default Form;
