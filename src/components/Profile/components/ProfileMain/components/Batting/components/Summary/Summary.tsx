import { useQuery } from "@apollo/client";
import { BATTING_SUMMARY } from "apollo";
import { BattingData, BattingSummaryData } from "lib/interfaces";
import { getId } from "lib/utils";
import React from "react";
import styled from "styled-components";
import { MainLoader, Table } from "ui";

const tableHeaders: {key: keyof BattingData, title: string}[] = [
  {
    key: 'pitch_type',
    title: "Pitch Type",
  },
  {
    key: 'distance',
    title: "Distance",
  },
  {
    key: 'launch_angle',
    title: "Launch Angle",
  },
  {
    key: 'exit_velocity',
    title: "Exit Velocity",
  },
];

const Summary: React.FC<{ id: string }> = ({ id }) => {
  const { loading, data } = useQuery(BATTING_SUMMARY, {
    variables: { id },
  });

  if (loading) {
    return <MainLoader />;
  }

  const {
    batting_summary: { top_values, average_values },
  } = data as { batting_summary: BattingSummaryData };

  const topTableValues = top_values.map((obj) => {
    return { id: getId(), values: obj };
  });

  const averageTableValues = average_values.map((obj) => {
    return { id: getId(), values: obj };
  });

  return (
    <>
      {average_values.length && top_values.length ? (
        <ContentWrap>
          <TableWrap>
            <Title>Top Batting Values</Title>
            <Table titles={tableHeaders} values={topTableValues} />
          </TableWrap>
          <TableWrap>
            <Title>Average Batting Values</Title>
            <Table titles={tableHeaders} values={averageTableValues} />
          </TableWrap>
        </ContentWrap>
      ) : (
        <NoInfo>There's no info yet!</NoInfo>
      )}
    </>
  );
};

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const Title = styled.div`
  line-height: 1.25;
  font-size: 18px;
  color: #414f5a;
  font-weight: 400;
  text-align: left;
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

export default Summary;
