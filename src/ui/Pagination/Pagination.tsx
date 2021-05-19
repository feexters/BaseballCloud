import React from "react";
import styled from "styled-components";

interface PaginationProps {
  maxPages: number;
  current: number;
  onChange(page: number): void;
}

const Pagination: React.FC<PaginationProps> = ({
  maxPages,
  current,
  onChange,
}) => {
  const pages = Array.from(Array(maxPages), (_, i) => i + 1);

  const getSlicesPages = (): number[][] => {
    if (pages.length < 5) {
      return [pages];
    } else if (current === 0 || current === 1) {
      return [pages.slice(0, 3 + current), [pages[pages.length - 1]]];
    } else if (current === 2) {
      return [pages.slice(0, 2 + current), [pages[pages.length - 1]]];
    } else if (current === pages.length - 3 || current === pages.length - 2 || current === pages.length - 3) {
      return [[pages[0]], pages.slice(current - 1)];
    } else if (current === pages.length - 1) {
      return [[pages[0]], pages.slice(pages.length - 3)];
    } else {
      return [
        [pages[0]],
        pages.slice(current - 1, current + 2),
        [pages[pages.length - 1]],
      ];
    }
  };

  const showPages = getSlicesPages();

  return (
    <Wrap>
      {current !== 0 ? (
        <Page onClick={() => onChange(0)}>«</Page>
      ) : (
        <Page isDisable>«</Page>
      )}
      {showPages.map((pages, pagesIndex) =>
        pages.map((item, index) => {
          if (item - 1 !== current) {
            if (index === pages.length - 1 && pagesIndex !== showPages.length - 1) {
              return (
                <Wrap key={item}>
                  <Page onClick={() => onChange(item - 1)}>
                    {item}
                  </Page>
                  <Page isDisable>...</Page>
                </Wrap>
              );
            } else {
              return (
                <Page key={item} onClick={() => onChange(item - 1)}>
                  {item}
                </Page>
              );
            }
          } else {
            return <ActivePage key={item}>{item}</ActivePage>;
          }
        })
      )}
      {current !== maxPages - 1 ? (
        <Page onClick={() => onChange(maxPages - 1)}>»</Page>
      ) : (
        <Page isDisable>»</Page>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
`;

const Page = styled.div<{ isDisable?: boolean }>`
  padding: 6px 12px;
  line-height: 1.42857143;
  color: #414f5a;
  border-radius: 4px;
  margin-left: 2px;
  font-size: 1.6rem;
  background-color: white;
  cursor: default;

  ${({ isDisable }) =>
    !isDisable &&
    `
    cursor: pointer;
    background-color: #f7f8f9;
    &:hover {
      color: #23527c;
      background-color: #eee;
      border-color: #ddd;
    }
  `}
`;

const ActivePage = styled.div`
  cursor: default;
  padding: 6px 12px;
  background-color: rgb(72, 187, 255);
  line-height: 1.42857143;
  color: white;
  font-size: 1.6rem;
  border-radius: 4px;
  margin-left: 2px;
`;

export default Pagination;
