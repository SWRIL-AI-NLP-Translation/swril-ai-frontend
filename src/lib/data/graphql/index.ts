import { GraphQLClient } from 'graphql-request';
import { apiEndpoint } from '../api';
// import { Cookies } from '$lib/utils/cookies';

export const graphql = new GraphQLClient(apiEndpoint + '/graphql', { headers: {
	// 'Authorization': `Bearer ${Cookies.get('token')}`
}});

