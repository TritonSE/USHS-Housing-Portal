import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Unit, approveUnit, getUnit, updateUnit } from "@/api/units";
import { Page } from "@/components";
import { Banner } from "@/components/Banner";
import { Button } from "@/components/Button";
import { HousingLocatorFields } from "@/components/ListingForm/HousingLocatorFields";
import { ListingFormComponents } from "@/components/ListingFormComponents";
import { NavBar } from "@/components/NavBar";
import { ReferralTable } from "@/components/ReferralTable";
import { DataContext } from "@/contexts/DataContext";

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

const HLActions = styled(Column)`
  align-items: center;
`;

const DetailsRow = styled(Row)`
  gap: 120px;
`;

const SectionColumn = styled(Column)`
  width: 50%;
  gap: 25px;
`;

const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fbf7f3;
`;

const DetailsColumn = styled(MainColumn)`
  margin: 90px;
  gap: 60px;
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
  line-height: 30px;
  letter-spacing: 0.4px;
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

const PaddingInButton = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 0px 0px 0;
  justify-content: space-between;
  gap: 10px;
`;

const InfoRow = styled(Row)`
  gap: 20px;
`;

const EditButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// POPUP STYLING
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

const AvailabilityDateColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const RadioButtonLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 13px;
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState<Unit>();
  const [showApprovedBanner, setShowApprovedBanner] = useState(false);
  const [showPendingApprovalBanner, setShowPendingApprovalBanner] = useState(false);

  const { id } = useParams();
  const [popup, setPopup] = useState(false);
  const [selectedPopupOption, setSelectedPopupOption] = useState("");
  const [dateText, setDateText] = useState("");

  // Additional HL fields (for pending units)
  const [internalComments, setInternalComments] = useState<string>("");
  const [whereFound, setWhereFound] = useState<string>("");
  const [paymentRentingCriteria, setPaymentRentingCriteria] = useState<string[]>([]);
  const [additionalRulesHL, setAdditionalRulesHL] = useState<string[]>([]);

  //using Data Context to get currentUser info
  const { currentUser } = useContext(DataContext);

  //checks for which view to return
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing((prevState) => !prevState);
  };

  const fetchUnit = () => {
    if (id !== undefined) {
      setLoading(true);
      void getUnit(id).then((result) => {
        if (result.success) {
          if (!result.data.approved) {
            setShowPendingApprovalBanner(true);
          }
          setUnit(result.data);

          // Initialize change availability popup selection
          if (result.data.leasedStatus === "ushs") {
            setSelectedPopupOption("leasedByUSHS");
          } else if (result.data.leasedStatus === "removed") {
            setSelectedPopupOption("removedFromMarket");
          }
        } else {
          // Go back to the home page if the unit is not found
          navigate("/");
        }
        setLoading(false);
      });
    }
  };

  React.useEffect(fetchUnit, []);

  if (loading || !unit) {
    // TODO: Loading state
    return null;
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateText("");
    setSelectedPopupOption(event.target.value);
  };

  const togglePopup = () => {
    setPopup(!popup);
  };

  const handleSaveAvailability = () => {
    let updatedData = {};

    if (selectedPopupOption === "enterDate") {
      updatedData = {
        dateAvailable: dateText,
        leasedStatus: null,
      };
    } else if (selectedPopupOption === "leasedByUSHS") {
      updatedData = { leasedStatus: "ushs" };
    } else if (selectedPopupOption === "removedFromMarket") {
      updatedData = { leasedStatus: "removed" };
    }

    updateUnit(unit._id, updatedData)
      .then((result) => {
        if (result.success) {
          setUnit(result.data);
        } else {
          console.error(result.error);
        }
      })
      .catch(console.error);

    // Close the popup
    togglePopup();
  };

  const approveListing = async () => {
    if (unit && id && !unit.approved) {
      // Update unit with additional HL fields
      await updateUnit(id, {
        whereFound,
        paymentRentingCriteria,
        additionalRules: additionalRulesHL,
        internalComments,
      })
        .then((result) => {
          if (result.success) {
            setUnit(result.data);
          } else {
            console.error(result.error);
          }
        })
        .catch(console.error);

      // Approve Unit
      await approveUnit(id)
        .then((result) => {
          if (result.success) {
            setUnit(result.data);

            setShowApprovedBanner(true);
            setShowPendingApprovalBanner(false);
            window.scrollTo(0, 0); // scroll to top of page
          } else {
            console.error(result.error);
          }
        })
        .catch(console.error);
    }
  };

  const handleAfterUpdate = (updatedUnit: Unit) => {
    setUnit(updatedUnit);
    toggleEditing();
  };

  //checks for availability
  const availableNow = unit.availableNow ? "Available Now" : "Not Available";

  //move data into an array
  const rentingCriteria = unit.paymentRentingCriteria.map((criteria, i) => (
    <ListText key={criteria + i}>{criteria}</ListText>
  ));
  const appliances = unit.appliances.map((appliance, i) => (
    <ListText key={appliance + i}>{appliance}</ListText>
  ));
  const parkingRequirements = unit.parking.map((parking, i) => (
    <ListText key={parking + i}>{parking}</ListText>
  ));
  const communityFeatures = unit.communityFeatures.map((feature, i) => (
    <ListText key={feature + i}>{feature}</ListText>
  ));
  const accessibility = unit.accessibility.map((access, i) => (
    <ListText key={access + i}>{access}</ListText>
  ));
  const pets = unit.pets.map((pet, i) => <ListText key={pet + i}>{pet}</ListText>);
  const additionalRules = unit.additionalRules.map((rule, i) => (
    <ListText key={rule + i}>{rule}</ListText>
  ));

  const HousingLocatorComponent = () => {
    return (
      <Column>
        <StrongText>Landlord: {unit.landlordFirstName + " " + unit.landlordLastName}</StrongText>
        <Text>{unit.landlordPhone}</Text>
        <Text>{unit.landlordEmail}</Text>
      </Column>
    );
  };

  const NotHousingLocatorComponent = () => {
    return (
      <Column>
        <StrongText>{availableNow}</StrongText>
      </Column>
    );
  };

  return (
    <Page>
      <Helmet>
        <title>{unit.listingAddress} | USHS Housing Portal</title>
      </Helmet>
      <NavBar />
      <MainColumn>
        <DetailsColumn>
          <Section>
            <TopRow>
              <Link to="/">
                <Button kind="secondary">
                  <PaddingInButton>
                    <img className="back-arrow" src="/back_arrow.svg" alt={"Back arrow"} />
                    Back to Listing
                  </PaddingInButton>
                </Button>
              </Link>
              {currentUser?.isHousingLocator && (
                <EditButton kind="secondary" onClick={toggleEditing}>
                  <img src={"/pencil.svg"} alt="" style={{ marginRight: "12px" }} />
                  Edit
                </EditButton>
              )}
            </TopRow>
          </Section>

          <Banner
            visible={showApprovedBanner}
            image="/check_mark.svg"
            withTitle={true}
            title="Approval Confirmed"
            message="The listing is now visible to referring staff and ready for referrals."
            withX={true}
            color="#C4F4DF"
          />

          <Banner
            visible={showPendingApprovalBanner}
            image="/Caution.svg"
            withTitle={true}
            title="Pending Approval"
            message="The following information is submitted by the landlord. Fill in additional information and approve at the bottom of the page to make the listing visible to referring staff."
            withX={false}
            color="#FCE9C9"
          />

          {isEditing ? (
            // Editing mode
            <ListingFormComponents
              formType="edit"
              initialValues={unit}
              handleAfterSubmit={handleAfterUpdate}
            />
          ) : (
            // Viewing mode
            <>
              <Section>
                <TopRow>
                  <Column>
                    <RentPerMonth>${unit.monthlyRent}/month</RentPerMonth>
                    <Address>{unit.listingAddress}</Address>
                  </Column>
                  {currentUser?.isHousingLocator && (
                    <HLActions>
                      <Availability>{availableNow}</Availability>
                      <ChangeAvailabilityButton kind="primary" onClick={togglePopup}>
                        Change Availability
                      </ChangeAvailabilityButton>
                    </HLActions>
                  )}
                </TopRow>
                <DetailsRow>
                  <InfoRow>
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
                  </InfoRow>
                  <Column>
                    {currentUser?.isHousingLocator ? (
                      <HousingLocatorComponent />
                    ) : (
                      <NotHousingLocatorComponent />
                    )}
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

              {unit.approved && (
                <>
                  <Section>
                    <Row>
                      <Header>Additional Information</Header>
                    </Row>
                    <Row>
                      <SectionColumn>
                        <StrongText>Where Was Unit Found: </StrongText>
                        <ListText>{unit.whereFound}</ListText>
                        <StrongText>Additional Rules and Regulation: </StrongText>
                        {additionalRules}
                      </SectionColumn>
                      <SectionColumn>
                        <StrongText>Notes from Housing Locator: </StrongText>
                        {unit.internalComments}
                      </SectionColumn>
                    </Row>
                  </Section>
                  <ReferralTable id={id ?? ""} />{" "}
                </>
              )}

              {!unit.approved && (
                <>
                  <HousingLocatorFields
                    whereFindUnit={whereFound}
                    handleWhereFindUnit={(e) => {
                      setWhereFound(e.target.value);
                    }}
                    paymentRentingCriteria={paymentRentingCriteria}
                    setPaymentRentingCriteria={setPaymentRentingCriteria}
                    additionalRulesRegulations={additionalRulesHL}
                    setAdditionalRulesRegulations={setAdditionalRulesHL}
                    additionalCommentsHL={internalComments}
                    handleAdditionalCommentsHL={(e) => {
                      setInternalComments(e.target.value);
                    }}
                  />
                  <Button
                    kind="primary"
                    style={{ alignSelf: "flex-end", width: "fit-content" }}
                    onClick={() => {
                      void approveListing();
                    }}
                  >
                    Approve Listing
                  </Button>
                </>
              )}
            </>
          )}
        </DetailsColumn>

        {popup && (
          <MainColumn>
            <Overlay />
            <Modal>
              <XWrapper>
                <XButton onClick={togglePopup}> &times; </XButton>
              </XWrapper>
              <Heading>Change Availability</Heading>
              <FormWrapper>
                <RadioColumn>
                  <AvailabilityDateColumn>
                    <RadioButtonLabel>
                      <RadioButton
                        type="radio"
                        name="radio"
                        value="enterDate"
                        checked={selectedPopupOption === "enterDate"}
                        onChange={handleRadioChange}
                      />
                      Enter new availability date:
                    </RadioButtonLabel>
                    <AvailabilityDate
                      placeholder="01/01/2024"
                      type="date"
                      value={dateText}
                      onChange={(event) => {
                        setDateText(event.target.value);
                        setSelectedPopupOption("enterDate");
                      }}
                    />
                  </AvailabilityDateColumn>
                  <RadioButtonLabel>
                    <RadioButton
                      type="radio"
                      name="radio"
                      value="leasedByUSHS"
                      checked={selectedPopupOption === "leasedByUSHS"}
                      onChange={handleRadioChange}
                    />
                    Leased by USHS
                  </RadioButtonLabel>
                  <RadioButtonLabel>
                    <RadioButton
                      type="radio"
                      name="radio"
                      value="removedFromMarket"
                      checked={selectedPopupOption === "removedFromMarket"}
                      onChange={handleRadioChange}
                    />
                    Removed from market
                  </RadioButtonLabel>
                </RadioColumn>
                <ButtonsWrapper>
                  <SaveButton kind="primary" onClick={handleSaveAvailability}>
                    Save Availability
                  </SaveButton>
                </ButtonsWrapper>
              </FormWrapper>
            </Modal>
          </MainColumn>
        )}
      </MainColumn>
    </Page>
  );
}
