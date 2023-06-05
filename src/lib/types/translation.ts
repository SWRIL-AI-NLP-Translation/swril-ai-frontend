export type Translation = {
	from: {
		language: string;
		text: string;
	},
	to: {
		language: string;
		text: string;
	},
};

export type SavedTranslationType = {
	id: string;
	from_text: string;
	from_language: string;
	to_text: string;
	to_language: string;
}