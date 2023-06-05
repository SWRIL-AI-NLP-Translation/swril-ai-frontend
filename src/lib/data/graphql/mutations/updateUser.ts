import { gql } from "graphql-request";

export const UPDATE_USER = gql`
mutation UpdateUser($data: UpdateUserInput!) {
	updateUser(data: $data) {
		id
		last_name
		first_name
		email
		created_at
	}
}
`;
