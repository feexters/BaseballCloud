import { LeaderPitchingData } from "./leaderboard-pitching-data";

export interface LeaderPitchingResponse {
  leaderboard_pitching: {
    leaderboard_pitching: LeaderPitchingData[];
  };
}
