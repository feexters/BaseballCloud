import { useMutation, useQuery } from "@apollo/client";
import { PROFILES } from "apollo";
import { UPDATE_FAVORITE } from "apollo/mutations";
import { SearchIcon } from "assets";
import {
  ProfilesData,
  ProfilesFilters,
  ProfilesResponseData,
  SubscribeData,
  SubscribeResponse,
} from "lib/interfaces";
import { getId, toKeyType } from "lib/utils";
import React, { useState } from "react";
import { toastr } from "react-redux-toastr";
import { useHistory } from "react-router";
import styled from "styled-components";
import { DropDown, Pagination, Search, Table } from "ui";
import { toastrSubscribeOption } from "ui/Toastr/Toastr";

interface TableData {
  id: string;
  values: {
    name: JSX.Element;
    sessions: number | string;
    school: string;
    teams: string;
    age: number;
    favorite: JSX.Element;
  };
}

const tableHeaders: { key: keyof TableData["values"]; title: string }[] = [
  {
    key: "name",
    title: "Player Name",
  },
  {
    key: "sessions",
    title: "Sessions",
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
    key: "age",
    title: "Age",
  },
  {
    key: "favorite",
    title: "Favorite",
  },
];

const positions = [
  "All",
  "Catcher",
  "First Base",
  "Second Base",
  "Third Base",
  "Outfield",
  "Pitcher",
];

const favorite = ["All", "Favorite"];
const countProfiles = ["10", "15", "25"];

const Network = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [schoolSearch, setSchoolSearch] = useState("");
  const [teamSearch, setTeamSearch] = useState("");
  const [ageSearch, setAgeSearch] = useState<number | null>(null);
  const [nameSearch, setNameSearch] = useState("");
  const [positionSearch, setPositionSearch] = useState(positions[0]);
  const [favoriteSearch, setFavoriteSearch] = useState(favorite[0]);
  const [showValues, setShowValues] = useState(10);

  const history = useHistory();

  const [submitFavorite] =
    useMutation<SubscribeResponse, SubscribeData>(UPDATE_FAVORITE);

  const filters: ProfilesFilters = {
    input: {
      offset: currentPage * showValues,
      profiles_count: showValues,
      school: schoolSearch,
      team: teamSearch,
      age: ageSearch,
      player_name: nameSearch,
      position:
        positionSearch === positions[0] ? "" : toKeyType(positionSearch),
      favorite: favoriteSearch === favorite[0] ? undefined : 1,
    },
  };

  const {
    loading: loadingProfiles,
    data,
    refetch,
  } = useQuery<ProfilesResponseData, ProfilesFilters>(PROFILES, {
    variables: filters,
  });

  const totalPages = data
    ? Math.floor(data.profiles.total_count / showValues)
    : 0;

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
    data ? data.profiles.profiles : ([] as ProfilesData[])
  ).map((obj) => {
    return {
      id: getId(),
      values: {
        name: (
          <LinkWrap>
            <ProfileLink onClick={() => onNavigate(obj.id)}>
              {obj.first_name + " " + obj.last_name}
            </ProfileLink>
          </LinkWrap>
        ),
        age: obj.age,
        school: obj.school?.name || "-",
        teams: obj.teams.map((item) => item.name).join(", "),
        sessions: obj.events.length || "-",
        favorite: (
          <FavoriteIcon
            onClick={() => onSubscribe(obj.id, obj.favorite)}
            className={`${obj.favorite ? "fas" : "far"} fa-heart`}
          />
        ),
      },
    };
  });

  const openNewPage = (page: number) => {
    setCurrentPage(page);
  };

  const onSearchAge = (number: string) => {
    setAgeSearch(number ? Number(number) : null);
  };

  const onSelectShowValues = (number: string) => {
    setShowValues(Number(number));
  };

  return (
    <Wrap>
      <Menu>
        <Title>Network</Title>
        <Settings>
          <SettingsPart>
            <SettingsItem>
              <Search onChange={setSchoolSearch} placeholder="School" />
            </SettingsItem>
            <SettingsItem>
              <Search
                onChange={setTeamSearch}
                placeholder="Team"
                width="40px"
              />
            </SettingsItem>
            <SettingsItem>
              <DropDown
                items={positions}
                onSelect={setPositionSearch}
                isArrow={false}
                width="120px"
                height="200px"
              >
                {positionSearch === positions[0] ? "Position" : positionSearch}
              </DropDown>
            </SettingsItem>
          </SettingsPart>
          <SettingsPart>
            <SettingsItem>
              <Search
                onChange={onSearchAge}
                placeholder="Age"
                type="number"
                maxWidth="60px"
                width="30px"
              />
            </SettingsItem>
            <SettingsItem>
              <DropDown
                items={favorite}
                onSelect={setFavoriteSearch}
                isArrow={false}
                width="120px"
              >
                {favoriteSearch}
              </DropDown>
            </SettingsItem>
            <SettingsItem>
              <DropDown
                items={countProfiles}
                onSelect={onSelectShowValues}
                isArrow={false}
                width="120px"
              >
                Show: {showValues}
              </DropDown>
            </SettingsItem>
          </SettingsPart>
        </Settings>
      </Menu>
      <Menu>
        <Subtitle>
          Available Players{" "}
          {`(${data?.profiles.total_count ? data.profiles.total_count : "-"})`}
        </Subtitle>
        <Settings>
          <SearchPlayer>
            <SearchIconWrap>
              <SearchIcon />
            </SearchIconWrap>
            <Input
              onChange={(event) => setNameSearch(event.target.value)}
              placeholder="Player Name"
            />
          </SearchPlayer>
        </Settings>
      </Menu>
      <TableWrap>
        <Table
          titles={tableHeaders}
          values={tabValues}
          loading={loadingProfiles}
          minHeight="420px"
        />
        {totalPages !== 0 && (
          <PaginationWrap>
            <Pagination
              maxPages={totalPages + 1}
              onChange={openNewPage}
              current={currentPage}
            />
          </PaginationWrap>
        )}
      </TableWrap>
      {tabValues.length === 0 && !loadingProfiles && (
        <NoInfo>There's no info yet!</NoInfo>
      )}
    </Wrap>
  );
};

const maxWidth = "640px";

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 16px;

  @media (max-width: ${maxWidth}) {
    flex-direction: column;
  }
`;

const FavoriteIcon = styled.i`
  font-size: 1.4rem;
  color: rgb(72, 187, 255);
  cursor: pointer;
`;

const Settings = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: ${maxWidth}) {
    flex-direction: column;
  }
`;

const SettingsPart = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const TableWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const PaginationWrap = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  align-self: center;
  margin-top: 30px;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  color: #667784;
  line-height: 1.25;
  font-weight: 400;
  text-align: center;
`;

const Subtitle = styled.h3`
  font-size: 1.8rem;
  color: #414f5a;
  line-height: 1.25;
  font-weight: 400;
  text-align: left;
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

const SettingsItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const Input = styled.input`
  width: 130px;
  padding: 5px 5px 5px 24px;
  font-size: 1.6rem;
  line-height: 19px;
  font-weight: 400;
  color: #788b99;
  border: none;
  border-bottom: 1px solid #48bbff;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: rgba(102, 119, 132, 0.5);
  }
`;

const SearchPlayer = styled.div`
  display: flex;
  position: relative;
`;
const SearchIconWrap = styled.div`
  padding: 0;
  position: absolute;
  top: 7px;
  left: 0;
  bottom: 0;
  z-index: 1;
`;

export default Network;
