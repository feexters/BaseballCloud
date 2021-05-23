import { useQuery } from "@apollo/client";
import { PROFILE_EVENTS } from "apollo/queries/profile-events";
import {
  EventData,
  ProfileEventsFilters,
  ProfileEventsResponse,
} from "lib/interfaces";
import { dateFormat, getId } from "lib/utils";
import React, { useState } from "react";
import styled from "styled-components";
import { DropDown, Pagination, Table } from "ui";
import { DateSelect } from "ui/DateSelect";

const tableHeaders: { key: keyof EventData; title: string }[] = [
  {
    key: "date",
    title: "Date",
  },
  {
    key: "event_type",
    title: "Type",
  },
  {
    key: "event_name",
    title: "Name",
  },
  {
    key: "id",
    title: "Purchased",
  },
];

const typeSelectValues = ["None", "Game", "Practice"];

const SessionReports: React.FC<{ id: string }> = ({ id }) => {
  const [typeSelect, setTypeSelect] = useState(typeSelectValues[0]);
  const [selectDate, setSelectDate] = useState<Date | null | undefined>(
    new Date()
  );
  const [isDateSelect, setIsDateSelect] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const filters: ProfileEventsFilters = {
    count: 10,
    offset: currentPage * 10,
    profile_id: id,
    event_type: typeSelect !== typeSelectValues[0] ? typeSelect : "",
    date: isDateSelect ? dateFormat(selectDate) : '',
  };

  const { loading: loadingEvents, data } = useQuery<ProfileEventsResponse>(
    PROFILE_EVENTS,
    {
      variables: { input: filters },
    }
  );

  const { profile_events } = data ? data! : ({} as ProfileEventsResponse);
  const totalPages = data
    ? Math.floor(data.profile_events.total_count / 10)
    : 0;

  const responseValues = profile_events
    ? profile_events.events
    : ([] as EventData[]);

  const tabValues = responseValues.map((obj) => {
    return { id: getId(), values: obj };
  });

  const onSelect = (value: string) => {
    setCurrentPage(0);
    setTypeSelect(value);
  };

  const openNewPage = (page: number) => {
    setCurrentPage(page);
  };

  const onSelectData = (date: Date | [Date, Date] | null) => {
    setIsDateSelect(true);
    setSelectDate(date as Date | null | undefined);
  };

  const onClear = () => {
    setIsDateSelect(false);
    setTypeSelect(typeSelectValues[0]);
    setSelectDate(new Date());
  };

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
              <DateSelect
                date={selectDate}
                setDate={onSelectData}
                isSelect={isDateSelect}
              />
            </SettingsItemWrap>

            <DropDown items={typeSelectValues} onSelect={onSelect}>
              {typeSelect === "None" ? "Type" : `Type (${typeSelect})`}
            </DropDown>
          </Settings>
        </MenuRow>
      </Menu>
      <TableWrap>
        <Table
          titles={tableHeaders}
          values={tabValues}
          loading={loadingEvents}
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
      {tabValues.length === 0 && (
        <NoInfo>The player haven't had any sessions yet!</NoInfo>
      )}
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

const PaginationWrap = styled.div`
  display: flex;
  align-self: center;
  margin-top: 10px;
`;

const Settings = styled.div`
  display: flex;
`;

const SettingsItemWrap = styled.div`
  margin-right: 20px;
`;

const MenuRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 5px;
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
  align-items: center;
  margin-top: 15px;
  margin-bottom: 10px;
`;

export default SessionReports;
