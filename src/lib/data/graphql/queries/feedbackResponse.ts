import { gql } from 'graphql-request';

export const FEEDBACK_RESPONSE = gql`
	query GetFeedbackResponse($data: FeedbackInput!) {
		getFeedbackResponse(data: $data) {
            response
		}
	}
`;
