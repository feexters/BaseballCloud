import { EventData } from "./event-data";

export interface FavoriteProfilesData {
  id: string;
  first_name: string;
  last_name: string;
  recent_events: EventData[];
}
