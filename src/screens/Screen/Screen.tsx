import React from "react";
import { Router } from "routers";
import { Layout } from "layouts";
import { BrowserRouter } from "react-router-dom";

const Screen = () => {
  return (
    <BrowserRouter>
      <Layout>
          <Router />
      </Layout>
    </BrowserRouter>
  );
};

export default Screen;
