import { gql } from "graphql-request";

export const TRANSLATION = gql`
query Translation($data: TranslationInput!) {
	translation (data: $data) {
		text
	}
}
`;