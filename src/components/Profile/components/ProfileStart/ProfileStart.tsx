import { ArrowAccountIcon } from "assets";
import React from "react";
import styled from "styled-components";

const ProfileStart = () => {
  return (
    <StartWindow>
      <YourAccount>
        <ArrowAccountIcon />
        <YourAccountTitle>Your Account</YourAccountTitle>
        <YourAccountText>
          Changing your profile options lets you control how others see you and
          your profile. These settings include things like your name, personal
          info and school.
        </YourAccountText>
      </YourAccount>
    </StartWindow>
  );
};


const StartWindow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 570px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 2px 15px 0 rgb(0 0 0 / 10%);
`;

const YourAccount = styled.div`
  max-width: 420px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const YourAccountTitle = styled.h1`
  line-height: 1.25;
  font-weight: 400;
  text-align: center;
  color: #667784;
  font-size: 32px;
  font-weight: 700;
  margin-top: 17px;
  margin-bottom: 16px;
`;
const YourAccountText = styled.p`
  font-size: 16px;
  color: #667784;
  text-align: center;
`;

export default ProfileStart;
