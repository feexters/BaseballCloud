import gql from "graphql-tag";

export const SCHOOLS = gql`
  query Schools($search: String!) {
    schools(search: $search) {
      schools {
        id
        name
      }
    }
  }
`;
