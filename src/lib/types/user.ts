import type { SavedTranslationType } from "./translation"
import type { UserFile } from "./userFile"

export interface UserType {
	id: string
	first_name: string
	last_name: string
	phone_number: string
    email: string
    created_at: string
	translations: SavedTranslationType[]
	files?: UserFile[]
}