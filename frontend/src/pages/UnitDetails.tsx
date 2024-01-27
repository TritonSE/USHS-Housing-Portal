import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";

import { Unit, getUnit } from "@/api/units";
import { Page } from "@/components";
// import { privateDecrypt } from "crypto";

import { render } from "react-dom";
import styled from "styled-components";


const Row = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fbf7f3;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fbf7f3;
  jusify-content: evenly-spaced;
  gap: 16px;
`;

const DetailsRow = styled(Row)`
  gap: 10px;
`;

const SectionColumn = styled(Column)`
  width: 50%;
`;

const MainColumn = styled(Column)`
  padding: 10%;
`;

const RentPerMonth = styled.h1`
  font-size: 48px;
  font-family: "Neutra Text";
  font-weight: 700;
  line-height: 150%;
  line-spacing: 0.96px;

  margin: 0;
`;

const Header = styled.div`
  font-size: 32px;
  margin: 0;
  font-weight: 700;
  font-family: "Neutra Text";
  line-height: 150%;
  line-spacing: 0.64px;
  margin-top: 32px;
`;

const Text = styled.div`
  font-family: "Montserrat"
  font-weight: 400;
  font-size: 20px;
  line-height: 150%
  letter-spacing: 0.4px;

`;

const StrongText = styled(Text)`
  font-weight: 600;
`;

const ListText = styled(Text)``;

const Address = styled(Header)``;

const UnitDetails = () => (
  <MainColumn>
    <Row>
      <RentPerMonth>123/month</RentPerMonth>
    </Row>
    <Row>
      <Address>123 a st.</Address>
    </Row>
    <DetailsRow>
      <Column>
        <StrongText>2</StrongText>
        <Text>beds</Text>
      </Column>
      <Column>
        <StrongText>2</StrongText>
        <Text>beds</Text>
      </Column>
      <Column>
        <StrongText>2</StrongText>
        <Text>beds</Text>
      </Column>
      <Column>
        <StrongText>Available Text</StrongText>
      </Column>
    </DetailsRow>

    <Row>
      <Header>Fees</Header>
    </Row>
    <Row>
      <SectionColumn>
        <StrongText>Security Deposit: </StrongText>
        <ListText> $1390</ListText>
        <StrongText>Payment/Renting Criteria: </StrongText>
        <ListText> Credit check required</ListText>
      </SectionColumn>
      <SectionColumn>
        <StrongText>Applicaton Fee: </StrongText>
        <ListText> $20</ListText>
        <StrongText>Holding Fee: </StrongText>
        <ListText> Not Applicable</ListText>
      </SectionColumn>
    </Row>

    <Row>
      <Header>Housing Specifications</Header>
    </Row>
    <Row>
      <SectionColumn>
        <StrongText>Parking: </StrongText>
        <StrongText>Pets/Animals: </StrongText>
        <StrongText>Appliances: </StrongText>
        <StrongText>Housing Authority: </StrongText>
        <StrongText>Additional Comments from Landlord: </StrongText>
      </SectionColumn>
      <SectionColumn>
        <StrongText>Accessibility Access: </StrongText>
        <StrongText>Sharing House Acceptable: </StrongText>
        <StrongText>Community/Neighborhood Information: </StrongText>
      </SectionColumn>
    </Row>

    <Row>
      <Header>Additional Information</Header>
    </Row>
    <Row>
      <SectionColumn>
        <StrongText>Where Was Unit Found: </StrongText>
        <StrongText>Additional Rules and Regulation: </StrongText>
      </SectionColumn>
      <SectionColumn>
        <StrongText>Notes from Housing Locator: </StrongText>
      </SectionColumn>
    </Row>
  </MainColumn>
);

render(<UnitDetails />, document.getElementById("root"));
