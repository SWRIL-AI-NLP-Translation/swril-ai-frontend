import { GraphQLClient } from 'graphql-request';
import { apiEndpoint } from '../api';
// import { Cookies } from '$lib/utils/cookies';

export const graphql = new GraphQLClient(apiEndpoint, { headers: {
	// 'Authorization': `Bearer ${Cookies.get('token')}`
}});

