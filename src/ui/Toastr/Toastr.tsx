import React from "react";
import ReduxToastr from "react-redux-toastr";
import styled from "styled-components";

const Toastr = () => {
  return (
    <Wrap>
      <ReduxToastr
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        // getState={(state) => state.toastr} // This is the default
        transitionIn="bounceIn"
        transitionOut="bounceOut"
        progressBar
        closeOnToastrClick
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  * {
    font-size: 1.8rem;
    color: rgba(255, 255, 255, 0.6);
  }
`;

const ToastrMessage = styled.span`
  display: block;
  font-size: 1.4rem;
  font-weight: 400;
  color: white;
`;

const ToastrTitle = styled.span`
  display: block;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: white;
`;

export const toastrProfileOptions = {
  timeOut: 3000,
  component: (
    <div>
      <ToastrTitle>Success</ToastrTitle>
      <ToastrMessage>Profile has been updated successfully.</ToastrMessage>
    </div>
  ),
};

export default Toastr;
