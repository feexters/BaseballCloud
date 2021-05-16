import React from "react";
import { HomeRouter } from "routes";
import styled from "styled-components";
import { Layout } from "layouts";

const HomeScreen = () => {
  return (
    <Wrap>
      <Layout>
          <HomeRouter />
      </Layout>
    </Wrap>
  );
};

const Wrap = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;

  @media (max-width: 640px) {
    height: auto;
  }
`;

export default HomeScreen;
