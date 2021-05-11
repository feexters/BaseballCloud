import { Login } from 'components/Login';
import React from 'react';
import { Header } from 'components/Header';
import styled from 'styled-components';
import { Footer } from 'components/Footer';

function App() {
  return (
    <Wrap>
      <Header />
      <Login />
      <Footer />
    </Wrap>
  );
}

const Wrap = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto; 
`

export default App;
