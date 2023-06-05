import { gql } from "graphql-request";

export const CREATE_USER = gql`
mutation CreateUser($data: CreateUserInput!) {
	createUser(data: $data) {
	  user {
		id
		last_name
		first_name
		email
		created_at
	  }
	  token
	}
}
`;
