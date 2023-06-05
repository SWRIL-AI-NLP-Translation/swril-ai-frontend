import { gql } from "graphql-request";

export const LOGIN = gql`
mutation Login($data: LoginInput!) {
	login(data: $data) {
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
