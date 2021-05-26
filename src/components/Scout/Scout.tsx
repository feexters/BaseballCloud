import styled from "styled-components";
import { ScoutInfo, ScoutMain } from "./components";
import { useQuery } from "@apollo/client";
import { FAVORITE_PROFILES } from "apollo";
import {
  FavoriteProfilesResponse,
  FavoriteProfilesFilters,
} from "lib/interfaces";
import { MainLoader } from "ui";

const Scout = () => {
  const { loading: loadingFavorite } = useQuery<
    FavoriteProfilesResponse,
    FavoriteProfilesFilters
  >(FAVORITE_PROFILES, {
    variables: {
      input: {
        offset: 0,
        profiles_count: 50,
      },
    },
  });

  if (loadingFavorite) {
    return <MainLoader />
  }

  return (
    <Wrap>
      <ScoutInfo />
      <Main>
        <ScoutMain />
      </Main>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;

  @media (max-width: 640px) {
    flex-direction: column;

    & > aside,
    & > main {
      width: 100%;
      flex-direction: row;
    }
  }
`;

const Main = styled.main`
  background: #788b99;
  flex: 2;
  height: 100%;
  overflow: auto;
  flex-direction: column;
  width: calc(100vw - 220px);
`;

export default Scout;
