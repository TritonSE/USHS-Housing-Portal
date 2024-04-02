import { useState } from "react";
import styled from "styled-components";

import { Button } from "./Button";
import { Logo } from "./ListingForm/Logo";

import { CreateUnitRequest, createUnit } from "@/api/units";
import { AccessibilityAccess } from "@/components/ListingForm/AccessibilityAccess";
import { AdditionalRulesRegulations } from "@/components/ListingForm/AdditionalRulesRegulations";
import { Appliances } from "@/components/ListingForm/Appliances";
import { ApplicationFeeCost } from "@/components/ListingForm/ApplicationFeeCost";
import {
  ContentContainer,
  MainContainer,
  RadioCheckBoxContainer,
  TextContainer,
} from "@/components/ListingForm/CommonStyles";
import { CommunityInfo } from "@/components/ListingForm/CommunityInfo";
import { DateAvailable } from "@/components/ListingForm/DateAvailable";
import { HousingLocatorHeader } from "@/components/ListingForm/Headers/HousingLocatorHeader";
import { LandlordListingFormHeader } from "@/components/ListingForm/Headers/LandlordListingFormHeader";
import { HousingAuthority } from "@/components/ListingForm/HousingAuthority";
import { NumberBaths } from "@/components/ListingForm/NumberBaths";
import { NumberBedrooms } from "@/components/ListingForm/NumberBedrooms";
import { Parking } from "@/components/ListingForm/Parking";
import { PaymentRentingCriteria } from "@/components/ListingForm/PaymentRentingCriteria";
import { Pets } from "@/components/ListingForm/Pets";
import { SharingHousing } from "@/components/ListingForm/SharingHousing";
import { Textbox } from "@/components/ListingForm/Textbox";
import { ThirdPartyPayment } from "@/components/ListingForm/ThirdPartyPayment";

const MidSectionHeader = styled.h2`
  margin-bottom: 32px;
  font-size: 32px;
  line-height: 150%;
  font-family: "Neutraface Text", sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: 0.64px;
`;

const HousingLocatorSection = styled.div`
  color: #b64201;
`;

const ErrorMessage = styled(HousingLocatorSection)`
  max-width: 800px;
`;

type ListingFormComponentsProps = {
  formType: "landlord listing form" | "housing locator form";
  firstName?: string;
  lastName?: string;
  email?: string;
  handleAfterSubmit: () => void; // Function to call after the form is submitted
};

const SubmitButtonMarginOffset = styled.div`
  margin-top: 54px;
  margin-bottom: 54px;
`;

const isNumber = /^\d*$/;

