import { DropDownIcon } from "assets";
import React, { useRef, useState } from "react";
import styled from "styled-components";

interface DropDownProps {
  items: string[];
  onSelect(value: string): void;
  width?: string;
  height?: string;
  isArrow?: boolean;
}

const DropDown: React.FC<DropDownProps> = ({
  items,
  onSelect,
  children,
  width = "",
  height = "",
  isArrow = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [hoverItem, setHoverItem] = useState(0);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClick = (value: string) => {
    onSelect(value);
    onClose();
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter" && items[hoverItem]) {
      onSelect(items[hoverItem]);
    } else if (event.code === "ArrowUp") {
      setHoverItem(hoverItem - 1 < 0 ? items.length - 1 : hoverItem - 1);
      event.preventDefault();
    } else if (event.code === "ArrowDown") {
      setHoverItem(hoverItem + 1 > items.length - 1 ? 0 : hoverItem + 1);
      event.preventDefault();
    }
  };

  return (
    <Wrap ref={dropDownRef}>
      <DropDownToggle
        onFocus={onOpen}
        onKeyDown={onKeyPress}
        onBlur={onClose}
        tabIndex={0}
      >
        {children}
        <Icon isOpen={isOpen}>
          <DropDownIcon />
        </Icon>
        {isOpen && (
          <DropDownWrap width={width} height={height}>
            <DropDownPanel isArrow={isArrow}>
              <SelectWrap>
              {items.map((item) => (
                <Select
                  key={item}
                  onMouseDown={() => onClick(item)}
                  isActive={item === items[hoverItem]}
                >
                  {item}
                </Select>
              ))}
              </SelectWrap>
            </DropDownPanel>
          </DropDownWrap>
        )}
      </DropDownToggle>
    </Wrap>
  );
};

const DropDownPanel = styled.div<{ isArrow: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  top: 10px;
  box-shadow: 0 3px 8px 0 rgb(0 0 0 / 15%);
  border: solid 1px #ebebeb;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-radius: 5px;
  z-index: 5;

  ${({ isArrow }) =>
    isArrow &&
    `
  &:before,
  &:after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    top: -8px;
    right: 25px;
    z-index: 2;
    border-style: solid;
    border-width: 0 8px 8px 8px;
    border-color: transparent transparent #ffffff transparent;
  }

  &:after {
    top: -9px;
    border-color: transparent transparent #ebebeb transparent;
    z-index: -1;
  }
  `}
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SelectWrap = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`

const DropDownToggle = styled.div`
  padding: 0;
  font-size: 16px;
  line-height: 1.19;
  color: #48bbff;
  white-space: nowrap;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const Icon = styled.div<{ isOpen: boolean }>`
  margin-left: 5px;
  transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : "0deg")});
  /* margin-top: ${({ isOpen }) => (isOpen ? "0" : "3px")}; */
`;

const DropDownWrap = styled.div<{ width: string; height: string }>`
  width: ${({ width }) => (width ? width : "178px")};
  ${({ height }) =>
    height && `height: ${height};`}
  position: absolute;
  top: 100%;
  right: -25px;
`;

const Select = styled.div<{ isActive: boolean }>`
  padding: 8px 16px;
  background-color: ${({ isActive }) =>
    isActive ? "rgba(72, 187, 255, 0.1)" : "#fff"};
  line-height: 1;
  color: #788b99;
  font-size: 16px;
  font-weight: 400;
  white-space: normal;
  cursor: pointer;

  &:hover {
    background-color: rgba(72, 187, 255, 0.1);
  }
`;

export default DropDown;
