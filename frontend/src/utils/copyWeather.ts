export const copyWeather = async (city: string, country: string) => {
	const url = `${window.location.origin}/weather?city=${city}&country=${country}`;
	try {
		await navigator.clipboard.writeText(url);
	} catch (error) {
		console.error("Failed to copy URL to clipboard: ", error);
	}
};
