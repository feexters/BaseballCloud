import React, { useState } from "react";
import styled from "styled-components";
import { DropDown, Table } from "ui";
import { DateSelect } from "ui/DateSelect";

const SessionReports = () => {
  const typeSelectValues = ["None", "Game", "Practice"];

  const [typeSelect, setTypeSelect] = useState(typeSelectValues[0]);
  const [selectDate, setSelectDate] = useState<Date | null | undefined>(
    new Date()
  );
  const [isDateSelect, setIsDateSelect] = useState(false)

  const onSelectData = (date: Date | [Date, Date] | null) => {
    setIsDateSelect(true)
    setSelectDate(date as Date | null | undefined);
  };

  const onClear = () => {
    setIsDateSelect(false)
    setTypeSelect(typeSelectValues[0])
    setSelectDate(new Date())
  }

  const tableHeaders = [
    {
      key: 1,
      title: "Date",
    },
    {
      key: 2,
      title: "Type",
    },
    {
      key: 3,
      title: "Name",
    },
    {
      key: 4,
      title: "Purchased",
    },
  ];

  const tabValues = [] as { id: string | number; values: string[] }[];

  return (
    <>
      <Menu>
        <MenuRow>
          <Title>Session</Title>
          <Settings>
            <SettingsItemWrap>
              <SettingText onClick={onClear}>Clear Filters</SettingText>
            </SettingsItemWrap>

            <SettingsItemWrap>
              <DateSelect date={selectDate} setDate={onSelectData} isSelect={isDateSelect} />
            </SettingsItemWrap>
            
            <DropDown items={typeSelectValues} onSelect={setTypeSelect}>
              {typeSelect === "None" ? "Type" : `Type (${typeSelect})`}
            </DropDown>
          </Settings>
        </MenuRow>
      </Menu>
      <TableWrap>
        <Table titles={tableHeaders} values={tabValues} />
      </TableWrap>
      {tabValues.length === 0 && <NoInfo>The player haven't had any sessions yet!</NoInfo>}
    </>
  );
};

const Menu = styled.div`
  display: flex;
  flex-direction: column;
`;

const SettingText = styled.span`
  font-size: 16px;
  line-height: 1.19;
  color: #48bbff;
  white-space: nowrap;
  margin-left: 5px;
  cursor: pointer;
`;

const Settings = styled.div`
  display: flex;
`;

const SettingsItemWrap = styled.div`
  margin-right: 20px;
`

const MenuRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 5px;
`;

const NoInfo = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  min-height: 420px;
  color: #667784;
  font-size: 16px;
`;

const Title = styled.div`
  line-height: 1.25;
  font-size: 18px;
  color: #414f5a;
  font-weight: 400;
  text-align: left;
`;

const TableWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 10px;
`;

export default SessionReports;
