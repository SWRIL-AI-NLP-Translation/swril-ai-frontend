import { defaultAccountData, type AccountData } from "$lib/types/account";
import type { ServerLoadParams } from "$lib/types/serverLoad";
import { getInputText } from "$lib/utils/input";
import { graphql } from "../graphql";
import { UPDATE_USER } from "../graphql/mutations/updateUser";
import { GET_USER, GET_USER_WITH_FILES } from "../graphql/queries/getUser";
import { LOGIN } from "../graphql/mutations/login";
import { error } from '@sveltejs/kit';
import { CREATE_USER } from "../graphql/mutations/createUser";
import { DataResponse, type DataResponseType } from "$lib/types/data";
import type { GraphQLe } from "$lib/types/graphql";

const genericLoadAccount = async ({ parent }: ServerLoadParams, gql: string): Promise<AccountData> =>  {
	try {
		const { token } = await parent();
		if (token) {
			try {
				graphql.setHeader('Authorization', `Bearer ${token}`)
				const res = await graphql.request(gql, {})
				const data = res.getUser
				if (!data) {
					console.error(res.errors)
				} else {
					return {
						token,
						user: {
							...data,
						}
					}
				}
			} catch (e) {
				console.error(e)
			}
		}
		return defaultAccountData;
	} catch (e) {
		console.log(e);
		throw error(400, 'Request failed');
	}
}

export const loadAccount = async ({ parent }: ServerLoadParams): Promise<AccountData> =>  {
	return genericLoadAccount({parent}, GET_USER)
}

export const loadAccountWithFiles = async ({ parent }: ServerLoadParams): Promise<AccountData> =>  {
	return genericLoadAccount({parent}, GET_USER_WITH_FILES)
}

export const updateAccount = async (): Promise<DataResponseType> => {
	const first_name = getInputText("#firstNameInput");
	const last_name = getInputText("#lastNameInput");

	if (first_name === '' || last_name === '' ) {
		return DataResponse.warning("Please fill out all fields");
	}

	try {
		const res = await graphql.request(UPDATE_USER, {
			data: {first_name, last_name},
		})
		const data = res.updateUser
		if (data) return DataResponse.success(null)
		else return DataResponse.warning("Unknown error")
	} catch (e: unknown) {
		return DataResponse.warning((e as GraphQLe).response.errors[0].message)
	}
}

export const login = async (): Promise<DataResponseType<string>> => {
	const email = getInputText("#emailInput");
	const password = getInputText("#passwordInput");

	if (email === '' || password === '' ) {
		return DataResponse.warning("Please fill out all fields");
	}

	try {
		const res = await graphql.request(LOGIN, {
			data: {email, password},
		})
		const data = res.login
		if (data) return DataResponse.success(data.token)
		else return DataResponse.warning("Unknown error")
	} catch (e:unknown) {
		return DataResponse.warning((e as GraphQLe).response.errors[0].message)
	}
}

export const createAccount = async (): Promise<DataResponseType<string>> => {
	const first_name = getInputText("#firstNameInput");
	const last_name = getInputText("#lastNameInput");
	const email = getInputText("#emailInput");
	const password = getInputText("#passwordInput");
	const confirm_password = getInputText("#confirmPasswordInput");

	if (password !== confirm_password) {
		return DataResponse.warning("Passwords do not match");
	}
	if (first_name === '' || last_name === '' || email === '' || password === '') {
		return DataResponse.warning("Please fill out all fields");
	}
	try {
		const res = await graphql.request(CREATE_USER, {
			data: {
				first_name, last_name, email, password,
				phone_number: "1234567890",
			},
		})
		const data = res.createUser
		if (data) return DataResponse.success(data.token)
		else return DataResponse.warning("Unknown error")
	} catch (e:unknown) {
		return DataResponse.warning((e as GraphQLe).response.errors[0].message)
	}
}