import { useState } from "react";
import styled from "styled-components";

const PaginationLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;

const NavButton = styled.button`
  border: 0;
  background: transparent;
`;

const NavButtonIcon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  &:hover {
    cursor: pointer;
    background: var(--Neutral-Gray0, #f3f3f3);
  }
`;

const PaginationText = styled.p`
  color: var(--Text, #111010);

  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 150%;
  letter-spacing: 0.28px;
`;

const CurrPage = styled.input`
  display: flex;
  width: 32px;
  padding: 4px 8px;
  flex-direction: column;

  color: var(--Neutral-Black, #000);
  text-align: center;

  border-radius: 4px;
  border: 1px solid var(--Neutral-Gray2, #d8d8d8);
  background: #fff;
`;

type ReferralTablePaginationProps = {
  totalPages: number;
  currPage: number;
  setPageNumber: (newPageNumber: number) => void;
};

export const TablePagination = (props: ReferralTablePaginationProps) => {
  const [activePageNumber, setActivePageNumber] = useState(props.currPage);
  const handleClick = (increase: boolean): void => {
    if (increase && props.currPage !== props.totalPages) {
      props.setPageNumber(props.currPage + 1);
      setActivePageNumber(props.currPage + 1);
    }

    if (!increase && props.currPage > 1) {
      props.setPageNumber(props.currPage - 1);
      setActivePageNumber(props.currPage - 1);
    }
  };

  const handlePageNumberInput = (newPage: string): void => {
    try {
      const newPageNumber = Number(newPage);
      if (!Number.isNaN(newPageNumber)) {
        setActivePageNumber(newPageNumber);
      }
      if (newPageNumber >= 1 && newPageNumber <= props.totalPages) {
        props.setPageNumber(newPageNumber);
      }
    } catch (error) {
      console.error("Can't access that page");
    }
  };

  return (
    <PaginationLayout>
      <NavButton>
        <NavButtonIcon
          src={"/ic_caretleft.svg"}
          onClick={() => {
            handleClick(false);
          }}
        />
      </NavButton>
      <PaginationText>page</PaginationText>
      <CurrPage
        type="string"
        value={activePageNumber}
        onChange={(event) => {
          handlePageNumberInput(event.target.value);
        }}
      />
      <PaginationText>of</PaginationText>
      <PaginationText>{props.totalPages}</PaginationText>
      <NavButton>
        <NavButtonIcon
          src={"/ic_caretright.svg"}
          onClick={() => {
            handleClick(true);
          }}
        />
      </NavButton>
    </PaginationLayout>
  );
};
