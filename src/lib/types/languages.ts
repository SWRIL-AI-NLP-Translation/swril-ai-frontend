export const languages = [
	"Afrikaans", "Amharic", "Arabic", "Armenian", "Chinese", "Croatian", "Dutch", "English", "Filipino", "French", "German", "Gujarati", "Hindi", "Italian", "Japanese", "Korean", "Persian", "Polish", "Portuguese", "Punjabi", "Romanian", "Russian", "Serbian", "Spanish", "Thai", "Turkish", "Urdu"
] as const;

export type LanguageType = typeof languages[number];
