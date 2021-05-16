import React from "react";
import { FieldRenderProps } from "react-final-form";
import styled from "styled-components";

type TextAreaProps = FieldRenderProps<string, any>;

const TextArea: React.FC<TextAreaProps> = ({
  input,
  meta,
  ...rest
}: TextAreaProps) => {
  return (
    <Wrap>
      <StyledTextArea {...input} {...rest} />
      <Label htmlFor={input.name}>{rest.placeholder}</Label>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 110px;
  padding: 11px 16px;
  border-radius: 4px;
  background-color: #eff1f3;
  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  color: #667784;
  border: 1px solid transparent;
  resize: none;

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

export default TextArea;
