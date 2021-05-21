import { useQuery } from "@apollo/client";
import { SCHOOLS } from "apollo/queries/schools";
import { SelectArrowIcon } from "assets";
import { SchoolData } from "lib/interfaces/school-data";
import { getId } from "lib/utils";
import React, { KeyboardEvent, useRef, useState } from "react";
import { Field, FieldRenderProps, Form } from "react-final-form";
import Loader from "react-loader-spinner";
import styled from "styled-components";

interface SelectProps {
  props: FieldRenderProps<any, HTMLElement>;
}

const SchoolSelect: React.FC<SelectProps> = ({
  props: { input, meta, ...rest },
}) => {
  const [searchValue, setSearchValue] = useState("");

  const { loading, data } = useQuery(SCHOOLS, {
    variables: { search: searchValue },
  });

  let values = loading
    ? ([] as SchoolData[])
    : (data.schools.schools as SchoolData[]);

  const isIdenticalData = values.filter(
    (value) => value.name === searchValue
  ).length;

  if (searchValue && !isIdenticalData) {
    values = [{ id: "-1", name: `Create option "${searchValue}"` }, ...values];
  }

  const currentValueIndex = values.findIndex(
    (value) => value.id === input.value.id
  );

  const [isOpen, setIsOpen] = useState(false);
  const [hoverId, setHoverId] = useState(
    currentValueIndex === -1 ? 0 : currentValueIndex
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const onClose = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const onOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onPressEnter = (
    event: KeyboardEvent<HTMLDivElement>,
    submit: () => void
  ) => {
    if (event.code === "Enter") {
      submit();
      onClose();
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const onClick = (index: number) => {
    if (searchValue && !index && !isIdenticalData) {
      input.onChange({ id: getId(), name: searchValue });
    } else {
      input.onChange(values[index]);
    }

    onClose();
  };

  const onSubmit = () => {
    if (searchValue && !hoverId && !isIdenticalData) {
      input.onChange({ id: getId(), name: searchValue });
    } else {
      input.onChange(values[hoverId]);
    }

    onClose();
  };

  return (
    <>
      <Wrap
        isOpen={isOpen}
        onClick={onOpen}
        onBlur={onClose}
        tabIndex={0}
        id={input.name}
      >
        <Label htmlFor={input.name}>{rest.placeholder}</Label>

        <Toggle>
          <Form
            onSubmit={onSubmit}
            initialValues={{ search_school: input.value.name }}
            render={({ form }) => (
              <Field name="search_school" placeholder="School">
                {({ input }) => (
                  <Input
                    {...input}
                    {...rest}
                    value={input.value}
                    onKeyPress={(event) => onPressEnter(event, form.submit)}
                    onChange={(event) => {
                      input.onChange(event.target.value);
                      setSearchValue(event.target.value);
                    }}
                    ref={inputRef}
                    autoComplete={"off"}
                  />
                )}
              </Field>
            )}
          />
          {loading && (
            <Loader type="Oval" color="#788b99" height={20} width={30} />
          )}
          <ArrowWrap isOpen={isOpen} onClick={onToggle}>
            <SelectArrowIcon />
          </ArrowWrap>
        </Toggle>
        {isOpen && (
          <Selection>
            {values.map((value, index) => (
              <SelectionItem
                isActive={index === hoverId || value.name === input.value}
                onMouseDown={() => onClick(index)}
                onMouseEnter={() => setHoverId(index)}
                key={value.id}
              >
                <Text>{value.name ? value.name : "-"}</Text>
              </SelectionItem>
            ))}
          </Selection>
        )}
      </Wrap>
      {meta.touched && meta.error && (
        <ErrorValidation>{meta.error}</ErrorValidation>
      )}
    </>
  );
};

const Wrap = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: 38px;
  padding: 0 16px;
  position: relative;
  border-radius: 4px;
  background-color: ${({ isOpen }) => (isOpen ? "white" : "#eff1f3")};
  border: 1px solid transparent;
  cursor: pointer;
  ${({ isOpen }) =>
    isOpen &&
    "border-color: #48bbff;" +
      "border-radius: 4px 4px 0 0;" +
      "& > label {" +
      "transform: translate(-16px, -8px) scale(1.15);" +
      "visibility: visible;};"}
`;

const ErrorValidation = styled.span`
  font-size: 1.6rem;
  align-self: flex-start;
  color: #f05f62;
  margin-top: 8px;
`;

const Toggle = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const ArrowWrap = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) => isOpen && "transform: rotate(180deg);"}
`;

const Text = styled.span`
  display: block;
  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  color: #667784;
`;

const Input = styled.input`
  box-sizing: content-box;
  width: 100%;
  max-width: 100%;
  font-size: 1.6rem;
  line-height: 1.13;
  font-weight: 400;
  color: #667784;
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #667784;
  }
`;

const Selection = styled.div`
  width: 100%;
  max-height: 200px;
  left: 0;
  top: 45px;
  padding-bottom: 8px;
  position: absolute;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 2px 15px 0 rgb(0 0 0 / 10%);
  overflow: auto;
  z-index: 10;
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
  z-index: 11;
`;

const SelectionItem = styled.div<{ isActive: boolean }>`
  margin-top: 8px;
  padding: 10px;
  background-color: ${({ isActive }) =>
    isActive ? "rgba(72, 187, 255, .2)" : "white"};
  cursor: pointer;
`;

export default SchoolSelect;
