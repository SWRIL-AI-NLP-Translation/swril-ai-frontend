import { gql } from 'graphql-request';

export const CHAT_RESPONSE = gql`
	query GetChatResponse($data: ChatInput!) {
		getChatResponse(data: $data) {
			response {
				message
				services {
					title
					number
					link
					address
					distance
				}
			}
		}
	}
`;
