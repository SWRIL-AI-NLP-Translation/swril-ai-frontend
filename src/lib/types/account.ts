import type { UserType } from "./user";

export interface AccountData {	
	user?: UserType,
	token?: string
}

export const defaultAccountData: AccountData = {};
