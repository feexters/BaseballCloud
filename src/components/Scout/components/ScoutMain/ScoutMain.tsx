import { client, CURRENT_PROFILE } from "apollo";
import styled from "styled-components";
import { Comparison } from "./components";
import { UserData } from "lib/interfaces";

const ScoutMain: React.FC<{ id: string }> = ({ id }) => {
  const { current_profile } = client.readQuery<{ current_profile: UserData }>({
    query: CURRENT_PROFILE,
  }) || { current_profile: {} as UserData };

  return (
    <>
      {current_profile?.id === id && (
        <Wrap>
          <Title>Recent Session Reports</Title>
          <Text>No data currently linked to this profile</Text>
        </Wrap>
      )}

      <Wrap>
        <Comparison id={id} />
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  background: #fff;
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  display: block;
  font-size: 18px;
  line-height: 1.25;
  font-weight: 900;
  color: #414f5a;
`;

const Text = styled.p`
  display: block;
  color: #667784;
  font-size: 16px;
`;

export default ScoutMain;
