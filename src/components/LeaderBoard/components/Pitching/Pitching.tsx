import { useMutation, useQuery } from "@apollo/client";
import { LEADER_PITCHING } from "apollo";
import { UPDATE_FAVORITE } from "apollo/mutations";
import {
  LeaderFilters,
  SubscribeData,
  SubscribeResponse,
  LeaderPitchingResponse,
  LeaderPitchingData,
} from "lib/interfaces";
import { getId } from "lib/utils";
import React from "react";
import { toastr } from "react-redux-toastr";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Table } from "ui";
import { toastrSubscribeOption } from "ui/Toastr/Toastr";

interface BattingProps {
  filters: LeaderFilters;
}

interface TableData {
  id: string;
  values: {
    rank: number;
    name: JSX.Element;
    age: number;
    school: string;
    teams: string;
    pitch_type: string;
    velocity: number;
    spin_rate: number;
    favorite: JSX.Element;
  };
}

const tableHeaders: { key: keyof TableData["values"]; title: string }[] = [
  {
    key: "rank",
    title: "Rank",
  },
  {
    key: "name",
    title: "Pitcher Name",
  },
  {
    key: "age",
    title: "Age",
  },
  {
    key: "school",
    title: "School",
  },
  {
    key: "teams",
    title: "Teams",
  },
  {
    key: "pitch_type",
    title: "Pitch Type",
  },
  {
    key: "velocity",
    title: "Velocity",
  },
  {
    key: "spin_rate",
    title: "Spin Rate",
  },
  {
    key: "favorite",
    title: "Favorite",
  },
];

const Pitching: React.FC<BattingProps> = ({ filters }) => {
  const history = useHistory();

  const [submitFavorite] =
    useMutation<SubscribeResponse, SubscribeData>(UPDATE_FAVORITE);

  const {
    loading: loadingProfiles,
    data,
    refetch,
  } = useQuery<LeaderPitchingResponse, LeaderFilters>(LEADER_PITCHING, {
    variables: filters,
  });

  const onNavigate = (id: string) => {
    history.push(`profile/${id}`);
  };

  const onSubscribe = async (id: string, isSubscribe: boolean) => {
    await submitFavorite({
      variables: {
        form: {
          profile_id: id,
          favorite: !isSubscribe,
        },
      },
      update: () => {
        refetch();
      },
    });

    toastr.success("", "", toastrSubscribeOption(!isSubscribe));
  };

  const tabValues: TableData[] = (
    data
      ? data.leaderboard_pitching.leaderboard_pitching
      : ([] as LeaderPitchingData[])
  ).map((obj, index) => {
    return {
      id: getId(),
      values: {
        rank: index + 1,
        name: (
          <LinkWrap>
            <ProfileLink onClick={() => onNavigate(obj.pitcher_datraks_id)}>
              {obj.pitcher_name}
            </ProfileLink>
          </LinkWrap>
        ),
        age: obj.age,
        school: obj.school?.name || "-",
        teams: obj.teams.map((item) => item.name).join(", "),
        velocity: obj.velocity,
        spin_rate: obj.spin_rate,
        pitch_type: obj.pitch_type,
        favorite: (
          <FavoriteIcon
            onClick={() => onSubscribe(obj.pitcher_datraks_id, obj.favorite)}
            className={`${obj.favorite ? "fas" : "far"} fa-heart`}
          />
        ),
      },
    };
  });

  return (
    <>
      <TableWrap>
        <Table
          titles={tableHeaders}
          values={tabValues}
          loading={loadingProfiles}
          minHeight="420px"
        />
      </TableWrap>
      {tabValues.length === 0 && !loadingProfiles && (
        <NoInfo>There's no info yet!</NoInfo>
      )}
    </>
  );
};

const TableWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const LinkWrap = styled.div`
  margin-left: 5px;
`;

const ProfileLink = styled.a`
  font-size: 1.4rem;
  color: #414f5a;
  line-height: 1.13;
  font-weight: 400;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #48bbff;
    text-decoration: underline;
  }
`;

const NoInfo = styled.div`
  height: 100%;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667784;
  font-size: 16px;
`;

const FavoriteIcon = styled.i`
  font-size: 1.4rem;
  color: rgb(72, 187, 255);
  cursor: pointer;
`;

export default Pitching;
