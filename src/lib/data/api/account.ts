import { goto } from "$app/navigation";
import { defaultAccountData, type AccountData } from "$lib/types/account";
import type { ServerLoadParams } from "$lib/types/serverLoad";
import { getInputText } from "$lib/utils/input";
import { graphql } from "../graphql";
import { UPDATE_USER } from "../graphql/mutations/updateUser";
import { GET_USER, GET_USER_WITH_FILES } from "../graphql/queries/getUser";
import { error } from '@sveltejs/kit';
import { LOGIN } from "../graphql/mutations/login";
import { Cookies } from "$lib/utils/cookies";
import { CREATE_USER } from "../graphql/mutations/createUser";

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

export const updateAccount = async () => {
	const firstName = getInputText("#firstNameInput");
	const lastName = getInputText("#lastNameInput");

	if (firstName === '' || lastName === '' ) {
		alert("Please fill out all fields");
		return;
	}

	try {
		const res = await graphql.request(UPDATE_USER, {
			data: {
				first_name: firstName,
				last_name: lastName,
			},
		})
		const data = res.updateUser
		if (!data) {
			throw error(400, JSON.stringify(res.errors))
		} else {
			alert("Account updated successfully")
			goto('/settings')
		}
	} catch (e: any) {
		throw error(400, e)
	}
}

export const login = async () => {
	const email = getInputText("#emailInput");
	const password = getInputText("#passwordInput");

	if (email === '' || password === '' ) {
		alert("Please fill out all fields");
		return;
	}

	try {
		const res = await graphql.request(LOGIN, {
			data: {
				email: email,
				password: password,
			},
		})
		const data = res.login
		if (!data) {
			throw error(400, JSON.stringify(res.errors))
		} else {
			alert("Logged in!")
			Cookies.set('token', data.token)
			window.location.href = '/'
		}
	} catch (e:any) {
		throw error(400, e)
	}
}

export const createAccount = async () => {
	const firstName = getInputText("#firstNameInput");
	const lastName = getInputText("#lastNameInput");
	const email = getInputText("#emailInput");
	const password = getInputText("#passwordInput");
	const confirmPassword = getInputText("#confirmPasswordInput");

	if (password !== confirmPassword) {
		alert("Passwords do not match");
		return;
	}
	if (firstName === '' || lastName === '' || email === '' || password === '') {
		alert("Please fill out all fields");
		return;
	}
	try {
		const res = await graphql.request(CREATE_USER, {
			data: {
				first_name: firstName,
				last_name: lastName,
				email: email,
				password: password,
				phone_number: "1234567890",
			},
		})
		const data = res.createUser
		if (!data) {
			console.error(res.errors)
		} else {
			alert("Account created successfully")
			Cookies.set('token', data.token)
			window.location.href = '/'
		}
	} catch (e) {
		console.error(e)
	}
}