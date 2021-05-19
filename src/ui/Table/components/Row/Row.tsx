import React, { useState } from "react";
import styled from "styled-components";

interface RowProps {
  totalColumns: number;
  titles: {
    key: number;
    title: string;
  }[];
  values: any[];
}

const Row: React.FC<RowProps> = ({
  totalColumns,
  titles,
  values,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isCanOpen = children ? true : false;

  const onToggle = () => {
    if (isCanOpen) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <Wrap isOpen={isOpen}>
      <RowWrap
        onClick={onToggle}
        totalColumns={totalColumns}
        isCanOpen={isCanOpen}
        isOpen={isOpen}
      >
        {titles.map((title) => (
          <ContentWrap key={title.key}>
            <ContentTitle>{title.title}</ContentTitle>
            <ContentValue>{values[title.key] || "-"}</ContentValue>
          </ContentWrap>
        ))}
      </RowWrap>
      {isOpen && <InnerComponent>{children}</InnerComponent>}
    </Wrap>
  );
};

const maxWidth = "640px";

const Wrap = styled.div<{ isOpen: boolean }>`
width: 100%;
  ${({ isOpen }) =>
    isOpen &&
    `box-shadow: 0 0 6px 1px rgb(72 187 255 / 63%);
    border-radius: 4px;`}
`;

const RowWrap = styled.div<{ totalColumns: number, isCanOpen: boolean, isOpen: boolean }>`
  display: grid;
  align-items: center;
  min-height: 44px;
  grid-template-columns: repeat(${({ totalColumns }) => totalColumns}, 1fr);
  align-items: center;
  border-radius: 4px;
  background-color: ${({isOpen}) => isOpen ? '#ecf8ff' : '#f7f8f9'};
  ${({ isCanOpen }) => isCanOpen && `cursor: pointer;`}

  &:hover {
    background-color: #ecf8ff;
  }

  @media (max-width: ${maxWidth}) {
    grid-template-columns: repeat(1, 1fr);
    row-gap: 10px;
    padding: 16px;
  }
`;

const InnerComponent = styled.div`
  background-color: white; 
  padding: 16px;
`

const ContentWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const ContentTitle = styled.div`
  font-size: 14px;
  color: #414f5a;
  display: none;
  margin-right: 10px;

  @media (max-width: ${maxWidth}) {
    display: block;
  }
`;

const ContentValue = styled.div`
  font-size: 14px;
  color: #414f5a;
  font-weight: 400;
`;

export default Row;
