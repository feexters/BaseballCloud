import { useQuery } from "@apollo/client";
import { BATTING_LOG } from "apollo";
import { SearchIcon } from "assets";
import { BattingLogData } from "lib/interfaces/batting-log-data";
import { BattingLogFilters } from "lib/interfaces/batting-log-filters";
import { getId } from "lib/utils";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
import { DropDown, Pagination, Table } from "ui";

const pitchTypeValues = [
  "None",
  "Four Seam Fastball",
  "Two Seam Fastball",
  "Curveball",
  "ChangeUp",
  "Slider",
];

const tableMainHeaders: { key: keyof BattingLogData; title: string }[] = [
  {
    key: "date",
    title: "Date",
  },
  {
    key: "pitcher_name",
    title: "Pitcher Name",
  },
  {
    key: "pitcher_handedness",
    title: "Pitcher Handedness",
  },
  {
    key: "pitch_type",
    title: "Pitcher Type",
  },
  {
    key: "pitch_call",
    title: "Pitcher Call",
  },
];

const tableInnerHeaders: { key: keyof BattingLogData; title: string }[] = [
  {
    key: "exit_velocity",
    title: "Exit Velocity",
  },
  {
    key: "launch_angle",
    title: "Launch Angle",
  },
  {
    key: "direction",
    title: "Direction",
  },
  {
    key: "hit_spin_rate",
    title: "Hit Spin Rate",
  },
  {
    key: "distance",
    title: "Distance",
  },
  {
    key: "hang_time",
    title: "Hang Time",
  },
];

interface BattingLogResponse {
  batting_log: {
    batting_log: BattingLogData[];
    total_count: number;
  };
}

const Log: React.FC<{ id: string }> = ({ id }) => {
  const [pitchType, setPitchType] = useState(pitchTypeValues[0]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const openNewPage = (page: number) => {
    setCurrentPage(page);
  };

  const onSearch = (search: string) => {
    setSearchValue(search);
    setCurrentPage(0)
  };

  const onSelect = (value: string) => {
    setCurrentPage(0);
    setPitchType(value)
  }

  const filters: BattingLogFilters = {
    count: 10,
    offset: currentPage * 10,
    profile_id: id,
    pitcher_name: searchValue,
    pitch_type: pitchType !== pitchTypeValues[0] ? pitchType : "",
  };

  const { loading, data } = useQuery<BattingLogResponse>(BATTING_LOG, {
    variables: { input: filters },
  });

  const { batting_log } = data ? data! : ({} as BattingLogResponse);
  const totalPages = data ? Math.floor(data.batting_log.total_count / 10) : 0;

  const responseValues = batting_log
    ? batting_log.batting_log
    : ([] as BattingLogData[]);

  const tabValues = responseValues.map((obj) => {
    return { id: getId(), values: obj };
  });

  return (
    <>
      <Menu>
        <MenuRow>
          <Form
            onSubmit={onSearch}
            initialValues={{ search: "" }}
            render={() => (
              <Field name="search">
                {({ input }) => (
                  <SearchWrap>
                    <SearchIcon />
                    <SearchInput
                      {...input}
                      onChange={(event) => {
                        input.onChange(event.target.value);
                        setSearchValue(event.target.value);
                        setCurrentPage(0)
                      }}
                      placeholder={"Search"}
                      autoComplete={"off"}
                    />
                  </SearchWrap>
                )}
              </Field>
            )}
          />
          <DropDown items={pitchTypeValues} onSelect={onSelect}>
            {pitchType === "None" ? "Pitch Type" : `Pitch Type (${pitchType})`}
          </DropDown>
        </MenuRow>
        <MenuRow></MenuRow>
      </Menu>

      <Title>Batting Log</Title>
      <TableWrap>
        <Table
          titles={tableMainHeaders}
          values={tabValues}
          loading={loading}
          innerTitles={tableInnerHeaders}
          minHeight='420px'
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
        {!loading && !batting_log?.total_count && <NoInfo>There's no info yet!</NoInfo>}
      </TableWrap>
    </>
  );
};

const NoInfo = styled.div`
  height: 100%;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667784;
  font-size: 16px;
`;

const PaginationWrap = styled.div`
  display: flex;
  align-self: center;
  margin-top: 10px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 5px;
`;

const TableWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 5px 5px 5px;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  color: #788b99;
  border: none;

  &:focus {
    outline: none;
  }
`;

const SearchWrap = styled.div`
  width: 100%;
  max-width: 250px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #48bbff;
`;

const Title = styled.div`
  line-height: 1.25;
  font-size: 18px;
  color: #414f5a;
  font-weight: 400;
  text-align: left;
`;

export default Log;
