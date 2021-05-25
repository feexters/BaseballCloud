import { AvatarData } from "./avatar-data";

export interface EventData {
  date: string;
  event_name: string;
  event_type: string;
  id: string;
  recent_avatars?: AvatarData[];
}
