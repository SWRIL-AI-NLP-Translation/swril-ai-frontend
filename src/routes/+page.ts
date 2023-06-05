import { error } from '@sveltejs/kit';
// import { graphql } from '$lib/data/graphql';
import { defaultAccountData, type AccountData } from '$lib/types/account';
import type { ServerLoadParams } from '$lib/types/serverLoad';



export const load = async ({ parent }: ServerLoadParams): Promise<AccountData> =>  {
	try {
		const { token } = await parent();

		if (token) return {token}

		return defaultAccountData;
	} catch (e) {
		console.log(e);
		throw error(400, 'Request failed');
	}
}
