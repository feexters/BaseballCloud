import { SelectArrowIcon } from "assets";
import { getId } from "lib/utils";
import React, { KeyboardEvent, useMemo, useRef, useState } from "react";
import { FieldRenderProps } from "react-final-form";
import styled from "styled-components";

interface SelectProps {
  customValue?: boolean;
  values: {
    id: string;
    name: string;
  }[];
  props: FieldRenderProps<any, HTMLElement>;
}

const Select: React.FC<SelectProps> = ({
  values,
  customValue = false,
  props: { input, ...rest },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverId, setHoverId] = useState(values.length ? values[0].id : "");

  const createValueId = useMemo(() => getId(), []);

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

  const onPressEnter = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Enter") {
      onClose();
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const onClick = (value: string) => {
    input.onChange(value);
    onClose();
  };

  return (
    <Wrap
      isOpen={isOpen}
      onClick={onOpen}
      onBlur={onClose}
      tabIndex={0}
      id={input.name}
    >
      <Label htmlFor={input.name}>{rest.placeholder}</Label>

      <Toggle onKeyPress={(event) => onPressEnter(event)}>
        {customValue ? (
          <Input {...input} {...rest} ref={inputRef} autoComplete={"off"} />
        ) : (
          <Text>{input.value ? input.value : rest.placeholder}</Text>
        )}
        <ArrowWrap isOpen={isOpen} onClick={onToggle}>
          <SelectArrowIcon />
        </ArrowWrap>
      </Toggle>
      {isOpen && (
        <Selection>
          {customValue && input.value && (
            <SelectionItem
              isActive={createValueId === hoverId}
              onClick={() => onClick(input.value)}
              onMouseEnter={() => setHoverId(createValueId)}
            >
              <Text>{`Create option "${input.value}"`}</Text>
            </SelectionItem>
          )}
          {values.map((value) => (
            <SelectionItem
              isActive={value.id === hoverId || value.name === input.value}
              onClick={() => onClick(value.name)}
              onMouseEnter={() => setHoverId(value.id)}
              key={value.id}
            >
              <Text>{value.name ? value.name : "-"}</Text>
            </SelectionItem>
          ))}
        </Selection>
      )}
    </Wrap>
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

export default Select;
