import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Unit, getUnit } from "@/api/units";
import { Page } from "@/components";
import { Button } from "@/components/Button";
import { NavBar } from "@/components/NavBar";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fbf7f3;
  justify-content: evenly-spaced;
  max-width: 100%;
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fbf7f3;
`;

const DetailsColumn = styled(MainColumn)`
  margin: 90px;
  gap: 40px;
`;

const RentPerMonth = styled.h1`
  font-size: 48px;
  font-family: "Montserrat";
  font-weight: 600;
  line-height: 150%;
  line-spacing: 0.96px;
`;

const Header = styled.div`
  font-size: 32px;
  margin: 0;
  font-weight: 700;
  font-family: "Neutraface Text";
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

const Availability = styled(Header)`
  font-size: 30px;
`;

const SaveButton = styled(Button)`
  font-size: 15px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ChangeAvailabilityButton = styled(Button)`
  font-size: 15px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ButtonPadding = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 0px 0px 10%;
`;

const DoesNotExist = styled.h1`
  font-size: 48px;
  font-family: "Neutraface Text", sans-serif;
  font-weight: 550;
  line-height: 150%;
  line-spacing: 0.96px;
  padding: 20px 10% 20px 10%;
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
  width: 736px;
  height: 447px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;
  z-index: 2;
  padding: 30px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 85%;
  height: 70%;
`;
const RadioColumn = styled.div`
  margin-top: 1.5rem;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 25px;
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

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const RadioRow = styled.div`
  display: flex;
  flex-direciton: row;
  align-items: flex-start;
  gap: 13px;
`;

const AvailabilityDateColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const RadioButtonLabel = styled.label`
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 400;
`;
const RadioButton = styled.input`
  width: 16px;
  height: 16px;
  accent-color: black;
`;

const AvailabilityDate = styled.input`
  padding: 6px 15px 6px 15px;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  margin-left: 27px;
`;

const Heading = styled.h1`
  font-family: "Neutraface Text";
`;

export function UnitDetails() {
  const [unit, setUnit] = useState<Unit>();
  const { id } = useParams();
  const [popup, setPopup] = useState(false);

  const togglePopup = () => {
    setPopup(!popup);
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
        <NavBar page="" />
        <Column>
          <ButtonPadding>
            <Link to="/">
              <Button kind="secondary"> Back to Listing</Button>
            </Link>
          </ButtonPadding>
          <DoesNotExist>This unit does not exist!</DoesNotExist>
        </Column>
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

  return (
    <Page>
      <Helmet>
        <title>{unit.listingAddress} | USHS Housing Portal</title>
      </Helmet>
      <NavBar page="" />
      {/* <ButtonPadding>
        <Link to="/">
          <Button kind="secondary">Back to Listing</Button>
        </Link>
      </ButtonPadding> */}
      <MainColumn>
        <DetailsColumn>
          <Section>
            <Row>
              <Link to="/">
                <Button kind="secondary">Back to Listing</Button>
              </Link>
            </Row>
          </Section>
          <Section>
            <TopRow>
              <RentPerMonth>${unit.monthlyRent}/month</RentPerMonth>
              <Availability>{unit.availableNow ? "Available Now" : null}</Availability>
            </TopRow>
            <TopRow>
              <Address>{unit.listingAddress}</Address>
              <ChangeAvailabilityButton kind="primary" onClick={togglePopup}>
                Change Availability
              </ChangeAvailabilityButton>
            </TopRow>
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
          </Section>
          <Section>
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
                {/* I don't think we have this anymore? */}
                {/* <StrongText>Holding Fee: </StrongText>
          <List>
            <ListText>${unit.holdingFeeAmount}</ListText>
          </List> */}
              </SectionColumn>
            </Row>
          </Section>
          <Section>
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
          </Section>
          <Section>
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
          </Section>
        </DetailsColumn>
        {popup && (
          <>
            <Overlay />
            <Modal>
              <XWrapper>
                <XButton onClick={togglePopup}> &times; </XButton>
              </XWrapper>
              {/* <h1>Change Availability</h1> */}
              <Heading>Change Availability</Heading>
              <FormWrapper>
                <RadioColumn>
                  <AvailabilityDateColumn>
                    <RadioRow>
                      <RadioButton
                        type="radio"
                        name="radio"
                        value="optionA"
                        // checked={select === "optionA"}
                        // onChange={(event) => handleSelectChange(event)}
                      />
                      <RadioButtonLabel>Enter new availability date:</RadioButtonLabel>
                    </RadioRow>
                    <AvailabilityDate placeholder="01/01/2024" />
                  </AvailabilityDateColumn>
                  <RadioRow>
                    <RadioButton
                      type="radio"
                      name="radio"
                      value="optionA"
                      // checked={select === "optionA"}
                      // onChange={(event) => handleSelectChange(event)}
                    />
                    <RadioButtonLabel>Leased by USHS</RadioButtonLabel>
                  </RadioRow>
                  <RadioRow>
                    <RadioButton
                      type="radio"
                      name="radio"
                      value="optionA"
                      // checked={select === "optionA"}
                      // onChange={(event) => handleSelectChange(event)}
                    />
                    <RadioButtonLabel>Removed from market</RadioButtonLabel>
                  </RadioRow>
                </RadioColumn>
                <ButtonsWrapper>
                  <SaveButton kind="primary">Save Availability</SaveButton>
                </ButtonsWrapper>
              </FormWrapper>
            </Modal>
          </>
        )}
      </MainColumn>
    </Page>
  );
}
