import { SearchIcon } from "assets";
import { BATTING_CHARTS, BATTING_LOG, BATTING_SUMMARY } from "lib/const";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
import { DropDown, Table } from "ui";
import { values } from "lodash";
import { getId } from "lib/utils";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Batting: React.FC<{ window: string }> = ({ window }) => {
  const pitchTypeValues = [
    "None",
    "Four Seam Fastball",
    "Two Seam Fastball",
    "Curveball",
    "ChangeUp",
    "Slider",
  ];

  const [pitchType, setPitchType] = useState(pitchTypeValues[0]);

  const onSearch = ({ search }: { search: string }) => {
    // dispatch(...)
  };

  const tableHeaders = [
    {
      key: 4,
      title: "Pitch Type",
    },
    {
      key: 1,
      title: "Distance",
    },
    {
      key: 3,
      title: "Launch Angle",
    },
    {
      key: 2,
      title: "Exit Velocity",
    },
  ];

  const responseValues = [
    {
      distance: 92.6,
      exit_velocity: 87.3,
      id: null,
      launch_angle: 3.4,
      pitch_type: "Fastball",
    },
  ];

  const tabValues = responseValues.map((obj) => {
    return { id: getId(), values: values(obj) };
  });

  const chartsOptions = {
    title: {
      text: `Rolling Exit Velocity for Some Name`,
      style: {
        color: "#333333",
        fontSize: "18px",
      },
    },

    subtitle: {
      text: "Average over last 2 batted balls",
      style: {
        color: "#666666",
        fontSize: "12px",
      },
    },

    chart: {
      events: {
        load() {
          Highcharts.charts.forEach((chart) => {
            if (chart) {
              setTimeout(chart.reflow.bind(this), 0);
            }
          });
        },
      },
    },

    yAxis: {
      title: {
        text: "Exit Velocity",
        style: {
          color: "#333333",
          fontSize: "12px",
        },
      },
    },

    xAxis: {
      tickInterval: 1,
    },

    tooltip: {
      valueSuffix: " mph",
      shared: true,
      style: {
        fontSize: "12px",
      },
      outside: false,
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 1,
      },
    },

    series: [
      {
        marker: {
          enabled: false,
        },
        name: "Exit Velocity",
        data: [98, 76],
      },
    ],
  };

  return (
    <>
      {window === BATTING_SUMMARY && (
        <>
          {/* <NoInfo>There's no info yet!</NoInfo> */}
          <ContentWrap>
            <TableWrap>
              <Title>Top Batting Values</Title>
              <Table titles={tableHeaders} values={tabValues} />
            </TableWrap>
            <TableWrap>
              <Title>Average Batting Values</Title>
              <Table titles={tableHeaders} values={tabValues} />
            </TableWrap>
          </ContentWrap>
        </>
      )}
      {window === BATTING_CHARTS && (
        <>
          <Menu>
            <MenuRow>
              <Title></Title>
              <DropDown items={pitchTypeValues} onSelect={setPitchType}>
                {pitchType === "None"
                  ? "Pitch Type"
                  : `Pitch Type (${pitchType})`}
              </DropDown>
            </MenuRow>
          </Menu>
          <HighchartsWrap>
            <HighchartsReact highcharts={Highcharts} options={chartsOptions} />
          </HighchartsWrap>
          {/* <NoInfo>There's no info yet!</NoInfo> */}
        </>
      )}
      {window === BATTING_LOG && (
        <>
          <Menu>
            <MenuRow>
              <Form
                onSubmit={onSearch}
                initialValues={{ search: "" }}
                render={({ form }) => (
                  <Field name="search">
                    {({ input }) => (
                      <SearchWrap>
                        <SearchIcon />
                        <SearchInput
                          {...input}
                          placeholder={"Search"}
                          autoComplete={"off"}
                        />
                      </SearchWrap>
                    )}
                  </Field>
                )}
              />
              <DropDown items={pitchTypeValues} onSelect={setPitchType}>
                {pitchType === "None"
                  ? "Pitch Type"
                  : `Pitch Type (${pitchType})`}
              </DropDown>
            </MenuRow>
            <MenuRow></MenuRow>
            <TableWrap>
              <Title>Batting Log</Title>
              <Table titles={tableHeaders} values={tabValues}>
                <Table titles={tableHeaders} values={tabValues} />
              </Table>
            </TableWrap>
          </Menu>

          <NoInfo>There's no info yet!</NoInfo>
        </>
      )}
    </>
  );
};

const NoInfo = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  min-height: 420px;
  color: #667784;
  font-size: 16px;
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

const HighchartsWrap = styled.div`
  display: block;
  width: 100%;
  margin-right: 10px;
`;

export default Batting;
