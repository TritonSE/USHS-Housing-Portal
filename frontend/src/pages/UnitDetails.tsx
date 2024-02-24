import React, { useState } from "react";
import { JSX } from "react/jsx-runtime";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Unit, getUnit } from "@/api/units";
import { Page } from "@/components";
import { Button } from "@/components/Button";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fbf7f3;
  jusify-content: evenly-spaced;
  column-gap: 10%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fbf7f3;
  jusify-content: evenly-spaced;
  gap: 16px;
`;

const DetailsRow = styled(Row)`
  gap: 20px;
`;

const SectionColumn = styled(Column)`
  width: 50%;
`;

const MainColumn = styled(Column)`
  padding: 10%;
`;

const RentPerMonth = styled.h1`
  font-size: 48px;
  font-family: "Montserrat";
  font-weight: 600;
  line-height: 150%;
  line-spacing: 0.96px;

  margin: 0;
`;

const Header = styled.div`
  font-size: 32px;
  margin: 0;
  font-weight: 700;
  font-family: "Montserrat";
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

const List = styled.ul`
  margin-top: 0;
  margin-bottom: 0;

  padding: 0, 0, 0, 10%;
`;

const StrongText = styled(Text)`
  font-weight: 600;
`;

const ListText = styled.li`
    font-family: "Montserrat";
    font-weight: 400;
    font-size: 20px;
    line-height: 150%
    letter-spacing: 0.4px;
    margin-left: 6%;
    flex-wrap: wrap;
    margin-right: 10px;
  `;

const Address = styled(Header)``;

const ButtonPadding = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 10% 0px 10%;
`;

const DoesNotExist = styled.h1`
  font-size: 48px;
  font-family: "Neutraface Text", sans-serif;
  font-weight: 550;
  line-height: 150%;
  line-spacing: 0.96px;
  padding: 20px 10% 20px 10%;
`;

export function UnitDetails() {
  const [unit, setUnit] = useState<Unit>();
  const { id } = useParams();

  React.useEffect(() => {
    if (id !== undefined) {
      void getUnit(id).then((result) => {
        if (result.success) {
          setUnit(result.data);
        }
      });
    } else {
      return (
        <Page>
          <Helmet>
            <title>Unit Does Not Exist | USHS Housing Portal</title>
          </Helmet>
          <Column>
            <ButtonPadding>
              <Link to="/">
                <Button kind="secondary">Back to Listing</Button>
              </Link>
            </ButtonPadding>
            <DoesNotExist>This unit does not exist!</DoesNotExist>
          </Column>
        </Page>
      );
    }
  }, []);

  //page returned if unit does not exist
  if (unit === undefined) {
    return (
      <Page>
        <Helmet>
          <title>Unit Does Not Exist | USHS Housing Portal</title>
        </Helmet>
        <Column>
          <ButtonPadding>
            <Link to="/">
              <Button kind="secondary">Back to Listing</Button>
            </Link>
          </ButtonPadding>
          <DoesNotExist>This unit does not exist!</DoesNotExist>
        </Column>
      </Page>
    );
  }

  //checks for avaliability
  let availableNow = "Not Available";
  if (unit.availableNow) {
    availableNow = "Available Now";
  }

  //move data into an array
  const rentingCriteria = unit.paymentRentingCriteria.map((criteria) => (
    <li key={criteria}>{criteria}</li>
  ));
  const appliances = unit.appliances.map((appliance) => <li key={appliance}>{appliance}</li>);
  const parkingRequirements = unit.parking.map((parking) => <li key={parking}>{parking}</li>);
  const communityFeatures = unit.communityFeatures.map((feature) => (
    <li key={feature}>{feature}</li>
  ));
  const accessibility = unit.accessibility.map((access) => <li key={access}>{access}</li>);
  const pets = unit.pets.map((pet) => <li key={pet}>{pet}</li>);

  let additionalRules:
    | string
    | number
    | boolean
    | JSX.Element[]
    | React.ReactElement
    | Iterable<React.ReactNode>
    | null
    | undefined;
  if (unit.additionalRules !== undefined) {
    additionalRules = unit.additionalRules.map((rule) => <li key={rule}>{rule}</li>);
  } else {
    additionalRules = "None";
  }
  const UnitDetailsPage = () => (
    <MainColumn>
      <Row>
        <RentPerMonth>${unit.monthlyRent}/month</RentPerMonth>
      </Row>
      <Row>
        <Address>{unit.listingAddress}</Address>
      </Row>
      <DetailsRow>
        <Column>
          <StrongText>{unit.numBeds}</StrongText>
          <Text>beds</Text>
        </Column>
        <Column>
          <StrongText>{unit.numBaths}</StrongText>
          <Text>baths</Text>
        </Column>
        <Column>
          <StrongText>{unit.sqft}</StrongText>
          <Text>sqft</Text>
        </Column>
        <Column>
          <StrongText>{availableNow}</StrongText>
        </Column>
      </DetailsRow>

      <Row>
        <Header>Fees</Header>
      </Row>
      <Row>
        <SectionColumn>
          <StrongText>Security Deposit: </StrongText>
          <List>
            <ListText> ${unit.securityDeposit}</ListText>
          </List>
          <StrongText>Payment/Renting Criteria: </StrongText>
          <ListText>{rentingCriteria}</ListText>
        </SectionColumn>
        <SectionColumn>
          <StrongText>Applicaton Fee: </StrongText>
          <List>
            <ListText>${unit.applicationFeeCost}</ListText>
          </List>
          <StrongText>Holding Fee: </StrongText>
          <List>
            <ListText>${unit.holdingFeeAmount}</ListText>
          </List>
        </SectionColumn>
      </Row>

      <Row>
        <Header>Housing Specifications</Header>
      </Row>
      <Row>
        <SectionColumn>
          <StrongText>Parking: </StrongText>
          <ListText>{parkingRequirements}</ListText>
          <StrongText>Pets/Animals: </StrongText>
          <ListText>{pets}</ListText>
          <StrongText>Appliances: </StrongText>
          <ListText>{appliances}</ListText>
          <StrongText>Housing Authority: </StrongText>
          <ListText>{unit.housingAuthority}</ListText>
          <StrongText>Additional Comments from Landlord: </StrongText>
          <ListText>{unit.landlordComments}</ListText>
        </SectionColumn>
        <SectionColumn>
          <StrongText>Accessibility Access: </StrongText>
          <ListText>{accessibility}</ListText>
          <StrongText>Sharing House Acceptable: </StrongText>
          <ListText>{unit.sharingAcceptable}</ListText>
          <StrongText>Community/Neighborhood Information: </StrongText>
          <ListText>{communityFeatures}</ListText>
        </SectionColumn>
      </Row>

      <Row>
        <Header>Additional Information</Header>
      </Row>
      <Row>
        <SectionColumn>
          <StrongText>Where Was Unit Found: </StrongText>
          <ListText>{unit.whereFound}</ListText>
          <StrongText>Additional Rules and Regulation: </StrongText>
          <ListText>{additionalRules}</ListText>
        </SectionColumn>
        <SectionColumn>
          <StrongText>Notes from Housing Locator: </StrongText>
          <ListText>{unit.internalNotes}</ListText>
        </SectionColumn>
      </Row>
    </MainColumn>
  );

  return (
    <Page>
      <Helmet>
        <title>{unit._id} | USHS Housing Portal</title>
      </Helmet>

      <ButtonPadding>
        <Link to="/">
          <Button kind="secondary">Back to Listing</Button>
        </Link>
      </ButtonPadding>
      <UnitDetailsPage></UnitDetailsPage>
    </Page>
  );
}
