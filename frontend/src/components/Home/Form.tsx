import { type FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router";
import PrimaryButton from "../UI/PrimaryButton.tsx";
import FormInput from "./FormInput.tsx";
import Tip from "./Tip.tsx";

export interface WeatherFormData {
	city?: string;
	country?: string;
}

const Form = () => {
	const [isValid, setIsValid] = useState<boolean>(false);
	const cityRef = useRef<HTMLInputElement>(null);
	const countryRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	const handleCityChange = () => {
		setIsValid(cityRef?.current?.value.trim() !== "");
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!isValid) return;

		const form = event.currentTarget;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData) as WeatherFormData;
		navigate(
			`/weather?city=${data.city}${(data.country && `&country=${data.country}`) || ""}`,
		);
	};

	return (
		<form
			className="flex flex-col justify-center items-center gap-12 "
			onSubmit={handleSubmit}
		>
			<div className="flex flex-col gap-6 w-full">
				<FormInput ref={cityRef} name="city" onChange={handleCityChange}>
					City:
				</FormInput>
				<FormInput ref={countryRef} name="country">
					Country (Optional):
				</FormInput>
				<Tip />
			</div>
			<PrimaryButton type="submit" disabled={!isValid}>
				Submit
			</PrimaryButton>
		</form>
	);
};

export default Form;
