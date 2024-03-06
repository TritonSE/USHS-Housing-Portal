import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Unit, getUnit } from "@/api/units";
import { Page } from "@/components";
import { Button } from "@/components/Button";
import { NavBar } from "@/components/NavBar";
import { DataContext } from "@/contexts/DataContext";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fbf7f3;
  justify-content: evenly-spaced;
  column-gap: 10%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fbf7f3;
  justify-content: evenly-spaced;
  gap: 16px;
`;

const DetailsRow = styled(Row)`
  gap: 120px;
`;

const SectionColumn = styled(Column)`
  width: 50%;
`;

const MainColumn = styled(Column)`
  padding: 20px 8% 0 10%;
`;

const RentPerMonth = styled.h1`
  font-size: 48px;
  font-family: "Neutraface Text";
  font-weight: 700;
  line-height: 72px;
  line-spacing: 0.96px;

  margin: 0;
  padding: 0;
`;

const Header = styled.div`
  font-size: 32px;
  margin: 0;
  font-weight: 700;
  font-family: "Neutraface Text";
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

const Address = styled(Header)`
  padding: 0;
  margin: 0 0 5px 0;
`;
const DoesNotExist = styled(Header)`
  font-size: 48px;
  font-family: "Neutraface Text";
  font-weight: 700;
  line-height: 72px;
  line-spacing: 0.96px;
  padding: 20px 10px 10px 10%;
  margin: 0px;
`;

const ButtonPadding = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 100px 0px 0;
  margin: 20px 0 0 10%;
  justify-content: space-between;
`;

const PaddingInButton = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 0px 0px 0;
  justify-content: space-between;
  gap: 10px;
`;

