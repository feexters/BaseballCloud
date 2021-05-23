import gql from "graphql-tag";

export const BATTING_SUMMARY = gql`
  query BattingSummary($id: ID!) {
    batting_summary(id: $id) {
      top_values {
        id
        distance
        pitch_type
        launch_angle
        exit_velocity
      }
      average_values {
        id
        distance
        pitch_type
        launch_angle
        exit_velocity
      }
    }
  }
`;
