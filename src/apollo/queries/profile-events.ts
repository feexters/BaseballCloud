import gql from "graphql-tag";

export const PROFILE_EVENTS = gql`
  query ProfileEvents($input: FilterProfileEventsInput!) {
    profile_events(input: $input) {
      events {
        id
        date
        event_type
        event_name
      }
      total_count
    }
  }
`;
