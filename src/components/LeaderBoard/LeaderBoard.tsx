import { LeaderBattingFilters } from "lib/interfaces";
import { toKeyType } from "lib/utils";
import React, { useState } from "react";
import styled from "styled-components";
import { DropDown, Search } from "ui";
import { Batting } from "./components";

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
const dateList = ["All", "Last Week", "Last Month"];
const leaderBoardRoutes = ["batting", "pitching"];
const battingTypes = ["Exit Velocity", "Carry Distance"];
const pitchingTypes = ["Pitch Velocity", "Spin Rate"];

const Network = () => {
  const [schoolSearch, setSchoolSearch] = useState("");
  const [teamSearch, setTeamSearch] = useState("");
  const [ageSearch, setAgeSearch] = useState<number | null>(null);
  const [positionSearch, setPositionSearch] = useState(positions[0]);
  const [favoriteSearch, setFavoriteSearch] = useState(favorite[0]);
  const [currentWindow, setCurrentWindow] = useState(leaderBoardRoutes[0]);
  const [selectType, setSelectType] = useState(battingTypes[0]);
  const [dateSearch, setDateSearch] = useState(dateList[0]);

  const filters: LeaderBattingFilters = {
    input: {
      school: schoolSearch,
      team: teamSearch,
      age: ageSearch,
      position:
        positionSearch === positions[0] ? "" : toKeyType(positionSearch),
      favorite: favoriteSearch === favorite[0] ? undefined : 1,
      date: toKeyType(dateSearch),
      type: toKeyType(selectType),
    },
  };

  const onSearchAge = (number: string) => {
    setAgeSearch(number ? Number(number) : null);
  };

  const onChangeWindow = (newWindow: string) => {
    if (currentWindow !== newWindow) {
      setCurrentWindow(newWindow);

      if (newWindow === leaderBoardRoutes[0]) {
        setSelectType(battingTypes[0]);
      } else {
        setSelectType(pitchingTypes[0]);
      }
    }
  };

  return (
    <Wrap>
      <Menu>
        <Title>Leaderboard</Title>
        <Settings>
          <SettingsPart>
            <SettingsItem>
              <DropDown items={dateList} onSelect={setDateSearch}>
                {dateSearch === dateList[0] ? "Date" : `Date: (${dateSearch})`}
              </DropDown>
            </SettingsItem>
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
          </SettingsPart>
          <SettingsPart>
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
            <SettingsItem></SettingsItem>
          </SettingsPart>
        </Settings>
      </Menu>
      <Menu>
        <Settings>
          <SettingsItem>
            <ButtonNav
              active={currentWindow === leaderBoardRoutes[0]}
              onClick={() => onChangeWindow(leaderBoardRoutes[0])}
            >
              Batting
            </ButtonNav>
          </SettingsItem>
          <ButtonNav
            active={currentWindow === leaderBoardRoutes[1]}
            onClick={() => onChangeWindow(leaderBoardRoutes[1])}
          >
            Pitching
          </ButtonNav>
        </Settings>
        <Settings>
          <SettingsItem>
            <DropDown
              items={
                currentWindow === leaderBoardRoutes[0]
                  ? battingTypes
                  : pitchingTypes
              }
              onSelect={setSelectType}
            >
              {selectType}
            </DropDown>
          </SettingsItem>
        </Settings>
      </Menu>
      <Batting filters={filters} />
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

const Title = styled.h1`
  font-size: 2.4rem;
  color: #667784;
  line-height: 1.25;
  font-weight: 400;
  text-align: center;
`;

const SettingsItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const ButtonNav = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: 2px solid #788b99;
  border-radius: 40px;
  background-color: ${({ active }) => (active ? "#788b99" : "white")};
  color: ${({ active }) => (active ? "white" : "#667784")};
  font-size: 14px;
  line-height: 17px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: rgba(120, 139, 153, 0.4);
  }
`;

export default Network;
