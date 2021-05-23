import React from "react";
import styled from "styled-components";
import { MainLoader } from "ui/MainLoader";
import { Row } from "./components";

interface TableProps<T> {
  titles: {
    key: keyof T;
    title: string;
  }[];
  values: { id: string; values: T }[];
  loading?: boolean;
  innerTitles?: {
    key: keyof T;
    title: string;
  }[];
  minHeight?: string;
}

const Table: React.FC<TableProps<{ [key: string]: any }>> = ({
  titles,
  values,
  loading = false,
  innerTitles,
  minHeight = "",
}) => {
  return (
    <Wrap>
      <Header col={titles.length}>
        {titles.map((title) => (
          <HeaderTitle key={title.key}>{title.title}</HeaderTitle>
        ))}
      </Header>
      {loading ? (
        <LoadingWrap minHeight={minHeight}>
          <MainLoader />
        </LoadingWrap>
      ) : (
        <RowsWrap minHeight={values.length ? minHeight : ''}>
          {values.map((item) => (
            <Row
              key={item.id}
              totalColumns={titles.length}
              titles={titles}
              values={item.values}
            >
              {innerTitles && <Table titles={innerTitles} values={[item]} />}
            </Row>
          ))}
        </RowsWrap>
      )}
    </Wrap>
  );
};

const maxWidth = "640px";

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const RowsWrap = styled.div<{ minHeight: string }>`
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingWrap = styled.div<{ minHeight: string }>`
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
