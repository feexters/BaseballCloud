import { AvatarData } from "./avatar-data";

export interface EventNormalizeData {
  data_rows_count?: number;
  is_pitcher?: boolean;
  date: string;
  event_name: string;
  event_type: string;
  id: string;
  recent_avatars?: (keyof {[key: string]: AvatarData})[];
}