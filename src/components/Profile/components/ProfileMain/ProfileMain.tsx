import {
  BATTING,
  BATTING_CHARTS,
  BATTING_LOG,
  BATTING_SUMMARY,
  COMPARISON,
  SESSION,
} from "lib/const";
import {
  BATTING_SUMMARY as BATTING_QUERY,
  client,
  CURRENT_PROFILE,
} from "apollo";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Batting, Comparison, SessionReports } from "./components";
import { ProgressLine } from "./components";
import { BattingSummaryData, UserData } from "lib/interfaces";

const ProfileMain: React.FC<{ id: string }> = ({ id }) => {
  const [currentWindow, setCurrentWindow] = useState(BATTING);
  const [battingWindow, setBattingWindow] = useState(BATTING_SUMMARY);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  const {
    batting_summary: { top_values },
  } = client.readQuery({ query: BATTING_QUERY, variables: { id: id } }) as {
    batting_summary: BattingSummaryData;
  };

  const { current_profile } = client.readQuery<{ current_profile: UserData }>({
    query: CURRENT_PROFILE,
  }) || { current_profile: {} as UserData };

  const onSelect = (value: string) => {
    setIsOpenDropDown(false);
    setBattingWindow(value);
  };

  const getWindow = useMemo(() => {
    if (currentWindow === BATTING) {
      return <Batting window={battingWindow} id={id} />;
    } else if (currentWindow === SESSION) {
      return <SessionReports id={id} />;
    } else {
      return <Comparison id={id} />;
    }
  }, [currentWindow, battingWindow, id]);

  return (
    <>
      <Wrap>
        <Title>Top Batting Values</Title>
        <ProgressWrap>
          <ProgressLine
            name="Exit Velocity"
            value={top_values.length ? top_values[0].exit_velocity : 0}
            maxValue={150}
          />
          <ProgressLine
            name="Distance"
            value={top_values.length ? top_values[0].distance : 0}
            maxValue={500}
          />
          <ProgressLine
            name="Launch Angle"
            value={top_values.length ? top_values[0].launch_angle : 0}
            maxValue={50}
          />
        </ProgressWrap>
      </Wrap>

      {current_profile.id === id && (
        <Wrap>
          <Title>Recent Session Reports</Title>
          <Text>No data currently linked to this profile</Text>
        </Wrap>
      )}

      <Wrap>
        <ButtonList>
          <ButtonNav
            active={currentWindow === BATTING}
            onClick={() => setCurrentWindow(BATTING)}
            onMouseEnter={() => setIsOpenDropDown(true)}
            onMouseLeave={() => setIsOpenDropDown(false)}
          >
            Batting
            {isOpenDropDown && (
              <DropDownWrap
                onMouseEnter={() => setIsOpenDropDown(true)}
                onMouseLeave={() => setIsOpenDropDown(false)}
              >
                <DropDown>
                  <Select onClick={() => onSelect(BATTING_SUMMARY)}>
                    Summary
                  </Select>
                  <Select onClick={() => onSelect(BATTING_CHARTS)}>
                    Charts
                  </Select>
                  <Select onClick={() => onSelect(BATTING_LOG)}>Log</Select>
                </DropDown>
              </DropDownWrap>
            )}
          </ButtonNav>
          {current_profile.id === id && (
            <ButtonNav
              active={currentWindow === SESSION}
              onClick={() => setCurrentWindow(SESSION)}
            >
              Session Reports
            </ButtonNav>
          )}
          <ButtonNav
            active={currentWindow === COMPARISON}
            onClick={() => setCurrentWindow(COMPARISON)}
          >
            Comparison
          </ButtonNav>
        </ButtonList>

        {getWindow}
      </Wrap>
    </>
  );
};

const maxWidth = "640px";

const Wrap = styled.div`
  background: #fff;
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-sizing: border-box;
`;

const DropDown = styled.div`
  width: 100%;
  position: relative;
  top: 5px;
  box-shadow: 0 3px 8px 0 rgb(0 0 0 / 15%);
  border: solid 1px #ebebeb;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0;
  border-radius: 5px;
  z-index: 5;
`;

const DropDownWrap = styled.div`
  width: 178px;
  position: absolute;
  top: 100%;
  left: -10px;
`;

const Select = styled.div`
  width: 100%;
  padding: 8px 16px;
  background: #fff;
  line-height: 1;
  color: #788b99;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: rgba(72, 187, 255, 0.1);
  }
`;

const ButtonList = styled.div`
  margin: 0;
  padding: 0;
  box-shadow: unset;
  display: flex;
  justify-content: flex-start;
`;

const ButtonNav = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 8px;
  margin: 8px;
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

const Title = styled.h1`
  display: block;
  font-size: 18px;
  line-height: 1.25;
  font-weight: 900;
  color: #414f5a;
`;

const Text = styled.p`
  display: block;
  color: #667784;
  font-size: 16px;
`;

const ProgressWrap = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: ${maxWidth}) {
    flex-direction: column;
  }
`;

export default ProfileMain;
