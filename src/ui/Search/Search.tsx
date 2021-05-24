import { DropDownIcon } from "assets";
import React, { useState } from "react";
import styled from "styled-components";

interface SearchProps {
  onChange(value: string): void;
  placeholder: string;
  width?: string;
  maxWidth?: string;
  type?: string;
}

const Search: React.FC<SearchProps> = ({
  onChange,
  placeholder,
  width = "",
  maxWidth = "",
  type = "text",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SearchWrap>
      <SearchInput
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={"off"}
        width={width}
        maxWidth={maxWidth}
        type={type}
      />
      <Icon isOpen={isOpen}>
        <DropDownIcon />
      </Icon>
    </SearchWrap>
  );
};

const SearchInput = styled.input<{ width: string; maxWidth: string }>`
  width: ${({ width }) => (width ? width : "50px")};
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  color: #788b99;
  border: none;
  padding: 7px 0;
  transition: width ease 0.5s;

  &:focus {
    outline: none;
    border-bottom: 1px solid #48bbff;
    width: ${({ maxWidth }) => (maxWidth ? maxWidth : "150px")};

    &::placeholder {
      color: #788b99;
    }
  }

  &::placeholder {
    color: #48bbff;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  &[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }
`;

const Icon = styled.div<{ isOpen: boolean }>`
  margin-left: 5px;
  transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : "0deg")});
`;

const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

export default Search;
