import React from "react";
import styled from "styled-components";
import avatarImage from "assets/images/user.png";
import {
  AgeIcon,
  BatsIcon,
  EditIcon,
  HeightIcon,
  SubscribeIcon,
  ThrowIcon,
  UnsubscribeIcon,
  WeightIcon,
} from "assets";
import { client, CURRENT_PROFILE, PROFILE } from "apollo";
import { UserData } from "lib/interfaces";
import { positions, schoolYear } from "lib/const";

const ProfileInfo: React.FC<{ onToggle(): void; id: string }> = ({
  onToggle,
  id,
}) => {
  const { profile: data } = client.readQuery<{ profile: UserData }>({
    query: PROFILE,
    variables: { id },
  }) || { profile: {} as UserData };

  const { current_profile } = client.readQuery<{ current_profile: UserData }>({
    query: CURRENT_PROFILE,
  }) || { current_profile: {} as UserData };

  return (
    <Wrap>
      <TopInfo>
        <UserPhoto image={data.avatar} />
        <UserName>{data.first_name + " " + data.last_name}</UserName>
        <Position mainTheme>
          {positions.find((item) => item.id === data.position)?.name}
        </Position>
        {data.position2 && (
          <Position>
            {positions.find((item) => item.id === data.position2)?.name}
          </Position>
        )}
        <Change onClick={onToggle}>
          {current_profile?.id === data.id ? (
            <EditIcon />
          ) : data.favorite ? (
            <UnsubscribeIcon />
          ) : (
            <SubscribeIcon />
          )}
        </Change>
      </TopInfo>

      <InfoWithIcon>
        <InfoWithIconName>
          <InfoIcon>
            <AgeIcon />
          </InfoIcon>
          <InfoWithIconText>Age</InfoWithIconText>
        </InfoWithIconName>
        <InfoWithIconText>{data.age}</InfoWithIconText>
      </InfoWithIcon>

      <InfoWithIcon>
        <InfoWithIconName>
          <InfoIcon>
            <HeightIcon />
          </InfoIcon>
          <InfoWithIconText>Height</InfoWithIconText>
        </InfoWithIconName>
        <InfoWithIconText>
          {data.feet + " ft " + (data.inches || "0") + " in"}
        </InfoWithIconText>
      </InfoWithIcon>

      <InfoWithIcon>
        <InfoWithIconName>
          <InfoIcon>
            <WeightIcon />
          </InfoIcon>
          <InfoWithIconText>Weight</InfoWithIconText>
        </InfoWithIconName>
        <InfoWithIconText>{data.weight + " lbs"}</InfoWithIconText>
      </InfoWithIcon>

      <InfoWithIcon>
        <InfoWithIconName>
          <InfoIcon>
            <ThrowIcon />
          </InfoIcon>
          <InfoWithIconText>Throws</InfoWithIconText>
        </InfoWithIconName>
        <InfoWithIconText>{data.throws_hand.toUpperCase()}</InfoWithIconText>
      </InfoWithIcon>

      <InfoWithIcon>
        <InfoWithIconName>
          <InfoIcon>
            <BatsIcon />
          </InfoIcon>
          <InfoWithIconText>Bats</InfoWithIconText>
        </InfoWithIconName>
        <InfoWithIconText>{data.bats_hand.toUpperCase()}</InfoWithIconText>
      </InfoWithIcon>

      {data.school && (
        <InfoWrap>
          <InfoTitle>School</InfoTitle>
          <InfoText>{data.school.name}</InfoText>
        </InfoWrap>
      )}

      {data.school_year && (
        <InfoWrap>
          <InfoTitle>School Year</InfoTitle>
          <InfoText>
            {schoolYear.find((item) => item.id === data.school_year)?.name}
          </InfoText>
        </InfoWrap>
      )}

      {data.teams?.length && (
        <InfoWrap>
          <InfoTitle>Team</InfoTitle>
          <InfoText>{data.teams.map((elem) => elem.name).join(", ")}</InfoText>
        </InfoWrap>
      )}

      {data.facilities?.length && (
        <InfoWrap>
          <InfoTitle>Facility</InfoTitle>
          <InfoText>
            {data.facilities.map((elem) => elem.u_name).join(", ")}
          </InfoText>
        </InfoWrap>
      )}

      {data.biography && (
        <InfoWrap>
          <TitleWrap>
            <Title>About</Title>
            <TitleLine />
          </TitleWrap>
          <InfoText>{data.biography}</InfoText>
        </InfoWrap>
      )}
    </Wrap>
  );
};

const maxWidth = 640;

const Wrap = styled.aside`
  position: relative;
  width: 298px;
  max-height: 100%;
  background: #ffffff;
  height: auto;
  display: flex;
  flex-direction: column;
  transition: all 0.1s;
  box-shadow: 0 2px 15px 0 rgb(0 0 0 / 10%);
  background: #fff;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  padding: 16px;
  overflow: auto;
  z-index: 5;

  @media (max-width: ${maxWidth + "px"}) {
    align-items: flex-start;
    padding: 5px;

    div {
      box-sizing: content-box;
    }
  }
`;

const InfoWrap = styled.div`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 11px;

  @media (max-width: ${maxWidth + "px"}) {
    width: auto;
    margin-right: 20px;
    padding: 0;
  }
`;

const InfoTitle = styled.span`
  font-size: 14px;
  line-height: 17px;
  font-weight: 300;
  color: #667784;
  margin-bottom: 3px;
  text-align: left;
  display: block;
`;

const InfoText = styled.span`
  font-size: 16px;
  color: #667784;
  word-wrap: break-word;
  display: block;
`;

const TopInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;

  @media (max-width: ${maxWidth + "px"}) {
    min-width: 200px;
    margin-right: 10px;
  }
`;

const Change = styled.div`
  position: absolute;
  top: 12px;
  right: 13px;
  padding: 0;
  cursor: pointer;
`;

const UserPhoto = styled.div<{ image: string }>`
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 50%;
  background-image: url(${({ image }) => (image ? image : avatarImage)});

  @media (max-width: ${maxWidth + "px"}) {
    width: 44px;
    height: 44px;
  }
`;

const UserName = styled.span`
  margin-top: 10px;
  font-size: 20px;
  line-height: 24px;
  color: #414f5a;
  word-wrap: break-word;
  word-break: break-all;
  text-align: center;
`;

const TitleWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0;

  @media (max-width: ${maxWidth + "px"}) {
    width: auto;
    margin: 0;
    margin-right: 20px;
    padding: 0;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 900;
  color: #414f5a;
  white-space: pre;
  background-color: #ffffff;
  padding-right: 12px;
`;

const TitleLine = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #e7ebef;
  border: none;

  @media (max-width: ${maxWidth + "px"}) {
    visibility: hidden;
  }
`;

const Position = styled.div<{ mainTheme?: boolean }>`
  font-size: 16px;
  line-height: 19px;
  color: #788b99;
  ${({ mainTheme }) => (!mainTheme ? "border-top: 1px solid #cbcccd" : "")};
`;

const InfoWithIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;

  @media (max-width: ${maxWidth + "px"}) {
    flex-direction: column;
    padding: 0;
    min-width: 75px;

    > div {
      flex-direction: column;
    }
  }
`;

const InfoWithIconText = styled.div`
  font-size: 1.6rem;

  @media (max-width: ${maxWidth + "px"}) {
    margin-bottom: 5px;
  }
`;

const InfoWithIconName = styled.div`
  display: flex;
  align-items: center;
`;

const InfoIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${maxWidth + "px"}) {
    margin-right: 0;
  }
`;

export default ProfileInfo;
