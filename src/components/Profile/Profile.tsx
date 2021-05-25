import { useMutation, useQuery } from "@apollo/client";
import { PROFILE, BATTING_SUMMARY, client, CURRENT_PROFILE } from "apollo";
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
import { useParams } from "react-router";
import { SubscribeData, SubscribeResponse, UserData } from "lib/interfaces";
import { UPDATE_FAVORITE } from "apollo/mutations";
import { toastr } from "react-redux-toastr";
import { toastrSubscribeOption } from "ui/Toastr/Toastr";

const Profile: React.FC<{ currentId: string }> = ({ currentId }) => {
  const profileRoute = useParams() as { id: string };
  const id = profileRoute.id ? profileRoute.id : currentId;

  const [submitFavorite] =
    useMutation<SubscribeResponse, SubscribeData>(UPDATE_FAVORITE);

  const { loading: loadingProfile, data } = useQuery(PROFILE, {
    variables: { id: id },
  });

  const { loading: loadingBatting } = useQuery(BATTING_SUMMARY, {
    variables: { id },
  });

  const { current_profile } = client.readQuery<{ current_profile: UserData }>({
    query: CURRENT_PROFILE,
  }) || { current_profile: {} as UserData };

  const isEnoughData = !loadingProfile
    ? Validation.userFieldsRequired(data.profile)
    : false;
  const [isChangeForm, setIsChangeForm] = useState(false);

  if (loadingProfile || loadingBatting) {
    return <MainLoader />;
  }

  const onToggle = async () => {
    if (current_profile?.id === data.profile.id) {
      setIsChangeForm(true);
    } else {
      await submitFavorite({
        variables: {
          form: {
            profile_id: id,
            favorite: !data.profile.favorite,
          },
        },
        update: (cache, { data: update }) => {
          cache.writeQuery({
            query: PROFILE,
            variables: { id: data.profile.id },
            data: {
              profile: { ...data.profile, ...update?.update_favorite_profile },
            },
          });
        },
      });

      toastr.success("", "", toastrSubscribeOption(!data.profile.favorite));
    }
  };

  return (
    <Wrap>
      {!isChangeForm && isEnoughData ? (
        <ProfileInfo onToggle={onToggle} id={id} />
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
