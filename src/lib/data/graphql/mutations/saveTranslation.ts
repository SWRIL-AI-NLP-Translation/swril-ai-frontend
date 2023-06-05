import { gql } from "graphql-request";

export const SAVE_TRANSLATION = gql`
 mutation SaveTranslation($data: SavedTranslationInput!){
   saveTranslation(data: $data) {
       id
	   to_text
      from_text
      from_language
      to_language
     }
   }
`;


