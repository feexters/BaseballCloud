import { BATTING_CHARTS, BATTING_LOG, BATTING_SUMMARY } from "lib/const";
import React from "react";
import { Charts, Log, Summary } from "./components";

const Batting: React.FC<{ window: string, id: string }> = ({ window, id }) => {
  return (
    <>
      {window === BATTING_SUMMARY && <Summary id={id} />}
      {window === BATTING_CHARTS && <Charts id={id} />}
      {window === BATTING_LOG && <Log id={id} />}
    </>
  );
};

export default Batting;
