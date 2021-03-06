import { AvatarData } from "./avatar-data";

export interface EventData {
  date_rows_count?: number;
  is_pitcher?: boolean;
  date: string;
  event_name: string;
  event_type: string;
  id: string;
  recent_avatars?: AvatarData[];
}
