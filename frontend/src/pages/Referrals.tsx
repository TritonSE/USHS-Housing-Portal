import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { deleteReferral, getAllReferrals } from "@/api/referrals";
import { Referral } from "@/api/units";
import { getReferralsForUser } from "@/api/users";
import { Button } from "@/components/Button";
import { CheckboxRadioText } from "@/components/FilterCommon";
import { SearchBarContainer, SearchBarInput, SearchIcon } from "@/components/FilterDropdown";
import { CustomCheckboxRadio } from "@/components/ListingForm/CommonStyles";
import { NavBar } from "@/components/NavBar";
import { Page } from "@/components/Page";
import { ReferralPopup } from "@/components/ReferralPopup";
import { Table, TableCellContent } from "@/components/Table";
import { formatPhoneNumber } from "@/components/helpers";
import { DataContext } from "@/contexts/DataContext";

const TABLE_COLUMN_NAMES = [
  "Name",
  "Email",
  "Phone Number",
  "ID",
  "Referring Staff",
  "Status",
  "View",
  "Delete",
];
const ENTRIES_PER_PAGE = 6;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
  padding: 50px 96px;
`;

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

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Radio = styled(CustomCheckboxRadio)`
  width: 32px;
  height: 32px;
`;

const RadioLabel = styled(CheckboxRadioText)`
  font-size: 20px;
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

enum ReferralFilterOption {
  MY_REFERRALS = "My Referrals",
  ALL_REFERRALS = "All Referrals",
}

export function Referrals() {
  const dataContext = useContext(DataContext);

  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [filteredReferrals, setFilteredReferrals] = useState<Referral[]>([]);
  const [filterMode, setFilterMode] = useState(ReferralFilterOption.MY_REFERRALS);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [popup, setPopup] = useState<boolean>(false);
  const [showNewClientPopup, setShowNewClientPopup] = useState<boolean>(false);
  const [successfulRemovalPopup, setSuccessfulRemovalPopup] = useState<boolean>(false);

  const fetchReferrals = () => {
    if (filterMode === ReferralFilterOption.MY_REFERRALS) {
      if (dataContext.currentUser) {
        getReferralsForUser(dataContext.currentUser)
          .then((res) => {
            if (res.success) {
              setReferrals(res.data);
            }
          })
          .catch(console.error);
      }
    } else {
      getAllReferrals()
        .then((res) => {
          if (res.success) {
            setReferrals(res.data);
          }
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    setFilteredReferrals(
      referrals
        .filter((referral) => {
          return (
            referral.renterCandidate.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
            referral.renterCandidate.lastName.toLowerCase().includes(searchValue.toLowerCase())
          );
        })
        .sort((a, b) => a.renterCandidate.firstName.localeCompare(b.renterCandidate.firstName)),
    );
  }, [referrals, searchValue]);

  useEffect(fetchReferrals, [filterMode, dataContext.currentUser]);

  const handleDelete = (referral: Referral) => {
    deleteReferral(referral._id)
      .then((response) => {
        if (response.success) {
          fetchReferrals();
          setPopup(false);
          setSuccessfulRemovalPopup(true);
        }
      })
      .catch(console.error);
  };

  return (
    <Page>
      <NavBar page="Referrals" />
      <Content>
        <TopRow>
          <HeaderText>Referrals</HeaderText>
          <FilterContainer>
            <RadioGroup>
              <Radio
                id="my-referrals"
                type="radio"
                checked={filterMode === ReferralFilterOption.MY_REFERRALS}
                onChange={() => {
                  setFilterMode(ReferralFilterOption.MY_REFERRALS);
                }}
              />
              <RadioLabel htmlFor="my-referrals">My Referrals</RadioLabel>
            </RadioGroup>
            <RadioGroup>
              <Radio
                id="all-referrals"
                type="radio"
                checked={filterMode === ReferralFilterOption.ALL_REFERRALS}
                onChange={() => {
                  setFilterMode(ReferralFilterOption.ALL_REFERRALS);
                }}
              />
              <RadioLabel htmlFor="all-referrals">All Referrals</RadioLabel>
            </RadioGroup>
            <SearchBarContainer>
              <SearchBarInput
                placeholder="Search Client"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
              <SearchIcon src="/search.svg" />
            </SearchBarContainer>
            <AddButton
              kind="primary"
              onClick={() => {
                setShowNewClientPopup(true);
              }}
            >
              <img src={"/plus_sign.svg"} alt="" style={{ marginRight: "8px" }} />
              Add Client
            </AddButton>
          </FilterContainer>
        </TopRow>
        <Table
          columns={TABLE_COLUMN_NAMES}
          rows={
            filteredReferrals
              ? filteredReferrals.map((referral, idx) => {
                  const { renterCandidate, assignedReferringStaff, status } = referral;

                  return [
                    renterCandidate.firstName + " " + renterCandidate.lastName,
                    renterCandidate.email,
                    formatPhoneNumber(renterCandidate.phone),
                    renterCandidate.uid,
                    assignedReferringStaff.firstName + " " + assignedReferringStaff.lastName,
                    status,
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
        <ReferralPopup
          active={showNewClientPopup}
          onClose={() => {
            setShowNewClientPopup(false);
          }}
          onSubmit={() => {
            //
          }}
          newCandidateOnly
        />
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
              <HeadingWrapper>Remove Referral</HeadingWrapper>
              <WarningMessageWrapper>
                Are you sure you want to remove this referral for{" "}
                <b>
                  {selectedReferral.renterCandidate.firstName}{" "}
                  {selectedReferral.renterCandidate.lastName}
                </b>
                ?
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
                  }}
                >
                  Remove
                </ConfirmDelete>
              </ButtonsWrapper>
            </Modal>
          </>
        )}
        {successfulRemovalPopup && (
          <>
            <Overlay />
            <Modal>
              <XWrapper>
                <XButton
                  onClick={() => {
                    setSuccessfulRemovalPopup(false);
                  }}
                >
                  &times;
                </XButton>
              </XWrapper>
              <DoneMessageHeaderWrapper>
                <DoneMessageHeader>
                  <img src="dark_green_check.svg" alt="Complete" width="78px" height="78px" />
                  <WarningMessageWrapper>
                    The referral for {selectedReferral?.renterCandidate.firstName}{" "}
                    {selectedReferral?.renterCandidate.lastName} has been <b>removed</b>.
                  </WarningMessageWrapper>
                </DoneMessageHeader>
                <ButtonsWrapper>
                  <ConfirmDelete
                    kind="primary"
                    onClick={() => {
                      setSuccessfulRemovalPopup(false);
                    }}
                  >
                    Done
                  </ConfirmDelete>
                </ButtonsWrapper>
              </DoneMessageHeaderWrapper>
            </Modal>
          </>
        )}
      </Content>
    </Page>
  );
}
