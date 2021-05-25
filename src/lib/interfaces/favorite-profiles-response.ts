import { FavoriteProfilesData } from "./favorite-profiles-data";

export interface FavoriteProfilesResponse {
  my_favorite: {
    profiles: FavoriteProfilesData[];
    total_count: string;
  };
}
