import { BattingData } from "./batting-data";
import { FacilitiesData } from "./facilities-data";
import { SchoolData } from "./school-data";
import { TeamData } from "./team-data";

export interface UserData {
  age: number;
  avatar: string;
  bats_hand: string;
  biography: string;
  facilities: FacilitiesData[];
  feet: number;
  first_name: string;
  id: string;
  inches: number;
  favorite: boolean;
  last_name: string;
  position: string;
  position2: string;
  school: SchoolData;
  school_year: string;
  teams: TeamData[];
  throws_hand: string;
  weight: number;
  batting_top_values: BattingData[]
}
