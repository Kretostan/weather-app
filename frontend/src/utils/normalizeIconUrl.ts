export const normalizeIconUrl = (icon: string) =>
	icon.startsWith("//") ? `https:${icon}` : icon;
