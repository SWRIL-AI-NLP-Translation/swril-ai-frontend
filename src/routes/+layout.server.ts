import { Cookies } from "$lib/utils/cookies";
import type { LayoutServerLoadParams, LayoutServerLoadReturn } from "$lib/types/serverLoad";

export const load = async ({ request }: LayoutServerLoadParams): Promise<LayoutServerLoadReturn> => {
	const cookie = request.headers.get('cookie')
	if (cookie) {
		const token = Cookies.getFrom('token', cookie)
		return {
			token
		};
	} else {
		return {};
	}
}