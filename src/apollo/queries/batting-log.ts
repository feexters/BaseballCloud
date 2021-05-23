import gql from "graphql-tag";

export const BATTING_LOG = gql`
  query BattingLog($input: FilterBattingLogInput!) {
    batting_log(input: $input) {
      batting_log {
        date
        pitcher_name
        pitcher_handedness
        pitch_type
        pitch_call
        exit_velocity
        launch_angle
        direction
        distance
        hit_spin_rate
        hang_time
        pitcher_datraks_id
      }
      total_count
    }
  }
`;
