import { ProfilesData } from "./profiles-data";

export interface ProfilesResponseData {
  profiles: {
    profiles: ProfilesData[];
    total_count: number;
  };
}