export function UnitDetails() {
  const [unit, setUnit] = useState<Unit>();
  const { id } = useParams();
  const dataContext = useContext(DataContext);

  //checks for which view to return
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing((prevState) => !prevState);
    console.log(isEditing);
  };

  React.useEffect(() => {
    if (id !== undefined) {
      void getUnit(id).then((result) => {
        if (result.success) {
          setUnit(result.data);
        }
      });
    }
  }, []);

  if (!unit) {
    return (
      <Page>
        <Helmet>
          <title>Unit Does Not Exist | USHS Housing Portal</title>
        </Helmet>
        <NavBar page="Home" />
        <ButtonPadding>
          <Link to="/">
            <Button kind="secondary">Back to Listing</Button>
          </Link>
        </ButtonPadding>
        <DoesNotExist>This unit does not exist!</DoesNotExist>
      </Page>
    );
  }

  //checks for availability
  const availableNow = unit.availableNow ? "Available Now" : "Not Available";

  //move data into an array
  const rentingCriteria = unit.paymentRentingCriteria.map((criteria) => (
    <ListText key={criteria}>{criteria}</ListText>
  ));
  const appliances = unit.appliances.map((appliance) => (
    <ListText key={appliance}>{appliance}</ListText>
  ));
  const parkingRequirements = unit.parking.map((parking) => (
    <ListText key={parking}>{parking}</ListText>
  ));
  const communityFeatures = unit.communityFeatures.map((feature) => (
    <ListText key={feature}>{feature}</ListText>
  ));
  const accessibility = unit.accessibility.map((access) => (
    <ListText key={access}>{access}</ListText>
  ));
  const pets = unit.pets.map((pet) => <ListText key={pet}>{pet}</ListText>);
  const additionalRules = unit.additionalRules.map((rule) => (
    <ListText key={rule}>{rule}</ListText>
  ));

  if (dataContext.currentUser?.isHousingLocator) {
    return (
      <Page>
        <Helmet>
          <title>{unit.listingAddress} | USHS Housing Portal</title>
        </Helmet>
        <NavBar page="Home" />

        <ButtonPadding>
          <Link to="/">
            <Button kind="secondary">Back to Listing</Button>
          </Link>
          <Button kind="secondary" onClick={toggleEditing}>
            <PaddingInButton>
              <img className="edit-button-pen" src="/edit_button_pen.svg" alt={"Edit Button Pen"} />
              Edit
            </PaddingInButton>
          </Button>
        </ButtonPadding>
        <MainColumn>
          <Row>
            <RentPerMonth>${unit.monthlyRent}/month</RentPerMonth>
          </Row>
          <Row>
            <Address>{unit.listingAddress}</Address>
          </Row>
          <DetailsRow>
            <Row>
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
            </Row>
            <Column>
              <StrongText>Landlord: {unit.landlordFirstName + unit.landlordLastName}</StrongText>
              <ListText>{unit.landlordPhone}</ListText>
              <ListText>{unit.landlordEmail}</ListText>
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
              {rentingCriteria}
            </SectionColumn>
            <SectionColumn>
              <StrongText>Application Fee: </StrongText>
              <List>
                <ListText>${unit.applicationFeeCost}</ListText>
              </List>
            </SectionColumn>
          </Row>

          <Row>
            <Header>Housing Specifications</Header>
          </Row>
          <Row>
            <SectionColumn>
              <StrongText>Parking: </StrongText>
              {parkingRequirements}
              <StrongText>Pets/Animals: </StrongText>
              {pets}
              <StrongText>Appliances: </StrongText>
              {appliances}
              <StrongText>Housing Authority: </StrongText>
              <ListText> {unit.housingAuthority}</ListText>
              <StrongText>Additional Comments from Landlord: </StrongText>
              <ListText> {unit.landlordComments}</ListText>
            </SectionColumn>
            <SectionColumn>
              <StrongText>Accessibility Access: </StrongText>
              {accessibility}
              <StrongText>Sharing House Acceptable: </StrongText>
              <ListText>{unit.sharingAcceptable}</ListText>
              <StrongText>Community/Neighborhood Information: </StrongText>
              {communityFeatures}
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
              {unit.internalComments}
            </SectionColumn>
          </Row>
        </MainColumn>
      </Page>
    );
  } else {
    return (
      <Page>
        <Helmet>
          <title>{unit.listingAddress} | USHS Housing Portal</title>
        </Helmet>
        <NavBar page="Home" />

        <ButtonPadding>
          <Link to="/">
            <Button kind="secondary">Back to Listing</Button>
          </Link>
        </ButtonPadding>
        <MainColumn>
          <Row>
            <RentPerMonth>${unit.monthlyRent}/month</RentPerMonth>
          </Row>
          <Row>
            <Address>{unit.listingAddress}</Address>
          </Row>
          <DetailsRow>
            <Row>
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
            </Row>
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
              {rentingCriteria}
            </SectionColumn>
            <SectionColumn>
              <StrongText>Application Fee: </StrongText>
              <List>
                <ListText>${unit.applicationFeeCost}</ListText>
              </List>
            </SectionColumn>
          </Row>

          <Row>
            <Header>Housing Specifications</Header>
          </Row>
          <Row>
            <SectionColumn>
              <StrongText>Parking: </StrongText>
              {parkingRequirements}
              <StrongText>Pets/Animals: </StrongText>
              {pets}
              <StrongText>Appliances: </StrongText>
              {appliances}
              <StrongText>Housing Authority: </StrongText>
              <ListText> {unit.housingAuthority}</ListText>
              <StrongText>Additional Comments from Landlord: </StrongText>
              <ListText> {unit.landlordComments}</ListText>
            </SectionColumn>
            <SectionColumn>
              <StrongText>Accessibility Access: </StrongText>
              {accessibility}
              <StrongText>Sharing House Acceptable: </StrongText>
              <ListText>{unit.sharingAcceptable}</ListText>
              <StrongText>Community/Neighborhood Information: </StrongText>
              {communityFeatures}
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
              {unit.internalComments}
            </SectionColumn>
          </Row>
        </MainColumn>
      </Page>
    );
  }
}
