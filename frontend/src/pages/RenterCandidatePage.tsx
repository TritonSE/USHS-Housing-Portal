import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Loading } from "./Loading";

import { RenterCandidate, getRenterCandidate } from "@/api/renter-candidates";
import { Referral } from "@/api/units";
import { Page } from "@/components";
import { Button } from "@/components/Button";
import { NavBar } from "@/components/NavBar";
import { Table, TableCellContent } from "@/components/Table";
import { formatDate } from "@/components/helpers";

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
  font-size: 18px;
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

export function RenterCandidatePage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [renterCandidate, setRenterCandidate] = useState<RenterCandidate>();
  const [renterReferrals, setRenterReferrals] = useState<Referral[]>();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

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

  React.useEffect(fetchRenterCandidate, []);

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
              Back
            </Button>
          </Link>
          <EditButton kind="secondary">
            <img src={"/pencil.svg"} alt="" style={{ marginRight: "12px" }} />
            Edit
          </EditButton>
        </TopRow>
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
                    // return list of cells for each row
                    return [
                      <ListingAddressLink
                        key={`listing-address-${idx}`}
                        to={`/unit/${unit._id}`}
                        state={{ prevPage: pathname }}
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
      </MainColumn>
    </Page>
  );
}
