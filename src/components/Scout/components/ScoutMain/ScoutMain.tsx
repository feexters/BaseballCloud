import { client, FAVORITE_PROFILES } from "apollo";
import { Events } from "components/Events";
import {
  AvatarData,
  EventNormalizeData,
  FavoriteProfilesFilters,
  FavoriteProfilesResponse,
} from "lib/interfaces";
import { favoriteListSchema } from "lib/normalizr";
import { normalize } from "normalizr";
import styled from "styled-components";
import { Comparison } from "./components";

const ScoutMain = () => {
  const favoriteProfiles = client.readQuery<
    FavoriteProfilesResponse,
    FavoriteProfilesFilters
  >({
    query: FAVORITE_PROFILES,
    variables: {
      input: {
        offset: 0,
        profiles_count: 50,
      },
    },
  });

  const favorite = normalize(
    favoriteProfiles?.my_favorite.profiles || {},
    favoriteListSchema
  );

  const events: { [key: string]: EventNormalizeData } =
    favorite.entities.events || ({} as { [key: string]: EventNormalizeData });

  const avatars: { [key: string]: AvatarData } =
    favorite.entities.avatars || ({} as { [key: string]: AvatarData });

  return (
    <>
      <Wrap>
        <Title>Recent Session Reports</Title>
        <Events events={Object.values(events)} avatars={avatars} />
      </Wrap>

      <Wrap>
        <Title>Comparison</Title>
        <Comparison />
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  background: #fff;
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  display: block;
  font-size: 18px;
  line-height: 1.25;
  font-weight: 900;
  color: #414f5a;
`;

export default ScoutMain;
