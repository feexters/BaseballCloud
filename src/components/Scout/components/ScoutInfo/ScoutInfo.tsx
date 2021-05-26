import { client, FAVORITE_PROFILES } from "apollo";
import {
  FavoriteProfilesFilters,
  FavoriteProfilesResponse,
} from "lib/interfaces";
import { useHistory } from "react-router";
import styled from "styled-components";

const ScoutInfo = () => {
  const data = client.readQuery<
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

  const history = useHistory();

  return (
    <Wrap>
      {data?.my_favorite.profiles.map((profile) => (
        <Player key={profile.id} onClick={() => history.push(`profile/${profile.id}`)}>
          <PlayerLink
            title={`See ${profile.first_name} ${profile.last_name} profile details`}
          >
            {profile.first_name + " " + profile.last_name}
          </PlayerLink>
        </Player>
      ))}
    </Wrap>
  );
};

const maxWidth = 640;

const Wrap = styled.aside`
  position: relative;
  width: 298px;
  max-height: 100%;
  background: #ffffff;
  height: auto;
  display: flex;
  flex-direction: column;
  transition: all 0.1s;
  box-shadow: 0 2px 15px 0 rgb(0 0 0 / 10%);
  background: #fff;
  padding: 16px;
  overflow: auto;
  z-index: 5;

  @media (max-width: ${maxWidth + "px"}) {
    align-items: flex-start;
    padding: 5px;

    div {
      box-sizing: content-box;
    }
  }
`;

const Player = styled.div`
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background: #788b99;
    border-radius: 6px;
    transition: all 0.25s ease;
  }

  @media (max-width: ${maxWidth + "px"}) {
    border: none;
  }
`;

const PlayerLink = styled.a`
  display: block;
  padding: 16px;
  margin: -16px;
  font-size: 1.6rem;
  color: inherit;
  text-decoration: none;

  &:hover {
    color: inherit;
  }
`;

export default ScoutInfo;
