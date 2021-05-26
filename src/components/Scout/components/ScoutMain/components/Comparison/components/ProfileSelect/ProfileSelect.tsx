import { useLazyQuery } from "@apollo/client";
import { client, FAVORITE_PROFILES, PROFILE } from "apollo";
import {
  BattingData,
  FavoriteProfilesData,
  FavoriteProfilesFilters,
  FavoriteProfilesResponse,
  UserData,
} from "lib/interfaces";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import avatarImage from "assets/images/user.png";
import Loader from "react-loader-spinner";
import { DropDownPanel } from "ui";
import { DropDownIcon } from "assets";

interface ProfileSelectProps {
  onSelect(batting_top: BattingData[]): void;
}

const Profile: React.FC<ProfileSelectProps> = ({ onSelect }) => {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const [getProfile, { loading: loadingProfile, data }] = useLazyQuery<{
    profile: UserData;
  }>(PROFILE, { variables: { id: selectedPlayer } });

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

  const { profile } = data ? data : { profile: {} as UserData };

  useEffect(() => {
    onSelect(profile ? profile.batting_top_values : ([] as BattingData[]));
  }, [profile, onSelect]);

  const favorite = favoriteProfiles
    ? favoriteProfiles.my_favorite.profiles
    : ([] as FavoriteProfilesData[]);

  const onSelectProfile = (id: string) => {
    setSelectedPlayer(id);
    getProfile();
  };

  return (
    <>
      <ProfileItem>
        {loadingProfile && (
          <LoaderWrap>
            <Loader type="ThreeDots" color="#48BBFF" width={30} />
          </LoaderWrap>
        )}

        <PlayerAvatar image={profile.avatar} />

        <DropDownToggle onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
          {profile.first_name
            ? profile.first_name + " " + profile.last_name
            : "Select Player"}

          <Icon isOpen={isDropDownOpen}>
            <DropDownIcon />
          </Icon>
        </DropDownToggle>

        <DropDownWrap>
          <DropDownPanel
            isOpen={isDropDownOpen}
            items={favorite.map((item) => {
              return {
                id: item.id,
                value: `${item.first_name} ${item.last_name}`,
              };
            })}
            isArrow={false}
            onSelect={onSelectProfile}
          />
        </DropDownWrap>
      </ProfileItem>

      <ProfileItem>Age:&nbsp;&nbsp;{profile.age || "-"}</ProfileItem>

      <ProfileItem>
        Height:&nbsp;&nbsp;
        {profile.feet
          ? profile.feet + " ft " + (profile.inches || "0") + " in"
          : "-"}
      </ProfileItem>

      <ProfileItem>
        Weight:&nbsp;&nbsp;
        {profile.weight ? profile.weight + " lbs" : "-"}
      </ProfileItem>
    </>
  );
};

const ProfileItem = styled.div`
  display: flex;
  font-size: 1.6rem;
  position: relative;
`;

const LoaderWrap = styled.div`
  position: absolute;
  top: -20px;
  left: -35px;
`;

const PlayerAvatar = styled.div<{ image: string }>`
  width: 40px;
  height: 40px;
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 50%;
  margin-right: 5px;
  background-image: url(${({ image }) => (image ? image : avatarImage)});
`;

const DropDownToggle = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  font-size: 1.6rem;
  line-height: 1.19;
  color: #48bbff;
  white-space: nowrap;
  position: relative;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const Icon = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : "0deg")});
`;

const DropDownWrap = styled.div`
  position: absolute;
  width: 200px;
  left: 40px;
  top: 30px;
`;

export default Profile;
