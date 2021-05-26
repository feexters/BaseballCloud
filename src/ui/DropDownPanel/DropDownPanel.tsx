import React from "react";
import styled from "styled-components";

interface DropDownPanelData {
  items: {
    id: string;
    value: string;
  }[];
  active?: string;
  onSelect(id: string): void;
  isOpen: boolean;
  isArrow?: boolean;
}

const DropDownPanel: React.FC<DropDownPanelData> = ({
  items,
  active = "",
  onSelect,
  isOpen,
  isArrow = true,
}) => {
  return (
    <DropDownWrap isOpen={isOpen && items.length !== 0}>
      <DropDownPanelWrap isArrow={isArrow}>
        {items.map((item) => (
          <Select
            key={item.id}
            isActive={active === item.id}
            onMouseDown={() => onSelect(item.id)}
          >
            {item.value}
          </Select>
        ))}
      </DropDownPanelWrap>
    </DropDownWrap>
  );
};

const DropDownPanelWrap = styled.div<{ isArrow: boolean }>`
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

const DropDownWrap = styled.div<{ isOpen: boolean }>`
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const Select = styled.div<{ isActive: boolean }>`
  padding: 8px 16px;
  background: ${({ isActive }) =>
    isActive ? "rgba(72, 187, 255, 0.1)" : "white"};
  line-height: 1;
  color: #788b99;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background-color: rgba(72, 187, 255, 0.1);
  }
`;

export default DropDownPanel;
