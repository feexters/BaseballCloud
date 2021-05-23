import { useQuery } from "@apollo/client";
import { PROFILE, BATTING_SUMMARY } from "apollo";
import { Validation } from "lib/utils";
import React, { useState } from "react";
import styled from "styled-components";
import {
  ProfileInfo,
  ProfileMain,
  ProfileSettings,
  ProfileStart,
} from "./components";
import { MainLoader } from "ui";

const Profile: React.FC<{ id: string }> = ({ id }) => {
  const { loading: loadingProfile, data } = useQuery(PROFILE, {
    variables: { id: id },
  });

  const { loading: loadingBatting } = useQuery(BATTING_SUMMARY, {
    variables: { id },
  });

  const isEnoughData = !loadingProfile
    ? Validation.userFieldsRequired(data.profile)
    : false;
  const [isChangeForm, setIsChangeForm] = useState(false);

  if (loadingProfile || loadingBatting) {
    return <MainLoader />;
  }

  return (
    <Wrap>
      {(!isChangeForm && isEnoughData) ? (
        <ProfileInfo onToggle={() => setIsChangeForm(true)} id={id} />
      ) : (
        <ProfileSettings onToggle={() => setIsChangeForm(false)} />
      )}

      <Main>{!isEnoughData ? <ProfileStart /> : <ProfileMain id={id} />}</Main>
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

export default Profile;
