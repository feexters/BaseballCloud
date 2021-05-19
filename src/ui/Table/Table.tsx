import React, { useState } from "react";
import styled from "styled-components";
import { Pagination } from "ui";
import { Row } from "./components";

interface TableProps {
  titles: {
    key: number;
    title: string;
  }[];
  values: { id: string | number; values: any[] }[];
}

const Table: React.FC<TableProps> = ({ titles, values, children }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalValues = values.length;
  const totalPages = Math.floor(totalValues / 10);

  const openNewPage = (page: number) => {
    setCurrentPage(page);
    console.log("Current page: ", page);
  };

  return (
    <Wrap>
      <Header col={titles.length}>
        {titles.map((title) => (
          <HeaderTitle key={title.key}>{title.title}</HeaderTitle>
        ))}
      </Header>
      {values.map((item) => (
        <Row
          key={item.id}
          totalColumns={titles.length}
          titles={titles}
          values={item.values}
        >
          {children}
        </Row>
      ))}
      {totalPages !== 0 && (
        <PaginationWrap>
          <Pagination
            maxPages={totalPages + 1}
            onChange={openNewPage}
            current={currentPage}
          />
        </PaginationWrap>
      )}
    </Wrap>
  );
};

const maxWidth = "640px";

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${maxWidth}) {
    flex-direction: row;
    background-color: #f7f8f9;
    border-radius: 4px;

    &:hover {
      background-color: #ecf8ff;
    }
  }
`;

const PaginationWrap = styled.div`
  display: flex;
  align-self: center;
  margin-top: 10px;
`;

const Header = styled.div<{ col: number }>`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(${({ col }) => col}, 1fr);
  min-height: 44px;
  margin-bottom: 6px;

  @media (max-width: ${maxWidth}) {
    display: none;
  }
`;

const HeaderTitle = styled.div`
  font-size: 14px;
  line-height: 1;
  font-weight: 300;
  color: #667784;
`;

export default Table;
