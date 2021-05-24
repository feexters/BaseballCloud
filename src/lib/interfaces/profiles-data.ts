import { EventData } from "./event-data";
import { SchoolData } from "./school-data";
import { TeamData } from "./team-data";

export interface ProfilesData {
  age: number;
  events: EventData[];
  favorite: boolean;
  feet: number;
  first_name: string;
  id: string;
  inches: number;
  last_name: string;
  position: string;
  position2: string;
  school: SchoolData;
  school_year: string;
  teams: TeamData[];
  weight: number;
}
