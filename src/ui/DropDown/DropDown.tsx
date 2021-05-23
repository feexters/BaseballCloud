import { DropDownIcon } from "assets";
import React, { useRef, useState } from "react";
import styled from "styled-components";

interface DropDownProps {
  items: string[];
  onSelect(value: string): void;
}

const DropDown: React.FC<DropDownProps> = ({ items, onSelect, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

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

  return (
    <Wrap ref={dropDownRef}>
      <DropDownToggle onFocus={onOpen} onBlur={onClose} tabIndex={0}>
        {children}
        <Icon isOpen={isOpen}>
          <DropDownIcon />
        </Icon>
        {isOpen && (
        <DropDownWrap>
          <DropDownPanel>
            {items.map((item) => (
              <Select key={item} onMouseDown={() => onClick(item)}>
                {item}
              </Select>
            ))}
          </DropDownPanel>
        </DropDownWrap>
      )}
      </DropDownToggle>
    </Wrap>
  );
};

const DropDownPanel = styled.div`
  width: 100%;
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
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

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
`;

const Icon = styled.div<{ isOpen: boolean }>`
  margin-left: 5px;
  transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : "0deg")});
  margin-top: ${({ isOpen }) => (isOpen ? "0" : "3px")};
`;

const DropDownWrap = styled.div`
  width: 178px;
  position: absolute;
  top: 100%;
  right: -25px;
`;

const Select = styled.div`
  padding: 8px 16px;
  background: #fff;
  line-height: 1;
  color: #788b99;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background-color: rgba(72, 187, 255, 0.1);
  }
`;

export default DropDown;
