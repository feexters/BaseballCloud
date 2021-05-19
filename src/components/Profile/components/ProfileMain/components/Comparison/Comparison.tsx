import { useAppSelector } from "lib/hooks";
import React, { useState } from "react";
import styled from "styled-components";
import avatarImage from "assets/images/user.png";
import { DropDown, DropDownPanel } from "ui";
import { Field, Form } from "react-final-form";
import { SearchIcon } from "assets";

const Comparison = () => {
  const battingSelectValues = ["Distance", "LaunchAngle", "Exit Velocity"];

  const { user } = useAppSelector((state) => state);

  const [battingSelect, setBattingSelect] = useState(battingSelectValues[0]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const players = [
    { id: "0", value: "sdsc" },
    { id: "1", value: "sdscvdfevfd" },
    { id: "2", value: "vfev" },
  ];

  const onCloseDropDown = () => {
    setTimeout(() => setIsDropDownOpen(false), 250)
  }

  const onSelect = (id: string) => {
    setSelectedPlayer(id);
  };

  return (
    <>
      <ComparisonWrap>
        <ComparisonRow>
          <ComparisonColumn>
            <PlayerAvatar image={user.data.avatar} />{" "}
            {user.data.first_name + " " + user.data.last_name}
          </ComparisonColumn>
          <ComparisonColumn>
            <PlayerAvatar image={user.data.avatar} />{" "}
            <Form
              onSubmit={() => {
                console.log("submit");
              }}
              initialValues={{ search: "" }}
              render={({ form }) => (
                <Field name="search">
                  {({ input }) => (
                    <SearchWrap>
                      <SearchInput
                        {...input}
                        onBlur={onCloseDropDown}
                        onFocus={() => setIsDropDownOpen(true)}
                        placeholder={"Enter player name"}
                        autoComplete={"off"}
                      />
                      <DropDownPanel
                        isOpen={isDropDownOpen}
                        items={players}
                        onSelect={onSelect}
                        active={selectedPlayer}
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
          <ComparisonColumn>Age:&nbsp;&nbsp;{user.data.age}</ComparisonColumn>
          <ComparisonColumn>Age:&nbsp;&nbsp;</ComparisonColumn>
        </ComparisonRow>
        <ComparisonRow>
          <ComparisonColumn>
            Height:&nbsp;&nbsp;
            {user.data.feet + " ft " + (user.data.inches || "0") + " in"}
          </ComparisonColumn>
          <ComparisonColumn>Height:&nbsp;&nbsp;</ComparisonColumn>
        </ComparisonRow>
        <ComparisonRow>
          <ComparisonColumn>
            Weight:&nbsp;&nbsp;{user.data.weight + " lbs"}
          </ComparisonColumn>
          <ComparisonColumn>Weight:&nbsp;&nbsp;</ComparisonColumn>
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
          <TableValue>-</TableValue>
          <TableValue>-</TableValue>
        </TableRow>
        <TableRow>
          <TableValue>Curveball</TableValue>
          <TableValue>-</TableValue>
          <TableValue>-</TableValue>
        </TableRow>
        <TableRow>
          <TableValue>Changeup</TableValue>
          <TableValue>-</TableValue>
          <TableValue>-</TableValue>
        </TableRow>
        <TableRow>
          <TableValue>Slider</TableValue>
          <TableValue>-</TableValue>
          <TableValue>-</TableValue>
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
