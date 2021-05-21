import React, { useEffect } from "react";
import styled from "styled-components";
import { Footer, Header } from "./components";
import { MainLoader } from "ui";
import { useQuery } from "@apollo/client";
import { CURRENT_PROFILE } from "apollo";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { Auth } from "lib/utils";
import { validateToken } from "store";

const Layout: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();

  const { headers, isValid, validationLoading } = useAppSelector(
    (state) => state.auth
  );

  const { loading } = useQuery(CURRENT_PROFILE, {
    skip: !isValid,
  });

  useEffect(() => {
    if (Auth.getHeaders()["access-token"]) {
      dispatch(validateToken());
    }
  }, [headers, dispatch]);

  return (
    <Wrap>
      <Header isLoading={loading} />
      {(loading || validationLoading) && Auth.getHeaders()["access-token"] ? (
        <MainLoader />
      ) : (
        children
      )}
      <Footer />
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

export default Layout;
