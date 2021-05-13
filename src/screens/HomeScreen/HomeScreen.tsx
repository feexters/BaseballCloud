import React from "react";
import { HomeRouter } from "routes";
import styled from "styled-components";
import bgImage from "assets/images/background-login.png";
import { Layout } from "layouts";

const HomeScreen = () => {
  return (
    <Wrap>
      <Layout>
        <Content>
          <HomeRouter />
        </Content>
      </Layout>
    </Wrap>
  );
};

const Wrap = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const Content = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: top center;
  background-image: url(${bgImage});
  background-size: cover;
`;

export default HomeScreen;
