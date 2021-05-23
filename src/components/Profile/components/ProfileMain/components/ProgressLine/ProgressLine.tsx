import { ProgressIcon } from "assets";
import React from "react";
import styled from "styled-components";

interface ProgressLineProps {
  name: string;
  value: number;
  maxValue: number;
}

const ProgressLine: React.FC<ProgressLineProps> = ({name, value, maxValue}) => {
  return (
    <Progress>
      <ProgressName>
        <Text>{name}</Text>
        <ProgressValue>{value? value : 'N/A'}</ProgressValue>
      </ProgressName>
      <ProgressIconWrap>
        <ProgressIcon percent={Math.round(value/maxValue * 100)}/>
      </ProgressIconWrap>
    </Progress>
  );
};

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

export default ProgressLine;
