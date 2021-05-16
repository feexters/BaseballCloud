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
      <Input id={input.name} {...input} {...rest} />
      <Label htmlFor={input.name}>{rest.placeholder}</Label>
      {meta.touched && meta.error && (
        <ErrorValidation>{meta.error}</ErrorValidation>
      )}
    </Wrap>
  );
};

const Input = styled.input`
  height: 40px;
  padding: 0 16px;
  touch-action: manipulation;
  width: 100%;
  border-radius: 4px;
  background-color: #eff1f3;
  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  color: #667784;
  border: 1px solid transparent;

  &:focus {
    background-color: white;
    border: 1px solid #48bbff;
    outline: none;

    & + label {
      transform: translate(-16px, -8px) scale(1.15);
      visibility: visible;
    }
  }

  &:focus::placeholder {
    color: white;
  }

  ::placeholder {
    transition: color ease 0.5s;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 10px;
  left: 20px;
  cursor: text;
  max-width: 70%;
  text-overflow: ellipsis;
  transform-origin: left bottom;
  font-weight: 400;
  color: #788b99;
  visibility: hidden;
  transition: all ease 0.2s;
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
