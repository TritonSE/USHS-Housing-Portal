import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Unit, approveUnit, getUnit, updateUnit } from "@/api/units";
import { Page } from "@/components";
import { NavBar } from "@/components/NavBar";
import { getRenterCandidate, RenterCandidate } from "@/api/renter-candidates";

export function RenterCandidate() {
  const navigate = useNavigate();
  const [renterCandidate, setRenterCandidate] = useState<RenterCandidate>();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const fetchRenterCandidate = () => {
    if (id !== undefined) {
      setLoading(true);
      void getRenterCandidate(id).then((result) => {
        if (result.success) {
          setRenterCandidate(result.data);
        } else {
          // Go back to the home page if the renter is not found
          navigate("/");
        }
        setLoading(false);
      });
    }
  };

  React.useEffect(fetchRenterCandidate, []);

  if (loading || !renterCandidate) {
    // TODO: Loading state
    return null;
  }

  const MainColumn = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fbf7f3;
    margin: 97px;
    gap: 35px;
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

  const Name = styled.p`
    font-size: 40px;
    font-family: "Neutraface Text";
    font-weight: 700;
  `;

  const Id = styled.p`
    font-size: 25px;
    font-family: "Neutraface Text";
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

  return (
    <Page>
      <Helmet>
        <title>{} | USHS Housing Portal</title>
      </Helmet>
      <NavBar />
      <MainColumn>
        <Row>
          <Name>
            {renterCandidate.firstName} {renterCandidate.lastName}
          </Name>
          <Id>#{renterCandidate._id}</Id>
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
          <InfoColumn>
            <InfoHeader>Referring Staff:</InfoHeader>
            <InfoText>John Doe</InfoText>
          </InfoColumn>
        </InfoRow>
      </MainColumn>
    </Page>
  );
}
