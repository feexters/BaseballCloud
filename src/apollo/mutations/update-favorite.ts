import gql from "graphql-tag";

export const UPDATE_FAVORITE = gql`
  mutation UpdateFavoriteProfile($form: UpdateFavoriteProfileInput!) {
    update_favorite_profile(input: $form) {
      favorite
    }
  }
`;
