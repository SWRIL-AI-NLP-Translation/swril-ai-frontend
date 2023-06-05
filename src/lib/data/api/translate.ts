import { getInputText } from "$lib/utils/input";
import { error } from "@sveltejs/kit";
import { graphql } from "../graphql";
import { TRANSLATION } from "../graphql/queries/translate";
import { SAVE_TRANSLATION } from "../graphql/mutations/saveTranslation";
import type { SavedTranslationType } from "$lib/types/translation";

export const getTranslation = async (): Promise<{
	fromLanguage: string,
	toLanguage: string,
	translation: string	
}> => {
	const text = getInputText("#textInput");
	const fromLanguage = getInputText("#fromLanguageInput");
	const toLanguage = getInputText("#toLanguageInput");
	if (text.length === 0) {
		return {
			fromLanguage,
			toLanguage,
			translation: ''
		}
	}
	try {
		const res = await graphql.request(TRANSLATION, {
			data: {
				fromLanguage,
				toLanguage,
				text,
			},
		})
		const data = res.translation
		if (!data) {
			throw error(400, JSON.stringify(res.errors))
		} else {
			return {
				fromLanguage,
				toLanguage,
				translation: data.text
			}
		}
	} catch (e:any) {
		throw error(400, e)
	}
}

export const saveTranslation = async (translation: string): Promise<SavedTranslationType | undefined> => {
	if (translation.length === 0) return
	const text = getInputText("#textInput");
	const fromLanguage = getInputText("#fromLanguageInput");
	const toLanguage = getInputText("#toLanguageInput");
	if (text.length === 0) return
	try {
		const res = await graphql.request(SAVE_TRANSLATION, {
			data: {
				to_text: translation,
				from_language: fromLanguage,
				to_language: toLanguage,
				from_text: text,
			},
		})
		const savedTranslation = res.saveTranslation
		if (!savedTranslation) {
			throw error(400, JSON.stringify(res.errors))
		} else {
			return savedTranslation
		}
	} catch (e: any) {
		throw error(400, e)
	}
}