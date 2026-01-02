import type { ReactNode } from "react";

export interface FormFieldBaseProps {
	children: ReactNode;
	name: string;
}

export interface FormInputProps extends FormFieldBaseProps {
	type?: string;
	required?: boolean;
	onChange?: () => void;
}
