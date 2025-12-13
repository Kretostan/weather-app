import type { ReactNode, Ref } from "react";
import type { Temperature } from "@/types/weather.ts";

export interface FormFieldBaseProps {
	children: ReactNode;
	name: string;
}

export interface FormInputProps extends FormFieldBaseProps {
	type?: string;
}

export interface FormSelectProps extends FormFieldBaseProps {
	ref: Ref<HTMLInputElement>;
	value: Temperature;
	onChange: (value: Temperature) => void;
}

export interface FormCheckboxProps extends FormFieldBaseProps {}
