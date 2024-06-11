import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { deleteReferral, getAllReferrals, getHousingLocatorReferrals } from "@/api/referrals";
import { Referral } from "@/api/units";
import { Button } from "@/components/Button";
import { NavBar } from "@/components/NavBar";
import { Page } from "@/components/Page";
import ReferralFilter from "@/components/ReferralFilter";
import { Table, TableCellContent } from "@/components/Table";
import { DataContext } from "@/contexts/DataContext";

const TABLE_COLUMN_NAMES = [
  "Name",
  "Email",
  "Phone Number",
  "ID",
  "Referring Staff",
  "View",
  "Delete",
];
const ENTRIES_PER_PAGE = 6;

const HeaderText = styled.h1`
  color: black;
  font-size: 32px;
  font-weight: 700;
  line-height: 48px;
  letter-spacing: 0.64px;
  word-wrap: break-word;
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 50px 96px 50px 96px;
  justify-content: space-between;
`;

const AddButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 27px;
`;

const TableWrapper = styled.div`
  margin: 40px;
  margin-top: 30px;
  margin-bottom: 30px;
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

const ViewButton = styled(Link)`
  align-items: center;
  width: 88px;
  height: 40 px;

  padding: 8px 24px 8px 24px;
  gap: 12px;
  border-radius: 12px;
  border: 1px solid #b64201;

  font-family: Montserrat;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: #b64201;
  text-decoration: none;

  &:hover {
    background: #ec85371a;
  }
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

export function Referrals() {
  const dataContext = useContext(DataContext);

  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [myReferrals, setMyReferrals] = useState<Referral[]>([]);
  const [viewMode, setViewMode] = useState("My Clients");
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [popup, setPopup] = useState<boolean>(false);
  const [sucessfulDeletionPopup, setSucessfulDeletionPopup] = useState<boolean>(false);

  // this is not working
  const getReferrals = () => {
    getAllReferrals()
      .then((res) => {
        if (res.success) {
          setReferrals(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMyReferrals = () => {
    if (dataContext.currentUser !== null && dataContext.currentUser.isHousingLocator) {
      getHousingLocatorReferrals(dataContext.currentUser._id)
        .then((res) => {
          if (res.success) {
            setMyReferrals(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleFilterChange = (filter: string) => {
    setViewMode(filter); // Update the view mode based on the filter selection
  };

  const handleDelete = (referral: Referral) => {
    setSelectedReferral(referral);
    deleteReferral(referral)
      .then((value) => {
        if (value.success) {
          dataContext.refetchData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getReferrals();
  }, [referrals]);

  useEffect(() => {
    getMyReferrals();
  }, [myReferrals]);

  return (
    <Page>
      <NavBar page="Referrals" />
      <TopRow>
        <HeaderText>Referrals</HeaderText>
        <FilterContainer>
          <ReferralFilter option1="My Clients" option2="All Clients"></ReferralFilter>
          <AddButton kind="primary">
            <img src={"/plus_sign.svg"} alt="" style={{ marginRight: "8px" }} />
            Add Client
          </AddButton>
        </FilterContainer>
      </TopRow>
      <TableWrapper>
        {viewMode === "My Clients" ? (
          <Table
            columns={TABLE_COLUMN_NAMES}
            rows={
              myReferrals
                ? myReferrals
                    .sort((a, b) =>
                      a.renterCandidate.firstName.localeCompare(b.renterCandidate.firstName),
                    )
                    .map((referral, idx) => {
                      const { renterCandidate, assignedReferringStaff } = referral;

                      return [
                        renterCandidate.firstName + " " + renterCandidate.lastName,
                        renterCandidate.email,
                        renterCandidate.phone,
                        renterCandidate._id,
                        assignedReferringStaff.firstName + " " + assignedReferringStaff.lastName,
                        <ViewButton key={`view-${idx}`} to={`/candidate/${renterCandidate._id}`}>
                          View
                        </ViewButton>,
                        <DeleteIcon
                          key={`delete-${idx}`}
                          src="/trash-can.svg"
                          onClick={() => {
                            if (referral !== null) {
                              setSelectedReferral(referral);
                              setPopup(true);
                            }
                          }}
                        />,
                      ] as TableCellContent[];
                    })
                : []
            }
            rowsPerPage={ENTRIES_PER_PAGE}
          />
        ) : (
          <Table
            columns={TABLE_COLUMN_NAMES}
            rows={
              referrals
                ? referrals
                    .sort((a, b) =>
                      a.renterCandidate.firstName.localeCompare(b.renterCandidate.firstName),
                    )
                    .map((referral, idx) => {
                      const { renterCandidate, assignedReferringStaff } = referral;

                      return [
                        renterCandidate.firstName + " " + renterCandidate.lastName,
                        renterCandidate.email,
                        renterCandidate.phone,
                        renterCandidate._id,
                        assignedReferringStaff.firstName + " " + assignedReferringStaff.lastName,
                        <ViewButton key={`view-${idx}`} to={`/candidate/${renterCandidate._id}`}>
                          View
                        </ViewButton>,
                        <DeleteIcon
                          key={`delete-${idx}`}
                          src="/trash-can.svg"
                          onClick={() => {
                            if (referral !== null) {
                              setSelectedReferral(referral);
                              setPopup(true);
                            }
                          }}
                        />,
                      ] as TableCellContent[];
                    })
                : []
            }
            rowsPerPage={ENTRIES_PER_PAGE}
          />
        )}
      </TableWrapper>
      {popup && selectedReferral && (
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
                {selectedReferral.renterCandidate.firstName}{" "}
                {selectedReferral.renterCandidate.lastName}
              </b>{" "}
              as a client?
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
                  handleDelete(selectedReferral);
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
                  {selectedReferral?.renterCandidate.firstName}{" "}
                  {selectedReferral?.renterCandidate.lastName} has been <b>removed</b> as a client.
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
    </Page>
  );
}
