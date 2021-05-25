import gql from "graphql-tag";

export const FAVORITE_PROFILES = gql`
  query MyFavoriteProfiles($input: FilterProfilesInput!) {
    my_favorite(input: $input) {
      profiles {
        id
        first_name
        last_name
        recent_events {
          id
          event_type
          event_name
          date
          recent_avatars {
            id
            first_name
            last_name
            avatar
          }
        }
      }
      total_count
    }
  }
`;
