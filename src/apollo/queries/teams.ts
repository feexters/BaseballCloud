import gql from "graphql-tag";

export const TEAMS = gql`
  query Teams($search: String!) {
    teams(search: $search) {
      teams {
        id
        name
      }
    }
  }
`;
