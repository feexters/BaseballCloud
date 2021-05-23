import gql from "graphql-tag";

export const PROFILE_NAMES = gql`
  query ProfileNames($input: FilterProfileNamesInput!) {
    profile_names(input: $input) {
      profile_names {
        id
        position
        first_name
        last_name
        inches
        feet
        weight
        age
      }
    }
  }
`;
