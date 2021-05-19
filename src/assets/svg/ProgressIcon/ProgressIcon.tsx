import React from "react";
import styled from "styled-components";

const ProgressIcon = () => {
  return (
    <Svg viewBox="0 0 100 1" preserveAspectRatio="none">
      <path
        d="M 0.5,0.5
           L 99.5,0.5"
        strokeLinecap="round"
        stroke="#eff1f3"
        strokeWidth="1"
        fillOpacity="0"
      ></path>
      <Path
        d="M 0.5,0.5
           L 99.5,0.5"
        strokeLinecap="round"
        stroke="#ffd01a"
        strokeWidth="1"
        fillOpacity="0"
      ></Path>
    </Svg>
  );
};

const Path = styled.path`
  stroke-dasharray: 0px, 100px;
  stroke-dashoffset: 0px;
  transition: stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s,
    stroke 0.3s linear 0s, 0.06s;
`;

const Svg = styled.svg`
  height: 100%;
  width: 100%;
  vertical-align: top;
`;

export default ProgressIcon;
