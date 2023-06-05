import { gql } from "graphql-request";

export const GET_USER = gql`
query GetUser{
	getUser {
		email
		last_name
		first_name
		phone_number
		id
		translations {
			# id
			to_text
			from_text
			from_language
			to_language
    	}
	}
}
`;

export const GET_USER_WITH_FILES = gql`
query GetUser{
	getUser {
		email
		last_name
		first_name
		phone_number
		id
		translations {
			# id
			to_text
			from_text
			from_language
			to_language
    	}
		files {
			id
			name
			text
			created_at
		}
	}
}
`;

