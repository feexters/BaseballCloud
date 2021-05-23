import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styled from "styled-components";
import { DropDown, MainLoader } from "ui";
import { useQuery } from "@apollo/client";
import { BATTING_GRAPH } from "apollo";
import { BattingGraphFilter } from "lib/interfaces/batting-graph-filter";

const pitchTypeValues = [
  "None",
  "Four Seam Fastball",
  "Two Seam Fastball",
  "Curveball",
  "ChangeUp",
  "Slider",
];

interface GraphResponse {
  batting_graph: {
    graph_rows: number[];
  };
}

const Charts: React.FC<{ id: string }> = ({ id }) => {
  const [pitchType, setPitchType] = useState(pitchTypeValues[0]);

  const filters = {
    profile_id: id,
    pitch_type: pitchType !== pitchTypeValues[0] ? pitchType : "",
  } as BattingGraphFilter;

  const { loading, data } = useQuery<GraphResponse>(BATTING_GRAPH, {
    variables: { input: filters },
  });

  if (loading) {
    return <MainLoader />;
  }

  const { batting_graph } = data!;

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
        data: batting_graph.graph_rows,
      },
    ],
  };

  return (
    <>
      <Menu>
        <MenuRow>
          <span></span>
          <DropDown items={pitchTypeValues} onSelect={setPitchType}>
            {pitchType === "None" ? "Pitch Type" : `Pitch Type (${pitchType})`}
          </DropDown>
        </MenuRow>
      </Menu>
      {batting_graph.graph_rows.length ? (
        <HighchartsWrap>
          <HighchartsReact highcharts={Highcharts} options={chartsOptions} />
        </HighchartsWrap>
      ) : (
        <NoInfo>There's no info yet!</NoInfo>
      )}
    </>
  );
};

const HighchartsWrap = styled.div`
  display: block;
  width: 100%;
  margin-right: 10px;
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

const NoInfo = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  min-height: 420px;
  color: #667784;
  font-size: 16px;
`;

export default Charts;
