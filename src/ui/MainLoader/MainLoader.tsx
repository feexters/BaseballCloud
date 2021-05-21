import React from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

const MainLoader = () => {
  return (
    <Wrap>
      <Loader type="ThreeDots" color="#48BBFF" width={60} />
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default MainLoader;
