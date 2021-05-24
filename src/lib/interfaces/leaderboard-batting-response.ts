import { LeaderBattingData } from "./leaderboard-batting-data";

export interface LeaderBattingResponse {
  leaderboard_batting: {
    leaderboard_batting: LeaderBattingData[];
  };
}