export function ListingFormComponents(props: ListingFormComponentsProps) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [aptNum, setAptNum] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [areaCode, setAreaCode] = useState<string>("");
  const [sqFootage, setSqFootage] = useState<string>("");
  const [rentPerMonth, setRentPerMonth] = useState<string>("");
  const [securityDeposit, setSecurityDeposit] = useState<string>("");
  const [thirdPartyPayment, setThirdPartyPayment] = useState<boolean | undefined>(undefined);
  const [housingAuthority, setHousingAuthority] = useState<string>("");
  const [applicationFeeCost, setApplicationFeeCost] = useState<string>("");
  const [dateAvailable, setDateAvailable] = useState<string>("");
  const [numberOfBedrooms, setNumberOfBedrooms] = useState<number | undefined>(undefined);
  const [numberOfBedroomsOther, setNumberOfBedroomsOther] = useState<string | undefined>(undefined);
  const [numberOfBaths, setNumberOfBaths] = useState<number | undefined>(undefined);
  const [numberOfBathsOther, setNumberOfBathsOther] = useState<string | undefined>(undefined);
  const [appliances, setAppliances] = useState<string[]>([]);
  const [communityAndNeighborInfo, setCommunityAndNeighborInfo] = useState<string[]>([]);
  const [communityAndNeighborInfoOther, setCommunityAndNeighborInfoOther] = useState<string>("");
  const [parking, setParking] = useState<string[]>([]);
  const [accessibility, setAccessibility] = useState<string[]>([]);
  const [pets, setPets] = useState<string[]>([]);
  const [sharingHousing, setSharingHousing] = useState<string>("");
  const [additionalCommentsLL, setAdditionalCommentsLL] = useState<string>("");
  const [additionalCommentsHL, setAdditionalCommentsHL] = useState<string>("");
  const [whereFindUnit, setWhereFindUnit] = useState<string>("");
  const [paymentRantingCriteria, setPaymentRentingCriteria] = useState<string[]>([]);
  const [additionalRulesRegulations, setAdditionalRulesRegulations] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hasNumber = /\d/;

    if (!hasNumber.test(event.target.value)) setFirstName(event.target.value);
    else return;
  };

  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hasNumber = /\d/;

    if (!hasNumber.test(event.target.value)) setLastName(event.target.value);
    else return;
  };

  const handleEmailAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numberRegex = /^\d{0,10}$/;
    if (!numberRegex.test(event.target.value)) return;
    setPhone(event.target.value);
  };

  const handleStreetAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreetAddress(event.target.value);
  };

  const handleApartmentNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAptNum(event.target.value);
  };

  const handleCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") return;
    setCity(event.target.value);
  };

  const handleState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hasNumber = /\d/;
    if (hasNumber.test(event.target.value)) return;
    setState(event.target.value);
  };

  const handleAreaCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isAreaCode = /^\d{0,5}$/;
    if (!isAreaCode.test(event.target.value)) return;
    setAreaCode(event.target.value);
  };

  const handleSqFootage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isNumber.test(value)) return;

    setSqFootage(value);
  };

  const handleRentPerMonth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isNumber.test(value)) return;

    setRentPerMonth(value);
  };

  const handleSecurityDeposit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isNumber.test(value)) return;

    setSecurityDeposit(value);
  };

  const handleThirdPartyPayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "Yes") {
      setThirdPartyPayment(true);
    } else if (event.target.value === "No") {
      setThirdPartyPayment(false);
    }
  };

  const handleHousingAuthority = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHousingAuthority(event.target.value);
  };

  const handleApplicationFeeCost = (event: React.ChangeEvent<HTMLInputElement>) => {
    const n = event.target.value;

    if (!isNumber.test(n)) return;

    setApplicationFeeCost(n);
  };

  const handleDateAvailable = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateAvailable(event.target.value);
  };

  const handleNumberOfBedrooms = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfBedrooms(parseInt(event.target.value));
    setNumberOfBedroomsOther(undefined);
  };

  const handleNumberOfBedroomsOther = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNumber.test(event.target.value)) return;

    setNumberOfBedrooms(undefined);
    setNumberOfBedroomsOther(event.target.value);
  };

  const handleNumberOfBaths = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfBathsOther(undefined);
    setNumberOfBaths(parseFloat(event.target.value));
  };

  const handleNumberOfBathsOther = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isBath = /^\d*\.?5?$/;
    if (!isBath.test(event.target.value)) return;

    setNumberOfBaths(undefined);
    setNumberOfBathsOther(event.target.value);
  };

  const handleCommunityAndNeighborInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;

    if (value === "Other") {
      setCommunityAndNeighborInfoOther("");
    }

    // If checkbox is checked, add the value to the array
    if (target.checked) {
      setCommunityAndNeighborInfo([...communityAndNeighborInfo, value]);
    } else {
      // If checkbox is unchecked, remove the value from the array
      setCommunityAndNeighborInfo(communityAndNeighborInfo.filter((item) => item !== value));
    }
  };

  const handleCommunityAndNeighborInfoOther = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityAndNeighborInfoOther(event.target.value);
  };

  const handleCheckBoxNA = (
    option: string,
    getter: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (option === "N/A") {
      setter(["N/A"]);
    } else if (getter.includes(option)) {
      const valueToRemove = "N/A";
      const index = getter.indexOf(valueToRemove);
      if (index !== -1) {
        getter.splice(index, 1);
      }

      setter(getter.filter((item: string) => item !== option));
    } else {
      const valueToRemove = "N/A";
      const index = getter.indexOf(valueToRemove);
      if (index !== -1) {
        getter.splice(index, 1);
      }
      setter([...getter, option]);
    }
  };

  const handleSharingHousing = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSharingHousing(event.target.value);
  };

  const handleAdditionalCommentsLL = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAdditionalCommentsLL(event.target.value);
  };

  const handleAdditionalCommentsHL = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAdditionalCommentsHL(event.target.value);
  };

  const handleWhereFindUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWhereFindUnit(event.target.value);
  };

  const handleSubmit = () => {
    const newUnit: CreateUnitRequest = {
      landlordFirstName: firstName,
      landlordLastName: lastName,
      landlordEmail: email,
      landlordPhone: phone,
      streetAddress,
      suiteNumber: aptNum,
      city,
      state,
      areaCode,
      sqft: parseInt(sqFootage ?? ""),
      monthlyRent: parseInt(rentPerMonth ?? ""),
      securityDeposit: parseInt(securityDeposit ?? ""),
      acceptThirdParty: thirdPartyPayment ?? false,
      housingAuthority,
      applicationFeeCost: parseInt(applicationFeeCost ?? ""),
      dateAvailable: dateAvailable ? new Date(dateAvailable).toISOString() : "",
      numBeds: numberOfBedrooms ?? parseInt(numberOfBedroomsOther ?? ""),
      numBaths: numberOfBaths ?? parseFloat(numberOfBathsOther ?? ""),
      appliances,
      communityFeatures:
        communityAndNeighborInfo[0] === ""
          ? [communityAndNeighborInfoOther]
          : communityAndNeighborInfo,
      parking,
      accessibility,
      pets,
      sharingAcceptable: sharingHousing,
      landlordComments: additionalCommentsLL,
    };

    createUnit(newUnit)
      .then((res) => {
        if (res.success) {
          setErrorMessage("");
          props.handleAfterSubmit();
        } else {
          setErrorMessage(res.error);
        }
      })
      .catch(console.error);
  };

  return (
    <MainContainer>
      <Logo />
      {props.formType === "landlord listing form" && <LandlordListingFormHeader />}
      {props.formType === "housing locator form" && <HousingLocatorHeader />}
      <ContentContainer>
        <TextContainer>
          <Textbox
            elementName="Name"
            requiredField={true}
            name="firstName"
            value={firstName}
            handler={handleFirstName}
            placeholder="First"
          />
          <Textbox name="lastName" value={lastName} handler={handleLastName} placeholder="Last" />
        </TextContainer>
        <TextContainer>
          <Textbox
            elementName="Email Address"
            requiredField={true}
            name="email"
            value={email}
            handler={handleEmailAddress}
          />

          <Textbox
            elementName="Phone Number"
            requiredField={true}
            name="phone"
            value={phone}
            handler={handlePhoneNumber}
          />
        </TextContainer>

        <TextContainer>
          <Textbox
            elementName="City"
            requiredField={true}
            name="city"
            value={city}
            handler={handleCity}
          />
          <Textbox
            elementName="State"
            requiredField={true}
            name="email"
            value={state}
            handler={handleState}
          />
        </TextContainer>
        <TextContainer>
          <Textbox
            elementName="Street Address"
            requiredField={true}
            name="streetAddress"
            value={streetAddress}
            handler={handleStreetAddress}
          />
          <Textbox
            elementName="Apartment/Suite etc"
            requiredField={false}
            name="aptNum"
            value={aptNum}
            handler={handleApartmentNumber}
          />
        </TextContainer>
        <TextContainer>
          <Textbox
            elementName="Area Code"
            requiredField={true}
            name="areaCode"
            value={areaCode}
            handler={handleAreaCode}
          />
          <Textbox
            elementName="Square Footage"
            requiredField={true}
            name="sqFootage"
            value={sqFootage}
            handler={handleSqFootage}
          />
        </TextContainer>

        <MidSectionHeader>Renting/Fees Information</MidSectionHeader>
        <TextContainer>
          <Textbox
            elementName="Rent Per Month"
            requiredField={true}
            name="rentPerMonth"
            value={rentPerMonth ?? ""}
            handler={handleRentPerMonth}
          />
          <Textbox
            elementName="Security Deposit"
            requiredField={true}
            name="securityDeposit"
            value={securityDeposit ?? undefined}
            handler={handleSecurityDeposit}
          />
        </TextContainer>
        <ThirdPartyPayment
          thirdPartyPayment={thirdPartyPayment}
          handleThirdPartyPayment={handleThirdPartyPayment}
        />
        <HousingAuthority
          housingAuthority={housingAuthority}
          handleHousingAuthority={handleHousingAuthority}
        />
        <ApplicationFeeCost
          applicationFeeCost={applicationFeeCost}
          handleApplicationFeeCost={handleApplicationFeeCost}
        />
        <MidSectionHeader>House Specifics</MidSectionHeader>
        <DateAvailable
          dateAvailable={dateAvailable?.toString()}
          handleDateAvailable={handleDateAvailable}
        />

        <RadioCheckBoxContainer>
          <NumberBedrooms
            numberOfBedrooms={numberOfBedrooms}
            handleNumberOfBedrooms={handleNumberOfBedrooms}
            numberOfBedroomsOther={numberOfBedroomsOther}
            handleNumberOfBedroomsOther={handleNumberOfBedroomsOther}
          />
          <NumberBaths
            numberOfBaths={numberOfBaths}
            handleNumberOfBaths={handleNumberOfBaths}
            numberOfBathsOther={numberOfBathsOther}
            handleNumberOfBathsOther={handleNumberOfBathsOther}
          />
        </RadioCheckBoxContainer>
        <Appliances
          appliances={appliances}
          setAppliances={setAppliances}
          handleCheckBoxNA={handleCheckBoxNA}
        />
        <CommunityInfo
          communityAndNeighborInfo={communityAndNeighborInfo}
          handleCommunityAndNeighborInfo={handleCommunityAndNeighborInfo}
          communityAndNeighborInfoOther={communityAndNeighborInfoOther}
          handleCommunityAndNeighborInfoOther={handleCommunityAndNeighborInfoOther}
        />

        <Parking parking={parking} setParking={setParking} handleCheckBoxNA={handleCheckBoxNA} />
        <AccessibilityAccess
          accessibility={accessibility}
          setAccessibility={setAccessibility}
          handleCheckBoxNA={handleCheckBoxNA}
        />
        <Pets pets={pets} setPets={setPets} handleCheckBoxNA={handleCheckBoxNA} />
        <SharingHousing
          sharingHousing={sharingHousing}
          handleSharingHousing={handleSharingHousing}
        />
        <Textbox
          elementName="Additional Comments"
          name="additionalCommentsLL"
          value={additionalCommentsLL}
          handler={handleAdditionalCommentsLL}
        />

        {props.formType === "housing locator form" && (
          <HousingLocatorSection>
            <MidSectionHeader>Additional fields to be entered by housing locator</MidSectionHeader>
            <Textbox
              elementName="Where did you find the unit?"
              requiredField={true}
              name="whereFindUnit"
              value={whereFindUnit}
              handler={handleWhereFindUnit}
            />
            <PaymentRentingCriteria
              paymentRentingCriteria={paymentRantingCriteria}
              setPaymentRentingCriteria={setPaymentRentingCriteria}
              handleCheckBoxNA={handleCheckBoxNA}
              notRequired={true}
            />
            <AdditionalRulesRegulations
              additionalRulesRegulations={additionalRulesRegulations}
              setAdditionalRulesRegulations={setAdditionalRulesRegulations}
              handleCheckBoxNA={handleCheckBoxNA}
            />
            <Textbox
              elementName="Additional Comments"
              kind="textarea"
              name="additionalCommentsHL"
              value={additionalCommentsHL}
              handler={handleAdditionalCommentsHL}
            />
          </HousingLocatorSection>
        )}
      </ContentContainer>
      <SubmitButtonMarginOffset>
        <Button kind="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </SubmitButtonMarginOffset>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </MainContainer>
  );
}
