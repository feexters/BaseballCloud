export interface ProfilesFilters {
  input: {
    age?: number | null;
    favorite?: number;
    offset: number;
    position?: string;
    profiles_count: number;
    school?: string;
    team?: string;
    player_name?: string;
  };
}
