import { SchoolData } from "./school-data";
import { TeamData } from "./team-data";

export interface LeaderPitchingData {
  age: number;
  favorite: boolean;
  horizontal_break: string | number | null;
  pitch_type: string;
  pitcher_datraks_id: string;
  pitcher_name: string;
  school: SchoolData;
  spin_rate: number;
  teams: TeamData[];
  velocity: number;
  vertical_break: string | number | null;
}
