import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { Button } from "./Button";
import { Pagination } from "./Pagination";

import { User, demoteUser } from "@/api/users";
import { DataContext } from "@/contexts/DataContext";

const ENTRIES_PER_PAGE = 2;

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

const DeleteIcon = styled.img`
  align-items: center;
  width: 20px;
  height: 22px;

  cursor: pointer;
  transition: filter 0.3s;

  &:hover {
    filter: brightness(1.4);
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

const HLTableFooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 24px;
  margin-bottom: 20px;
  justify-content: right;
`;

const HLTableFooter = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.25);
  z-index: 2;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 612px;
  height: 360px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 50px;
  z-index: 2;
`;

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
`;

const WarningMessageWrapper = styled.div`
  display: inline;
  align-items: center;
  margin-left: 15%;
  margin-right: 15%;
  text-align: center;
  margin-bottom: 0;
`;

const ConfirmDelete = styled(Button)`
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 16px;
  width: 117px;
  height: 40px;
  border-radius: 12px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 15%;
  margin-right: 15%;
  gap: 240px;
`;

const XWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px 27px;
  font-size: 30px;
`;

const XButton = styled.div`
  &:hover {
    cursor: pointer;
  }
  height: 10px;
  width: 10px;
`;

const DoneMessageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  font-size: 20px;
  line-height: 30px;
`;

const DoneMessageHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

export const HousingLocatorTable = () => {
  const dataContext = useContext(DataContext);
  const [housingLocators, setHousingLocators] = useState<User[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [popup, setPopup] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sucessfulDeletionPopup, setSucessfulDeletionPopup] = useState<boolean>(false);

  useEffect(() => {
    setHousingLocators(dataContext.allHousingLocators);
  }, [dataContext.allHousingLocators]);

  const handleDemote = (user: User) => {
    setSelectedUser(user); // Set the selected user before showing the pop-up
    setPopup(true);
    demoteUser(user)
      .then((value) => {
        if (value.success) {
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
              <DeleteIcon
                src="trash-can.svg"
                onClick={() => {
                  if (locator !== null) {
                    setSelectedUser(locator);
                    setPopup(true);
                  }
                }}
              ></DeleteIcon>
            </HLRow>
          ))}
        <HLTableFooterWrapper>
          <HLTableFooter>
            <Pagination
              totalPages={Math.ceil(housingLocators.length / ENTRIES_PER_PAGE)}
              currPage={pageNumber}
              setPageNumber={setPageNumber}
            />
          </HLTableFooter>
        </HLTableFooterWrapper>
      </HLTableContainer>
      {popup && selectedUser && (
        <>
          <Overlay />
          <Modal>
            <XWrapper>
              <XButton
                onClick={() => {
                  setPopup(false);
                }}
              >
                &times;
              </XButton>
            </XWrapper>
            <HeadingWrapper>Remove Housing Locator</HeadingWrapper>
            <WarningMessageWrapper>
              Are you sure you want to remove{" "}
              <b>
                {selectedUser.firstName} {selectedUser.lastName}
              </b>{" "}
              as a housing locator? They will still have access as a referring staff after removal.
            </WarningMessageWrapper>
            <ButtonsWrapper>
              <ConfirmDelete
                kind="secondary"
                onClick={() => {
                  setPopup(false);
                }}
              >
                Cancel
              </ConfirmDelete>

              <ConfirmDelete
                kind="primary"
                onClick={() => {
                  handleDemote(selectedUser);
                  setPopup(false);
                  setSucessfulDeletionPopup(true);
                }}
              >
                Demote
              </ConfirmDelete>
            </ButtonsWrapper>
          </Modal>
        </>
      )}

      {sucessfulDeletionPopup && (
        <>
          <Overlay />
          <Modal>
            <XWrapper>
              <XButton
                onClick={() => {
                  setSucessfulDeletionPopup(false);
                }}
              >
                &times;
              </XButton>
            </XWrapper>
            <DoneMessageHeaderWrapper>
              <DoneMessageHeader>
                <img src="dark_green_check.svg" alt="Complete" width="78px" height="78px" />
                <WarningMessageWrapper>
                  <b>
                    {selectedUser?.firstName} {selectedUser?.lastName}
                  </b>{" "}
                  has been removed as a housing locator.
                </WarningMessageWrapper>
              </DoneMessageHeader>
              <ButtonsWrapper>
                <ConfirmDelete
                  kind="primary"
                  onClick={() => {
                    setSucessfulDeletionPopup(false);
                  }}
                >
                  Done
                </ConfirmDelete>
              </ButtonsWrapper>
            </DoneMessageHeaderWrapper>
          </Modal>
        </>
      )}
    </HLTableWrapper>
  );
};
