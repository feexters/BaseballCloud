import { EventData } from "./event-data";

export interface ProfileEventsResponse {
  profile_events: {
    events: EventData[];
    total_count: number;
  }
}
