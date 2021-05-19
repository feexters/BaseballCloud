import React from "react";
import { Router } from "routers";
import styled from "styled-components";
import { Layout } from "layouts";
import { BrowserRouter } from "react-router-dom";

const Screen = () => {
  return (
    <BrowserRouter>
    <Wrap>
      <Layout>
          <Router />
      </Layout>
    </Wrap>
    </BrowserRouter>
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

export default Screen;
