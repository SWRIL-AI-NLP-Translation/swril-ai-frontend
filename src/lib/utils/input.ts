import { error } from "@sveltejs/kit";

const getInputElement = (query: string): HTMLInputElement => {
	const inputElement: HTMLInputElement|null = document.querySelector(query);
	if (!inputElement) {
		const msg = `Invalid input element ${query}`
		console.error(msg)
		throw error(400, msg)
	}
	return inputElement
}

export const getInputText = (query: string): string => {
	return getInputElement(query).value
}

export const setInputText = (query: string, value: string) => {
	getInputElement(query).value = value
}