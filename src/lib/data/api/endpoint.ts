import { dev } from '$app/environment';
import { env } from '$env/dynamic/public'

const forceProduction = true;

const productionEndpoint = env.PUBLIC_ENDPOINT ?? 'https://api.swril.ca';

export const apiEndpoint = ((dev && !forceProduction) ? 'http://localhost:8080' : productionEndpoint ) + '/graphql'