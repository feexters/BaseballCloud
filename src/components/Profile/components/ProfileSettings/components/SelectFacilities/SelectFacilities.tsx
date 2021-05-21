import { useQuery } from "@apollo/client";
import { FACILITIES } from "apollo";
import { SelectArrowIcon } from "assets";
import { FacilitiesData } from "lib/interfaces/facilities-data";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Field, FieldInputProps, Form } from "react-final-form";
import Loader from "react-loader-spinner";
import styled from "styled-components";

interface SelectProps {
  placeholder: string;
  input: FieldInputProps<any, HTMLElement>;
}

const SelectFacilities: React.FC<SelectProps> = ({ placeholder, input }) => {
  const selectedItems = useMemo(
    () =>
      input.value
        ? (input.value as FacilitiesData[])
        : ([] as FacilitiesData[]),
    [input.value]
  );

  const [searchValue, setSearchValue] = useState("");

  const { loading, data } = useQuery(FACILITIES, {
    variables: { search: searchValue },
  });

  let values = loading
    ? ([] as FacilitiesData[])
    : (data.facilities.facilities as FacilitiesData[]);

  const showingValues = values.filter(
    (item) =>
      !selectedItems.filter((selected) => selected.id === item.id).length
  );

  const [isOpen, setIsOpen] = useState(false);
  const [hoverId, setHoverId] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      inputRef.current!.blur();
    } else {
      inputRef.current!.focus();
    }
  }, [isOpen]);

  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const onClose = () => {
    setIsOpen(false);
    removeBlurListener();
  };

  const onOpen = () => {
    if (!isOpen) {
      addBlurListener();
      setIsOpen(true);
    }
  };

  const onClick = (item: FacilitiesData) => {
    input.onChange([...selectedItems, item]);
  };

  const onDelete = (id: string) => {
    const values = selectedItems.filter((item) => item.id !== id);
    input.onChange(values);
  };

  const onSubmit = () => {
    if (values[hoverId]) {
      input.onChange([...selectedItems, values[hoverId]]);
      onClose();
    }
  };

  const onInputBlur = (reset: () => void) => {
    if (isOpen) {
      inputRef.current!.focus();
    } else {
      inputRef.current!.blur();
      reset();
    }
  };

  const onBlur = (event: MouseEvent) => {
    if (!selectRef.current!.contains(event.target as Node)) {
      onClose();
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Backspace" && selectedItems.length) {
      if (!(event.target as HTMLInputElement).value) {
        onDelete(selectedItems[selectedItems.length - 1].id);
        onClose();
      }
    }
  };

  const addBlurListener = () => {
    document.addEventListener("mousedown", onBlur);
  };

  const removeBlurListener = () => {
    document.removeEventListener("mousedown", onBlur);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ form, handleSubmit }) => (
        <SelectForm
          onSubmit={(event) => {
            handleSubmit(event);
            form.reset();
          }}
        >
          <Field name="inputMultiValue">
            {({ input, rest }) => (
              <Wrap
                isOpen={isOpen}
                onClick={onOpen}
                id={input.name}
                ref={selectRef}
              >
                <Toggle>
                  <InputWrap>
                    {!selectedItems.length && !input.value ? (
                      <PlaceHolder isOpen={isOpen}>{placeholder}</PlaceHolder>
                    ) : (
                      selectedItems.map((item) => (
                        <SelectedItem key={item.id}>
                          <Close onClick={() => onDelete(item.id)}>×</Close>
                          <SelectedText>{item.u_name}</SelectedText>
                        </SelectedItem>
                      ))
                    )}
                    <Input
                      {...input}
                      {...rest}
                      onChange={(event) => {
                        input.onChange(event);
                        setSearchValue(event.target.value);
                      }}
                      onBlur={() => onInputBlur(form.reset)}
                      width={input.value.length * 16 || 5}
                      onKeyDown={onKeyDown}
                      ref={inputRef}
                    />
                  </InputWrap>
                  {loading && (
                    <Loader
                      type="Oval"
                      color="#788b99"
                      height={20}
                      width={30}
                    />
                  )}
                  <ArrowWrap isOpen={isOpen}>
                    <SelectArrowIcon />
                  </ArrowWrap>
                </Toggle>

                {isOpen && (
                  <Selection>
                    {showingValues.length ? (
                      showingValues.map((value, index) => (
                        <SelectionItem
                          isActive={index === hoverId}
                          onClick={() => onClick(value)}
                          onMouseEnter={() => setHoverId(index)}
                          key={value.id}
                        >
                          <Text>{value.u_name}</Text>
                        </SelectionItem>
                      ))
                    ) : (
                      <SelectionItem isActive={false}>
                        <Text>{loading ? "Loading..." : "Type to search"}</Text>
                      </SelectionItem>
                    )}
                  </Selection>
                )}
                <Label htmlFor={input.name}>{placeholder}</Label>
              </Wrap>
            )}
          </Field>
        </SelectForm>
      )}
    />
  );
};

const Wrap = styled.div<{ isOpen: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 4px 16px;
  position: relative;
  border-radius: 4px;
  background-color: ${({ isOpen }) => (isOpen ? "white" : "#eff1f3")};
  border: 1px solid transparent;
  cursor: ${({ isOpen }) => (isOpen ? "text" : "pointer")};
  ${({ isOpen }) =>
    isOpen &&
    "border-color: #48bbff;" +
      "border-radius: 4px 4px 0 0;" +
      "& > label {" +
      "transform: translate(-16px, -8px) scale(1.15);" +
      "visibility: visible;};"}
`;

const SelectForm = styled.form`
  width: 100%;
`;

const Toggle = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const InputWrap = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-wrap: wrap;
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

const PlaceHolder = styled.span<{ isOpen: boolean }>`
  display: block;
  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  color: #667784;

  ${({ isOpen }) => isOpen && "opacity: .5; position: absolute;"}
`;

const Close = styled.span`
  display: block;
  height: 100%;
  padding: 3px 5px 3px 5px;
  border-right: 1px solid rgba(0, 126, 255, 0.24);
  font-size: 1.4rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 126, 255, 0.2);
  }
`;

const SelectedItem = styled.div`
  background-color: rgba(0, 126, 255, 0.08);
  border-radius: 2px;
  border: 1px solid rgba(0, 126, 255, 0.24);
  display: flex;
  align-items: center;
  line-height: 1.4;
  color: #007eff;
  margin: 2px 0;
  margin-right: 5px;
  user-select: none;
  cursor: auto;
`;

const SelectedText = styled.span`
  font-size: 1.4rem;
  padding: 0 2px;
`;

const Selection = styled.div`
  width: 100%;
  max-height: 200px;
  left: 0;
  top: 120%;
  position: absolute;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 2px 15px 0 rgb(0 0 0 / 10%);
  overflow: auto;
  padding-bottom: 8px;
  z-index: 10;
`;

const Input = styled.input<{ width: number }>`
  box-sizing: content-box;
  width: ${({ width }) => width + "px"};
  max-width: 100%;
  font-size: 1.6rem;
  line-height: 1.13;
  font-weight: 400;
  color: #667784;
  border: none;
  position: absolute;
  opacity: 0;
  z-index: -1;

  &:focus {
    position: relative;
    z-index: 20;
    opacity: 1;
    background-color: transparent;
    outline: none;
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
  background-color: white;
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

export default SelectFacilities;
