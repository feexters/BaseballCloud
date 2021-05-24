import { useMutation, useQuery } from "@apollo/client";
import { LEADER_BATTING } from "apollo";
import { UPDATE_FAVORITE } from "apollo/mutations";
import {
  LeaderBattingData,
  LeaderBattingFilters,
  LeaderBattingResponse,
  SubscribeData,
  SubscribeResponse,
} from "lib/interfaces";
import { getId } from "lib/utils";
import React from "react";
import { toastr } from "react-redux-toastr";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Table } from "ui";
import { toastrSubscribeOption } from "ui/Toastr/Toastr";

interface BattingProps {
  filters: LeaderBattingFilters;
}

interface TableData {
  id: string;
  values: {
    rank: number;
    name: JSX.Element;
    age: number;
    school: string;
    teams: string;
    exit_velocity: number;
    launch_angle: number;
    distance: number;
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
    title: "Batter Name",
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
    key: "exit_velocity",
    title: "Exit Velocity",
  },
  {
    key: "launch_angle",
    title: "Launch Angle",
  },
  {
    key: "distance",
    title: "Distance",
  },
  {
    key: "favorite",
    title: "Favorite",
  },
];

const Batting: React.FC<BattingProps> = ({ filters }) => {
  const history = useHistory();

  const [submitFavorite] =
    useMutation<SubscribeResponse, SubscribeData>(UPDATE_FAVORITE);

  const {
    loading: loadingProfiles,
    data,
    refetch,
  } = useQuery<LeaderBattingResponse, LeaderBattingFilters>(LEADER_BATTING, {
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
      ? data.leaderboard_batting.leaderboard_batting
      : ([] as LeaderBattingData[])
  ).map((obj, index) => {
    return {
      id: getId(),
      values: {
        rank: index + 1,
        name: (
          <LinkWrap>
            <ProfileLink onClick={() => onNavigate(obj.batter_datraks_id)}>
              {obj.batter_name}
            </ProfileLink>
          </LinkWrap>
        ),
        age: obj.age,
        school: obj.school?.name || "-",
        teams: obj.teams.map((item) => item.name).join(", "),
        exit_velocity: obj.exit_velocity,
        launch_angle: obj.launch_angle,
        distance: obj.distance,
        favorite: (
          <FavoriteIcon
            onClick={() => onSubscribe(obj.batter_datraks_id, obj.favorite)}
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

export default Batting;
