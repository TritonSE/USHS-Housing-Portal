import styled from "styled-components";

const NumPageButton = styled.button`
  width: 25px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid #eeeeee;
  opacity: 0px;
  background: #f5f5f5;
  align-content: center;

  &:hover {
    cursor: pointer;
    background: #f5f5f5;
  }

  &.active {
    background: #ec8537;
    color: #ffffff;
    border-color: #ec8537;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  //width: 341.87px;
  height: 24px;
  justify-content: space-between;
  gap: 20px;
  opacity: 0px;
`;

const NavButton = styled(NumPageButton)``;

const NavButtonIcon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 0;
`;

const EllipsesWrapper = styled.div`
  width: 24px;
  height: 24px;
`;

type PaginationProps = {
  totalPages: number;
  currPage: number;
  setPageNumber: (newPageNumber: number) => void;
};

const BUTTONS_PER_PAGE = 5;

export const Pagination = (props: PaginationProps) => {
  const pages = [];

  const handleClick = (increase: boolean): void => {
    if (increase && props.currPage !== props.totalPages) {
      props.setPageNumber(props.currPage + 1);
    }

    if (!increase && props.currPage > 1) {
      props.setPageNumber(props.currPage - 1);
    }
  };

  //case 1: num pages < buttons per page -> show all
  if (props.totalPages <= BUTTONS_PER_PAGE) {
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(
        <NumPageButton
          key={i}
          onClick={() => {
            props.setPageNumber(i);
          }}
          className={props.currPage === i ? "active" : ""}
        >
          {i}
        </NumPageButton>,
      );
    }
  }
  //case 2: on page 1-3 -> show first 4 ... and last
  else if (props.currPage <= BUTTONS_PER_PAGE - 2) {
    for (let i = 1; i <= props.totalPages; i++) {
      //add button for first three pages
      if (i <= BUTTONS_PER_PAGE - 1) {
        pages.push(
          <NumPageButton
            key={i}
            onClick={() => {
              props.setPageNumber(i);
            }}
            className={props.currPage === i ? "active" : ""}
          >
            {i}
          </NumPageButton>,
        );
      } else if (i === props.totalPages) {
        pages.push(<EllipsesWrapper>...</EllipsesWrapper>);
        pages.push(
          <NumPageButton
            key={i}
            onClick={() => {
              props.setPageNumber(i);
            }}
            className={props.currPage === i ? "active" : ""}
          >
            {i}
          </NumPageButton>,
        );
      }
    }
  }
  //case 3: on page end - 4 + 1-> show first ...  last 4
  else if (props.currPage > props.totalPages - BUTTONS_PER_PAGE + 2) {
    //add button for first three pages
    for (let i = 1; i <= props.totalPages; i++) {
      if (i >= props.totalPages - BUTTONS_PER_PAGE + 2) {
        pages.push(
          <NumPageButton
            key={i}
            onClick={() => {
              props.setPageNumber(i);
            }}
            className={props.currPage === i ? "active" : ""}
          >
            {i}
          </NumPageButton>,
        );
      } else if (i === 1) {
        pages.push(
          <NumPageButton
            key={i}
            onClick={() => {
              props.setPageNumber(i);
            }}
            className={props.currPage === i ? "active" : ""}
          >
            {i}
          </NumPageButton>,
        );
        pages.push(<EllipsesWrapper>...</EllipsesWrapper>);
      }
    }
  }
  //case 4: middle -> show first ... middle - 1, middle, middle + 1, ... last
  else {
    for (let i = 1; i <= props.totalPages; i++) {
      if (i === 1) {
        pages.push(
          <NumPageButton
            key={i}
            onClick={() => {
              props.setPageNumber(i);
            }}
            className={props.currPage === i ? "active" : ""}
          >
            {i}
          </NumPageButton>,
        );
        pages.push(<EllipsesWrapper>...</EllipsesWrapper>);
      } else if (i === props.currPage - 1 || i === props.currPage || i === props.currPage + 1) {
        pages.push(
          <NumPageButton
            key={i}
            onClick={() => {
              props.setPageNumber(i);
            }}
            className={props.currPage === i ? "active" : ""}
          >
            {i}
          </NumPageButton>,
        );
      } else if (i === props.totalPages) {
        pages.push(<EllipsesWrapper>...</EllipsesWrapper>);
        pages.push(
          <NumPageButton
            key={i}
            onClick={() => {
              props.setPageNumber(i);
            }}
            className={props.currPage === i ? "active" : ""}
          >
            {i}
          </NumPageButton>,
        );
      }
    }
  }

  return (
    <ButtonWrapper>
      <NavButton>
        <NavButtonIcon
          src={"/ic_caretleft.svg"}
          onClick={() => {
            handleClick(false);
          }}
        />
      </NavButton>
      {pages}
      <NavButton>
        <NavButtonIcon
          src={"/ic_caretright.svg"}
          onClick={() => {
            handleClick(true);
          }}
        />
      </NavButton>
    </ButtonWrapper>
  );
};
