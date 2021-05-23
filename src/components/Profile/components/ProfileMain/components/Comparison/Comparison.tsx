import React, { useState } from "react";
import styled from "styled-components";
import avatarImage from "assets/images/user.png";
import { DropDown, DropDownPanel } from "ui";
import { Field, Form } from "react-final-form";
import { SearchIcon } from "assets";
import { useLazyQuery, useQuery } from "@apollo/client";
import { client, PROFILE } from "apollo";
import {
  BattingData,
  ProfileNamesData,
  ProfileNamesFilters,
  UserData,
} from "lib/interfaces";
import { PROFILE_NAMES } from "apollo/queries/profile-names";
import Loader from "react-loader-spinner";

const battingSelectValues = ["Distance", "Launch Angle", "Exit Velocity"];
const battingSelectKeys: { key: keyof BattingData; title: string }[] = [
  {
    key: "distance",
    title: "Distance",
  },
  {
    key: "launch_angle",
    title: "Launch Angle",
  },
  {
    key: "exit_velocity",
    title: "Exit Velocity",
  },
];

interface ProfileNamesResponse {
  profile_names: {
    profile_names: ProfileNamesData[];
  };
}

const Comparison: React.FC<{ id: string }> = ({ id }) => {
  const [searchValue, setSearchValue] = useState("");
  const [battingSelect, setBattingSelect] = useState(battingSelectValues[0]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [hoverPlayer, setHoverPlayer] = useState(0);

  const { profile } = client.readQuery<{ profile: UserData }>({
    query: PROFILE,
    variables: { id },
  }) || { profile: {} as UserData };

  const { loading: loadingProfiles, data } = useQuery<
    ProfileNamesResponse,
    { input: ProfileNamesFilters }
  >(PROFILE_NAMES, {
    variables: {
      input: {
        position: profile.position,
        player_name: searchValue,
      },
    },
  });

  const {
    profile_names: { profile_names },
  } = data
    ? data
    : ({ profile_names: { profile_names: [] } } as ProfileNamesResponse);

  const [getProfile, { loading: loadingProfile, data: comparisonData }] =
    useLazyQuery<{
      profile: UserData;
    }>(PROFILE, { variables: { id: selectedPlayer } });

  const { profile: comparisonProfile } = comparisonData
    ? comparisonData
    : { profile: {} as UserData };

  const onCloseDropDown = () => {
    setTimeout(() => setIsDropDownOpen(false), 250);
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter" && profile_names[hoverPlayer]) {
      onSelect(profile_names[hoverPlayer].id);
    } else if (event.code === "ArrowUp") {
      setHoverPlayer(
        hoverPlayer - 1 < 0 ? profile_names.length - 1 : hoverPlayer - 1
      );
    } else if (event.code === "ArrowDown") {
      setHoverPlayer(
        hoverPlayer + 1 > profile_names.length - 1 ? 0 : hoverPlayer + 1
      );
    }
  };

  const onSelect = (id: string) => {
    setSelectedPlayer(id);
    getProfile();
  };

  const findBattingValue = (
    batting: BattingData[],
    type: string,
    select: string
  ): number | string => {
    const battingType = batting.find((item) => item.pitch_type === type);

    if (battingType) {
      const key = battingSelectKeys.find((item) => item.title === select)!.key;
      if (battingType[key]) {
        return battingType[key]!;
      } else {
        return "-";
      }
    }

    return "-";
  };

  return (
    <>
      <ComparisonWrap>
        <ComparisonRow>
          <ComparisonColumn>
            <PlayerAvatar image={profile.avatar} />
            {profile.first_name + " " + profile.last_name}
          </ComparisonColumn>
          <ComparisonColumn>
            {(loadingProfiles || loadingProfile) && (
              <LoaderWrap>
                <Loader type="ThreeDots" color="#48BBFF" width={30} />
              </LoaderWrap>
            )}
            <PlayerAvatar image={comparisonProfile.avatar} />
            <Form
              onSubmit={() => {}}
              initialValues={{
                search: comparisonProfile.first_name
                  ? `${comparisonProfile.first_name} ${comparisonProfile.last_name}`
                  : "",
              }}
              render={({ form }) => (
                <Field name="search">
                  {({ input }) => (
                    <SearchWrap>
                      <SearchInput
                        {...input}
                        onBlur={onCloseDropDown}
                        onChange={(event) => {
                          input.onChange(event);
                          setSearchValue(event.target.value);
                          setHoverPlayer(0);
                        }}
                        onKeyDown={onKeyPress}
                        onFocus={() => setIsDropDownOpen(true)}
                        placeholder={"Enter player name"}
                        autoComplete={"off"}
                      />
                      <DropDownPanel
                        isOpen={isDropDownOpen}
                        items={profile_names.map((item) => {
                          return {
                            id: item.id,
                            value: `${item.first_name} ${item.last_name}`,
                          };
                        })}
                        onSelect={onSelect}
                        active={
                          profile_names[hoverPlayer]
                            ? profile_names[hoverPlayer].id
                            : ""
                        }
                      />
                      <SearchIcon />
                    </SearchWrap>
                  )}
                </Field>
              )}
            />
          </ComparisonColumn>
        </ComparisonRow>
        <ComparisonRow>
          <ComparisonColumn>Age:&nbsp;&nbsp;{profile.age}</ComparisonColumn>
          <ComparisonColumn>
            Age:&nbsp;&nbsp;{comparisonProfile.age || "-"}
          </ComparisonColumn>
        </ComparisonRow>
        <ComparisonRow>
          <ComparisonColumn>
            Height:&nbsp;&nbsp;
            {profile.feet + " ft " + (profile.inches || "0") + " in"}
          </ComparisonColumn>
          <ComparisonColumn>
            Height:&nbsp;&nbsp;
            {comparisonProfile.feet
              ? comparisonProfile.feet +
                " ft " +
                (comparisonProfile.inches || "0") +
                " in"
              : "-"}
          </ComparisonColumn>
        </ComparisonRow>
        <ComparisonRow>
          <ComparisonColumn>
            Weight:&nbsp;&nbsp;{profile.weight + " lbs"}
          </ComparisonColumn>
          <ComparisonColumn>
            Weight:&nbsp;&nbsp;
            {comparisonProfile.weight ? comparisonProfile.weight + " lbs" : "-"}
          </ComparisonColumn>
        </ComparisonRow>
      </ComparisonWrap>
      <DropDownWrap>
        <DropDown items={battingSelectValues} onSelect={setBattingSelect}>
          {`Top Batting Values - ${battingSelect}`}
        </DropDown>
      </DropDownWrap>
      <ComparisonWrap>
        <TableRow>
          <TableValue>Fastball</TableValue>
          <TableValue>
            {findBattingValue(
              profile.batting_top_values,
              "Fastball",
              battingSelect
            )}
          </TableValue>
          <TableValue>
            {comparisonProfile.batting_top_values &&
              findBattingValue(
                comparisonProfile.batting_top_values,
                "Fastball",
                battingSelect
              )}
          </TableValue>
        </TableRow>
        <TableRow>
          <TableValue>Curveball</TableValue>
          <TableValue>
            {findBattingValue(
              profile.batting_top_values,
              "Curveball",
              battingSelect
            )}
          </TableValue>
          <TableValue>
            {comparisonProfile.batting_top_values &&
              findBattingValue(
                comparisonProfile.batting_top_values,
                "Curveball",
                battingSelect
              )}
          </TableValue>
        </TableRow>
        <TableRow>
          <TableValue>Changeup</TableValue>
          <TableValue>
            {findBattingValue(
              profile.batting_top_values,
              "Changeup",
              battingSelect
            )}
          </TableValue>
          <TableValue>
            {comparisonProfile.batting_top_values &&
              findBattingValue(
                comparisonProfile.batting_top_values,
                "Changeup",
                battingSelect
              )}
          </TableValue>
        </TableRow>
        <TableRow>
          <TableValue>Slider</TableValue>
          <TableValue>
            {findBattingValue(
              profile.batting_top_values,
              "Slider",
              battingSelect
            )}
          </TableValue>
          <TableValue>
            {comparisonProfile.batting_top_values &&
              findBattingValue(
                comparisonProfile.batting_top_values,
                "Slider",
                battingSelect
              )}
          </TableValue>
        </TableRow>
      </ComparisonWrap>
    </>
  );
};

const ComparisonWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableValue = styled.div`
  font-size: 14px;
  color: #414f5a;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  min-height: 44px;
  align-items: center;
  border-radius: 4px;
  background-color: #f7f8f9;
  margin-bottom: 4px;
`;

const ComparisonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 8px;
  min-height: 44px;
`;

const ComparisonColumn = styled.div`
  display: flex;
  font-size: 1.6rem;
  position: relative;
`;

const LoaderWrap = styled.div`
  position: absolute;
  top: -20px;
  left: -35px;
`;

const DropDownWrap = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
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

const SearchInput = styled.input`
  width: 135px;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  color: #788b99;
  border: none;
  padding: 7px 0;
  transition: width ease 0.5s;

  &:focus {
    outline: none;
    border-bottom: 1px solid #48bbff;
    width: 180px;

    &::placeholder {
      color: #788b99;
    }
  }

  &::placeholder {
    color: #48bbff;
  }
`;

const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

export default Comparison;
