import React from "react";
import { FieldRenderProps } from "react-final-form";
import styled from "styled-components";

type InputProps = FieldRenderProps<string, any>;

const InputLogin: React.FC<InputProps> = ({
  input,
  meta,
  ...rest
}: InputProps) => {
  return (
    <Wrap>
      <Input {...input} {...rest} />
      {meta.touched && meta.error && <ErrorValidation>{meta.error}</ErrorValidation>}
    </Wrap>
  );
};

const Input = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 4px;
  background-color: #eff1f3;
  padding: 6px 12px 10px 37px;
  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  color: #667784;
  border: 1px solid transparent;

  &:focus {
    background-color: white;
    border: 1px solid #48bbff;
    outline: none;
  }

  &:focus::placeholder {
    color: white;
  }

  ::placeholder {
    transition: color ease 0.5s;
  }
`;

const ErrorValidation = styled.span`
  font-size: 1.6rem;
  align-self: flex-start;
  color: #f05f62;
  margin-top: 8px;
`;
const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default InputLogin;
