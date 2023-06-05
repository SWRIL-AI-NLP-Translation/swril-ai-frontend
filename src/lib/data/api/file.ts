import { apiEndpoint } from './endpoint';

export const uploadFile = async (file: File, token: string) => {
	const formData = new FormData();
	formData.append('file', file);

	const response = await fetch(apiEndpoint + '/file', {
		method: 'POST',
		body: formData,
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	const data = await response.json()
	return data
};
