export const maskEmail = (email: string) => {
	if (!email.includes("@")) return email;

	const [localPart, domain] = email.split("@");
	if (!localPart || localPart.length <= 2) return email;

	if (localPart.length <= 2) return email;

	const maskedLocal = `${localPart[0]}***${localPart[localPart.length - 1]}`;
	return `${maskedLocal}@${domain}`;
};
