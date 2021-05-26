import React, { useState } from "react";
import styled from "styled-components";
import { DropDown } from "ui";
import { BattingData } from "lib/interfaces";
import { ProfileSelect } from "./components";

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

const Comparison = () => {
  const [battingSelect, setBattingSelect] = useState(battingSelectValues[0]);
  const [firstBattingValues, setFirstBattingValues] = useState(
    [] as BattingData[]
  );
  const [secondBattingValues, setSecondBattingValues] = useState(
    [] as BattingData[]
  );

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
        <ProfilesSelectWrap>
          <ProfileSelect onSelect={setFirstBattingValues} />
          <ProfileSelect onSelect={setSecondBattingValues} />
        </ProfilesSelectWrap>
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
            {firstBattingValues &&
              findBattingValue(firstBattingValues, "Fastball", battingSelect)}
          </TableValue>
          <TableValue>
            {secondBattingValues &&
              findBattingValue(secondBattingValues, "Fastball", battingSelect)}
          </TableValue>
        </TableRow>
        <TableRow>
          <TableValue>Curveball</TableValue>
          <TableValue>
            {firstBattingValues &&
              findBattingValue(firstBattingValues, "Curveball", battingSelect)}
          </TableValue>
          <TableValue>
            {secondBattingValues &&
              findBattingValue(secondBattingValues, "Curveball", battingSelect)}
          </TableValue>
        </TableRow>
        <TableRow>
          <TableValue>Changeup</TableValue>
          <TableValue>
            {firstBattingValues &&
              findBattingValue(firstBattingValues, "Changeup", battingSelect)}
          </TableValue>
          <TableValue>
            {secondBattingValues &&
              findBattingValue(secondBattingValues, "Changeup", battingSelect)}
          </TableValue>
        </TableRow>
        <TableRow>
          <TableValue>Slider</TableValue>
          <TableValue>
            {firstBattingValues &&
              findBattingValue(firstBattingValues, "Slider", battingSelect)}
          </TableValue>
          <TableValue>
            {secondBattingValues &&
              findBattingValue(secondBattingValues, "Slider", battingSelect)}
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

const ProfilesSelectWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-auto-flow: column;
  row-gap: 25px;
  margin-bottom: 15px;
`;

const DropDownWrap = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;

export default Comparison;
