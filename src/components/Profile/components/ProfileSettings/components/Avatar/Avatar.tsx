import React, { useMemo } from "react";
import { Field, FieldRenderProps, Form } from "react-final-form";
import styled from "styled-components";
import { InputFile } from "ui";
import avatarImage from "assets/images/user.png";

interface ImageData {
  file: File;
  blob: string | ArrayBuffer | null | undefined;
}

type InputProps = FieldRenderProps<string, any>;

const Avatar: React.FC<InputProps> = ({ input }) => {
  const onSubmit = ({ file }: ImageData) => {
    if (file.name) {
      // dispatch(...)
    }
  };

  const currentImage = input.value;

  const initialValues = useMemo(() => {
    return { avatarLoader: {} as ImageData };
  }, []);

  return (
    <AvatarWrap>
      <Form
        onSubmit={(value) => onSubmit(value.avatarLoader)}
        initialValues={{ ...initialValues }}
        render={({ form }) => (
          <Field
            name="avatarLoader"
            placeholder="Choose Photo"
            onBlur={() => {}}
          >
            {({ input }) => (
              <>
                <AvatarIcon image={input.value.blob || currentImage || ""} />
                <InputFile input={input} />
                {input.value.blob ? (
                  <>
                    <AvatarLabel>{input.value.file.name}</AvatarLabel>
                    <InputControl>
                      <UploadButton uploadTheme onClick={form.submit}>
                        Upload Photo
                      </UploadButton>
                      <UploadButton onClick={form.reset}>Cancel</UploadButton>
                    </InputControl>
                  </>
                ) : (
                  <AvatarLabel htmlFor={input.name}>Choose Photo</AvatarLabel>
                )}
              </>
            )}
          </Field>
        )}
      />
    </AvatarWrap>
  );
};

const AvatarLabel = styled.label`
  margin-bottom: 0;
  font-size: 14px;
  line-height: 1;
  font-weight: 400;
  color: #788b99;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: #48bbff;
    text-decoration: underline;
  }
`;

const InputControl = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const AvatarWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 23px;
`;

const AvatarIcon = styled.div<{ image: string }>`
  background-image: url(${({ image }) => (image ? image : avatarImage)});
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: 50% 50%;
  margin-bottom: 15px;
`;

const UploadButton = styled.div<{ uploadTheme?: boolean }>`
  color: ${({ uploadTheme }) => (uploadTheme ? "#48bbff" : "#788b99")};
  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    text-decoration: underline;
  }
`;

export default Avatar;
