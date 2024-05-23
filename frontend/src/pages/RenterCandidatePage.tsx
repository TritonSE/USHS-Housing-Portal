import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Loading } from "./Loading";

import { UpdateReferralRequest, updateReferral } from "@/api/referrals";
import { RenterCandidate, editRenterCandidate, getRenterCandidate } from "@/api/renter-candidates";
import { Referral } from "@/api/units";
import { Page } from "@/components";
import { Button } from "@/components/Button";
import { NavBar } from "@/components/NavBar";
import { ReferralTableDropDown } from "@/components/ReferralTableDropDown";
import { Table, TableCellContent } from "@/components/Table";
import { UserDropdown } from "@/components/UserDropdown";
import { formatDate } from "@/components/helpers";
import { DataContext } from "@/contexts/DataContext";

const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fbf7f3;
  margin: 28px 96px;
  gap: 35px;
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

const InfoRow = styled(Row)`
  gap: 150px;
  align-items: flex-start;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.p`
  font-size: 32px;
  font-family: "Neutraface Text";
  font-weight: 650;
`;

const Id = styled.p`
  font-size: 25px;
  font-family: "Montserrat";
  font-weight: 600;
`;

const InfoHeader = styled.p`
  font-size: 20px;
  margin-top: 10px;
  font-family: "Montserrat";
  font-weight: 600;
`;

const InfoText = styled(InfoHeader)`
  font-weight: 400;
`;

const EditButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ListingAddressLink = styled(Link)`
  text-align: center;
  text-decoration: underline;
  color: black;

  &:hover {
    color: #4248d4;
  }
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

const EditSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 54px;
`;

const EditColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const InputBox = styled.input<{ width: string }>`
  background: white;
  border-radius: 4px;
  border: 1px solid var(--Neutral-Gray3, #b4b4b4);
  display: flex;
  padding: 6px 12px;
  align-items: flex-start;
  width: ${(props) => props.width};

  color: #484848;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: 0.4px;
`;

const InputLabel = styled.div`
  color: #000;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 30px */
  letter-spacing: 0.4px;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

type ReferralQuery = Record<string, Partial<UpdateReferralRequest>>;

export function RenterCandidatePage() {
  const navigate = useNavigate();
  const [renterCandidate, setRenterCandidate] = useState<RenterCandidate>();
  const [renterReferrals, setRenterReferrals] = useState<Referral[]>();
  const { allHousingLocators } = useContext(DataContext);

  const [editRenterQuery, setEditRenterQuery] = useState<Partial<RenterCandidate>>({});
  const [editReferralQuery, setEditReferralQuery] = useState<ReferralQuery>({});

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const HousingAuthorityOptions = ["LACDA", "HACLA"];

  const REFERRAL_STATUSES = [
    "Referred",
    "Viewing",
    "Pending",
    "Approved",
    "Denied",
    "Leased",
    "Canceled",
  ];

  const fetchRenterCandidate = () => {
    if (id !== undefined) {
      setLoading(true);
      void getRenterCandidate(id).then((result) => {
        if (result.success) {
          const { renter, referrals } = result.data;
          setRenterCandidate(renter);
          setRenterReferrals(referrals);
        } else {
          // Go back to the referrals page if the renter is not found
          navigate("/referrals");
        }
        setLoading(false);
      });
    }
  };

  const handleUpdateRenter = () => {
    if (Object.keys(editRenterQuery).length !== 0) {
      editRenterCandidate(renterCandidate?._id ?? "", editRenterQuery)
        .then((value) => {
          if (value.success) {
            fetchRenterCandidate();
          }
        })
        .catch(console.error);
    }
  };

  const handleUpdateReferrals = () => {
    for (const referralId in editReferralQuery) {
      console.log({ ...editReferralQuery[referralId], id: referralId });
      updateReferral({ ...editReferralQuery[referralId], id: referralId })
        .then((value) => {
          if (value.success) {
            fetchRenterCandidate();
          }
        })
        .catch(console.error);
    }
  };

  useEffect(fetchRenterCandidate, []);

  useEffect(() => {
    console.log(editReferralQuery);
  }, [editReferralQuery]);

  if (loading || !renterCandidate) {
    return <Loading />;
  }

  return (
    <Page>
      <Helmet>
        <title>
          {renterCandidate.firstName} {renterCandidate.lastName} | USHS Housing Portal
        </title>
      </Helmet>
      <NavBar />
      <MainColumn>
        <TopRow>
          <Link
            to={".."}
            onClick={(e) => {
              e.preventDefault();
              // go back relative to navigation history
              navigate(-1);
            }}
          >
            <Button kind="secondary">
              <img
                className="back-arrow"
                src="/back_arrow.svg"
                alt={"Back arrow"}
                style={{ marginRight: "12px" }}
              />
              Back to Listing
            </Button>
          </Link>
          <EditButton
            kind="secondary"
            onClick={() => {
              if (!isEditing) {
                setEditRenterQuery({});
                setEditReferralQuery({});
              } else {
                handleUpdateRenter();
                handleUpdateReferrals();
              }
              setIsEditing(!isEditing);
            }}
          >
            <img src={"/pencil.svg"} alt="" style={{ marginRight: "12px" }} />
            {isEditing ? "Save Changes" : "Edit"}
          </EditButton>
        </TopRow>
        {isEditing ? (
          <>
            <EditSection>
              <EditColumn>
                <InputSection>
                  <InputLabel>Name:</InputLabel>
                  <InputBox
                    width="300px"
                    defaultValue={renterCandidate.firstName + " " + renterCandidate.lastName}
                    onInput={(e) => {
                      const fullName = (e.target as HTMLTextAreaElement).value.split(" ");
                      setEditRenterQuery({
                        ...editRenterQuery,
                        firstName: fullName[0],
                        lastName: fullName[1] ?? "",
                      });
                    }}
                  />
                </InputSection>
                <InfoHeader>Contact Info:</InfoHeader>
                <InputSection>
                  <InputLabel>Phone Number:</InputLabel>
                  <InputBox
                    width="300px"
                    defaultValue={renterCandidate.phone}
                    onInput={(e) => {
                      setEditRenterQuery({
                        ...editRenterQuery,
                        phone: (e.target as HTMLTextAreaElement).value,
                      });
                    }}
                  />
                </InputSection>
                <InputSection>
                  <InputLabel>Email:</InputLabel>
                  <InputBox
                    width="300px"
                    defaultValue={renterCandidate.email}
                    onInput={(e) => {
                      setEditRenterQuery({
                        ...editRenterQuery,
                        email: (e.target as HTMLTextAreaElement).value,
                      });
                    }}
                  />
                </InputSection>
              </EditColumn>
              <EditColumn>
                <InputSection>
                  <InputLabel>Unique ID:</InputLabel>
                  <InputBox
                    width="275px"
                    defaultValue={renterCandidate.uid}
                    onInput={(e) => {
                      setEditRenterQuery({
                        ...editRenterQuery,
                        uid: (e.target as HTMLTextAreaElement).value,
                      });
                    }}
                  />
                </InputSection>
                <EditSection>
                  <EditColumn>
                    <InfoHeader>Family Information:</InfoHeader>
                    <InputSection>
                      <InputLabel>Number of Adults:</InputLabel>
                      <InputBox
                        width="40px"
                        defaultValue={renterCandidate.adults}
                        onInput={(e) => {
                          setEditRenterQuery({
                            ...editRenterQuery,
                            adults: Number((e.target as HTMLTextAreaElement).value),
                          });
                        }}
                      />
                    </InputSection>
                    <InputSection>
                      <InputLabel>Number of Children:</InputLabel>
                      <InputBox
                        width="40px"
                        defaultValue={renterCandidate.children}
                        onInput={(e) => {
                          setEditRenterQuery({
                            ...editRenterQuery,
                            children: Number((e.target as HTMLTextAreaElement).value),
                          });
                        }}
                      />
                    </InputSection>
                  </EditColumn>
                  <EditColumn>
                    <InfoHeader>Housing Program:</InfoHeader>
                    <ReferralTableDropDown
                      values={HousingAuthorityOptions}
                      defaultValue="LACDA"
                      onSelect={(program) => {
                        setEditRenterQuery({
                          ...editRenterQuery,
                          program,
                        });
                      }}
                    />
                  </EditColumn>
                </EditSection>
              </EditColumn>
            </EditSection>
            <TableContainer>
              <Title>Current Referrals</Title>
              <Table
                columns={["Unit", "Housing Locator", "Status", "Last Updated", "Delete"]}
                rows={
                  renterReferrals
                    ? renterReferrals.map((referral, idx) => {
                        const { unit, assignedHousingLocator, status, updatedAt } = referral;
                        // return list of cells for each row
                        return [
                          <ListingAddressLink
                            key={`listing-address-${idx}`}
                            to={`/unit/${unit._id}`}
                          >
                            {unit.listingAddress}
                          </ListingAddressLink>,
                          <UserDropdown
                            key={idx}
                            width="200px"
                            placeholder="Search"
                            initialSelection={assignedHousingLocator}
                            options={allHousingLocators}
                            onSelect={(housingLocator) => {
                              setEditReferralQuery({
                                ...editReferralQuery,
                                [referral._id]: {
                                  ...editReferralQuery[referral._id],
                                  housingLocator: housingLocator._id,
                                },
                              });
                            }}
                          />,
                          <ReferralTableDropDown
                            key={idx}
                            values={REFERRAL_STATUSES}
                            defaultValue={status}
                            onSelect={(newStatus) => {
                              setEditReferralQuery({
                                ...editReferralQuery,
                                [referral._id]: {
                                  ...editReferralQuery[referral._id],
                                  status: newStatus,
                                },
                              });
                            }}
                          />,
                          formatDate(updatedAt.toString()),
                          <DeleteIcon
                            key={`delete-${idx}`}
                            src="/trash-can.svg"
                            onClick={() => {
                              // TODO
                            }}
                          ></DeleteIcon>,
                        ] as TableCellContent[];
                      })
                    : []
                }
                rowsPerPage={5}
              />
            </TableContainer>
          </>
        ) : (
          <>
            <Row>
              <Title>
                {renterCandidate.firstName} {renterCandidate.lastName}
              </Title>
              <Id>#{renterCandidate.uid}</Id>
            </Row>
            <InfoRow>
              <InfoColumn>
                <InfoHeader>Contact Info:</InfoHeader>
                <InfoText>Phone: {renterCandidate.phone}</InfoText>
                <InfoText>Email: {renterCandidate.email}</InfoText>
              </InfoColumn>
              <InfoColumn>
                <InfoHeader>Family Information:</InfoHeader>
                <InfoText>Number of Adults: {renterCandidate.adults}</InfoText>
                <InfoText>Number of Children: {renterCandidate.children}</InfoText>
              </InfoColumn>
              <InfoColumn>
                <InfoHeader>Housing Program:</InfoHeader>
                <InfoText>{renterCandidate.program}</InfoText>
              </InfoColumn>
            </InfoRow>
            <TableContainer>
              <Title>Current Referrals</Title>
              <Table
                columns={["Unit", "Housing Locator", "Status", "Last Updated", "Delete"]}
                rows={
                  renterReferrals
                    ? renterReferrals.map((referral, idx) => {
                        const { unit, assignedHousingLocator, status, updatedAt } = referral;
                        console.log(referral);
                        // return list of cells for each row
                        return [
                          <ListingAddressLink
                            key={`listing-address-${idx}`}
                            to={`/unit/${unit._id}`}
                          >
                            {unit.listingAddress}
                          </ListingAddressLink>,
                          assignedHousingLocator.firstName + " " + assignedHousingLocator.lastName,
                          status,
                          formatDate(updatedAt.toString()),
                          <DeleteIcon
                            key={`delete-${idx}`}
                            src="/trash-can.svg"
                            onClick={() => {
                              // TODO
                            }}
                          ></DeleteIcon>,
                        ] as TableCellContent[];
                      })
                    : []
                }
                rowsPerPage={5}
              />
            </TableContainer>
          </>
        )}
      </MainColumn>
    </Page>
  );
}
