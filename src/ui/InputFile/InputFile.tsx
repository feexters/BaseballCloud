import React from "react";
import { FieldInputProps } from "react-final-form";
import styled from "styled-components";

interface InputProps {
  input: FieldInputProps<string, any>;
}

const InputFile: React.FC<InputProps> = ({ input }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
       input.onChange({
         file: file,
         blob: event.target?.result,
       })
      };
  
      reader.readAsDataURL(file);
    }
  };

  return (
    <Wrap>
      <Input
        onChange={onChange}
        type="file"
        accept="image/jpeg,image/png,image/gif"
        id={input.name}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
  z-index: -1;
`;

export default InputFile;
