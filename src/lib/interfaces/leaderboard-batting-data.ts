import { SchoolData } from "./school-data";
import { TeamData } from "./team-data";

export interface LeaderBattingData {
  age: number;
  batter_datraks_id: string;
  batter_name: string;
  distance: number;
  exit_velocity: number;
  favorite: boolean;
  launch_angle: number;
  school: SchoolData;
  teams: TeamData[];
}
