import { ProgressIcon } from "assets";
import {
  BATTING,
  BATTING_CHARTS,
  BATTING_LOG,
  BATTING_SUMMARY,
  COMPARISON,
  SESSION,
} from "lib/const";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Batting, Comparison, SessionReports } from "./components";

const ProfileMain = () => {
  const [currentWindow, setCurrentWindow] = useState(BATTING);
  const [battingWindow, setBattingWindow] = useState(BATTING_SUMMARY);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  const onSelect = (value: string) => {
    setIsOpenDropDown(false);
    setBattingWindow(value);
  };

  const getWindow = useMemo(() => {
    if (currentWindow === BATTING) {
      return <Batting window={battingWindow} />;
    } else if (currentWindow === SESSION) {
      return <SessionReports />;
    } else {
      return <Comparison />;
    }
  }, [currentWindow, battingWindow]);

  return (
    <>
      <Wrap>
        <Title>Top Batting Values</Title>
        <ProgressWrap>
          <Progress>
            <ProgressName>
              <Text>Exit Velocity</Text>
              <ProgressValue>N/A</ProgressValue>
            </ProgressName>
            <ProgressIconWrap>
              <ProgressIcon />
            </ProgressIconWrap>
          </Progress>

          <Progress>
            <ProgressName>
              <Text>Carry Distance</Text>
              <ProgressValue>N/A</ProgressValue>
            </ProgressName>
            <ProgressIconWrap>
              <ProgressIcon />
            </ProgressIconWrap>
          </Progress>

          <Progress>
            <ProgressName>
              <Text>Launch Angle</Text>
              <ProgressValue>N/A</ProgressValue>
            </ProgressName>
            <ProgressIconWrap>
              <ProgressIcon />
            </ProgressIconWrap>
          </Progress>
        </ProgressWrap>
      </Wrap>

      <Wrap>
        <Title>Recent Session Reports</Title>
        <Text>No data currently linked to this profile</Text>
      </Wrap>

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
          <ButtonNav
            active={currentWindow === SESSION}
            onClick={() => setCurrentWindow(SESSION)}
          >
            Session Reports
          </ButtonNav>
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
  padding: 8px 16px;
  background: #fff;
  line-height: 1;
  color: #788b99;
  font-size: 16px;
  font-weight: 400;
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
  padding: 8px;
  margin: 8px;
  position: relative;
  border: 2px solid #788b99;
  border-radius: 40px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 700;
  background-color: ${({ active }) => (active ? "#788b99" : "white")};
  color: ${({ active }) => (active ? "white" : "#667784")};
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

const Progress = styled.div`
  display: flex;
  padding: 16px 24px 0 0;
  align-items: stretch;
  flex-direction: column;
`;

const ProgressWrap = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: ${maxWidth}) {
    flex-direction: column;
  }
`;

const ProgressName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProgressValue = styled.span`
  font-size: 16px;
  color: #667784;
  font-weight: 700;
`;

const ProgressIconWrap = styled.div`
  max-width: 100%;
  height: 4px;
  margin-top: 10px;
`;

export default ProfileMain;