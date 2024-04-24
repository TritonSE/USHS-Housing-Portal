import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { ReferralTablePagination } from "./ReferralTablePagination";

import { User, demoteUser } from "@/api/users";
import { DataContext } from "@/contexts/DataContext";

const ENTRIES_PER_PAGE = 7;

const HLTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 75%;
  margin-bottom: 10%;
`;

const HLTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  background-color: white;
  border-radius: 8px;
  gap: 20px;
`;

const HLTableHeader = styled.div`
  display: flex;
  justify-content: left;
  background-color: white;
  margin-top: 24px;
  margin-bottom: 24px;
  margin-left: 19px;
  margin-right: 19px;
  font-weight: 700;
  font-size: 16px;

  border-bottom-color: black;
  border-weight: 10px;
`;

const DeleteButton = styled.button`
  align-items: center;
  width: 20px;
  height: 22px;

  border-width: 0px;
  background-color: none;

  cursor: pointer;
  transition-duration: 300ms;
  &:hover {
    color: pink; // fix this
  }
`;

const HLRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  font-family: Montserrat;
  font-size: 16px;
  line-height: 24px;

  margin-left: 24px;
  margin-right: 24px;
  margin-bottom: 20px;
`;

const HLTableFooter = styled.div`
  padding-left: 85%;
  margin: 1vh 0vw 3vh 0vw;
`;

export const HousingLocatorTable = () => {
  const dataContext = useContext(DataContext);
  const [housingLocators, setHousingLocators] = useState<User[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    setHousingLocators(dataContext.allHousingLocators);
  }, [dataContext.allHousingLocators]);

  const handleDemote = (user: User) => {
    demoteUser(user)
      .then((value) => {
        if (value.success) {
          console.log(value.data);
          dataContext.refetchData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <HLTableWrapper>
      <HLTableContainer>
        <HLTableHeader>Name</HLTableHeader>
        {dataContext.allHousingLocators
          .slice((pageNumber - 1) * ENTRIES_PER_PAGE, pageNumber * ENTRIES_PER_PAGE)
          .map((locator: User, index: number) => (
            <HLRow key={index}>
              {locator.firstName} {locator.lastName}
              <DeleteButton
                onClick={() => {
                  handleDemote(locator);
                }}
              >
                {" "}
                <img src={"/trash-can.svg"} alt="" />
              </DeleteButton>
            </HLRow>
          ))}
      </HLTableContainer>
      <HLTableFooter>
        <ReferralTablePagination
          totalPages={Math.ceil(housingLocators.length / ENTRIES_PER_PAGE)}
          currPage={pageNumber}
          setPageNumber={setPageNumber}
        />
      </HLTableFooter>
    </HLTableWrapper>
  );
};
