import { useEffect, useState } from "react";
import styled from "styled-components";

import { Button } from "./Button";
import { MidSectionHeader } from "./ListingForm/Headers/HeaderStyles";
import { HousingLocatorFields } from "./ListingForm/HousingLocatorFields";
import { ImagesVideos } from "./ListingForm/ImagesVideos";
import { Logo } from "./ListingForm/Logo";
import { Thumbnail } from "./ListingForm/Thumbnail";
import { formatDateForInput, handleCheckBoxNA } from "./ListingForm/helpers";

import { uploadFiles } from "@/api/images";
import { CreateUnitRequest, Unit, createUnit, updateUnit } from "@/api/units";
import { AccessibilityAccess } from "@/components/ListingForm/AccessibilityAccess";
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
import { Pets } from "@/components/ListingForm/Pets";
import { SharingHousing } from "@/components/ListingForm/SharingHousing";
import { Textbox } from "@/components/ListingForm/Textbox";
import { ThirdPartyPayment } from "@/components/ListingForm/ThirdPartyPayment";
import { Utilities } from "@/components/ListingForm/Utilities";

import { ClearAllPopup } from "@/components/ClearAllPopup";

const ErrorMessage = styled.div`
  color: #b64201;
  max-width: 800px;
  margin-top: 20px;
`;

type ListingFormComponentsProps = {
  formType: "landlord" | "housingLocator" | "edit";
  // Function to call after the form is submitted
  // `unit` is the updated/created unit object
  handleAfterSubmit: (unit: Unit) => void;
  initialValues?: Unit;
};

const isNumber = /^\d*$/;

const communityOptions = [
  "Automatic gate",
  "Gated community",
  "Pool",
  "Clubhouse",
  "Near public transport",
  "Near grocery stores",
  "Near schools",
  "BBQ",
  "Playground nearby",
  "Park nearby",
  "Smoke area",
];

const bathOptions = [1, 1.5, 2, 2.5, 3];

const bedroomOptions = [0, 1, 2, 3, 4];

const housingAuthorityOptions = ["HACLA", "LACDA"];

export function ListingFormComponents(props: ListingFormComponentsProps) {
  const [popup, setPopup] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>(props.initialValues?.landlordFirstName ?? "");
  const [lastName, setLastName] = useState<string>(props.initialValues?.landlordLastName ?? "");
  const [email, setEmail] = useState<string>(props.initialValues?.landlordEmail ?? "");
  const [phone, setPhone] = useState<string>(props.initialValues?.landlordPhone ?? "");
  const [streetAddress, setStreetAddress] = useState<string>(
    props.initialValues?.streetAddress ?? "",
  );
  const [aptNum, setAptNum] = useState<string>(props.initialValues?.suiteNumber ?? "");
  const [city, setCity] = useState<string>(props.initialValues?.city ?? "");
  const [state, setState] = useState<string>(props.initialValues?.state ?? "");
  const [areaCode, setAreaCode] = useState<string>(props.initialValues?.areaCode ?? "");
  const [sqFootage, setSqFootage] = useState<string>(String(props.initialValues?.sqft ?? ""));
  const [rentPerMonth, setRentPerMonth] = useState<string>(
    String(props.initialValues?.monthlyRent ?? ""),
  );
  const [securityDeposit, setSecurityDeposit] = useState<string>(
    String(props.initialValues?.securityDeposit ?? ""),
  );
  const [thirdPartyPayment, setThirdPartyPayment] = useState<boolean | undefined>(
    props.initialValues?.acceptThirdParty,
  );
  const [housingAuthority, setHousingAuthority] = useState<string | undefined>(
    housingAuthorityOptions.includes(props.initialValues?.housingAuthority ?? "")
      ? props.initialValues?.housingAuthority
      : undefined,
  );
  const [housingAuthorityOther, setHousingAuthorityOther] = useState<string | undefined>(
    !housingAuthorityOptions.includes(props.initialValues?.housingAuthority ?? "")
      ? props.initialValues?.housingAuthority
      : undefined,
  );
  const [applicationFeeCost, setApplicationFeeCost] = useState<string>(
    String(props.initialValues?.applicationFeeCost ?? ""),
  );
  const [dateAvailable, setDateAvailable] = useState<string>(
    formatDateForInput(props.initialValues?.dateAvailable) ?? "",
  );
  const [numberOfBedrooms, setNumberOfBedrooms] = useState<number | undefined>(
    bedroomOptions.includes(props.initialValues?.numBeds ?? 0)
      ? props.initialValues?.numBeds
      : undefined,
  );
  const [numberOfBedroomsOther, setNumberOfBedroomsOther] = useState<string | undefined>(
    !bedroomOptions.includes(props.initialValues?.numBeds ?? 0)
      ? props.initialValues?.numBeds.toString()
      : undefined,
  );
  const [numberOfBaths, setNumberOfBaths] = useState<number | undefined>(
    bathOptions.includes(props.initialValues?.numBaths ?? 0)
      ? props.initialValues?.numBaths
      : undefined,
  );
  const [numberOfBathsOther, setNumberOfBathsOther] = useState<string | undefined>(
    !bathOptions.includes(props.initialValues?.numBaths ?? 0)
      ? props.initialValues?.numBaths.toString()
      : undefined,
  );

  const [appliances, setAppliances] = useState<string[]>(props.initialValues?.appliances ?? []);
  const [utilities, setUtilities] = useState<string[]>(props.initialValues?.utilities ?? []);
  const [communityAndNeighborInfo, setCommunityAndNeighborInfo] = useState<string[]>(
    props.initialValues?.communityFeatures.filter((e) => communityOptions.includes(e)) ?? [],
  );

  const [communityAndNeighborInfoOther, setCommunityAndNeighborInfoOther] = useState<
    string | undefined
  >(props.initialValues?.communityFeatures.find((e) => !communityOptions.includes(e)));
  const [parking, setParking] = useState<string[]>(props.initialValues?.parking ?? []);
  const [accessibility, setAccessibility] = useState<string[]>(
    props.initialValues?.accessibility ?? [],
  );
  const [pets, setPets] = useState<string[]>(props.initialValues?.pets ?? []);
  const [sharingHousing, setSharingHousing] = useState<string>(
    props.initialValues?.sharingAcceptable ?? "",
  );
  const [additionalCommentsLL, setAdditionalCommentsLL] = useState<string>(
    props.initialValues?.landlordComments ?? "",
  );
  const [additionalCommentsHL, setAdditionalCommentsHL] = useState<string>(
    props.initialValues?.internalComments ?? "",
  );

  const [whereFindUnit, setWhereFindUnit] = useState<string>(props.initialValues?.whereFound ?? "");
  const [paymentRentingCriteria, setPaymentRentingCriteria] = useState<string[]>(
    props.initialValues?.paymentRentingCriteria ?? [],
  );
  const [additionalRulesRegulations, setAdditionalRulesRegulations] = useState<string[]>(
    props.initialValues?.additionalRules ?? [],
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [newFiles, setNewFiles] = useState<File[] | null>();
  const [thumbnail, setThumbnail] = useState<File[] | null>(null);

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
    setHousingAuthorityOther(undefined);
  };

  const handleHousingAuthorityOther = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHousingAuthorityOther(event.target.value);
    setHousingAuthority(undefined);
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

    // If checkbox is checked, add the value to the array
    if (target.checked) {
      setCommunityAndNeighborInfo([...communityAndNeighborInfo, value]);
    } else {
      // If checkbox is unchecked, remove the value from the array
      setCommunityAndNeighborInfo(communityAndNeighborInfo.filter((item) => item !== value));
    }
  };

  const handleOtherText = (text: string, checked: boolean) => {
    if (checked) {
      setCommunityAndNeighborInfoOther(text);
    } else {
      setCommunityAndNeighborInfoOther(undefined);
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

  useEffect(() => {
    console.log(communityAndNeighborInfoOther);
    console.log(communityAndNeighborInfo);
    console.log(
      communityAndNeighborInfoOther
        ? [
            ...communityAndNeighborInfo.filter((e) => communityAndNeighborInfo.includes(e)),
            communityAndNeighborInfoOther,
          ]
        : communityAndNeighborInfo,
    );
  }, [communityAndNeighborInfoOther]);

  const handleSubmit = () => {
    const newUnit = {
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
      housingAuthority: housingAuthority ?? housingAuthorityOther,
      applicationFeeCost: parseInt(applicationFeeCost ?? ""),
      dateAvailable: dateAvailable ? new Date(dateAvailable).toISOString() : "",
      numBeds: numberOfBedrooms ?? parseInt(numberOfBedroomsOther ?? "0"),
      numBaths: numberOfBaths ?? parseInt(numberOfBathsOther ?? "0"),
      appliances,
      utilities,
      communityFeatures: communityAndNeighborInfoOther
        ? [...communityAndNeighborInfo, communityAndNeighborInfoOther]
        : communityAndNeighborInfo,
      parking,
      accessibility,
      pets,
      sharingAcceptable: sharingHousing,
      landlordComments: additionalCommentsLL,
    } as CreateUnitRequest;

    if (props.formType === "housingLocator" || props.formType === "edit") {
      newUnit.whereFound = whereFindUnit;
      newUnit.paymentRentingCriteria = paymentRentingCriteria;
      newUnit.additionalRules = additionalRulesRegulations;
      newUnit.internalComments = additionalCommentsHL;
    }

    if (props.formType === "edit") {
      if (props.initialValues)
        updateUnit(props.initialValues._id, newUnit)
          .then((res) => {
            if (res.success) {
              setErrorMessage("");
              props.handleAfterSubmit(res.data);
            } else {
              setErrorMessage(res.error);
            }
          })
          .catch(console.error);
    } else {
      createUnit(newUnit)
        .then((res) => {
          if (res.success) {
            setErrorMessage("");
            uploadFiles(newFiles, res.data._id);
            uploadFiles(
              thumbnail,
              res.data._id,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              true,
            );
            props.handleAfterSubmit(res.data);
          } else {
            setErrorMessage(res.error);
          }
        })
        .catch(console.error);
    }
  };

  const handleClearAll = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setStreetAddress("");
    setAptNum("");
    setCity("");
    setState("");
    setAreaCode("");
    setSqFootage("");
    setRentPerMonth("");
    setSecurityDeposit("");
    setThirdPartyPayment(undefined);
    setHousingAuthority("");
    setApplicationFeeCost("");
    setDateAvailable("");
    setNumberOfBedrooms(undefined);
    setNumberOfBedroomsOther(undefined);
    setNumberOfBaths(undefined);
    setNumberOfBathsOther(undefined);
    setAppliances([]);
    setCommunityAndNeighborInfo([]);
    setCommunityAndNeighborInfoOther([]);
    setParking([]);
    setAccessibility([]);
    setPets([]);
    setSharingHousing("");
    setAdditionalCommentsLL("");

    if (props.formType === "housingLocator" || props.formType === "edit") {
      setWhereFindUnit("");
      setPaymentRentingCriteria([]);
      setAdditionalRulesRegulations([]);
      setAdditionalCommentsHL("");
    }
  };

  return (
    <MainContainer>
      {props.formType !== "edit" && <Logo />}
      {props.formType === "landlord" && <LandlordListingFormHeader />}
      {props.formType === "housingLocator" && <HousingLocatorHeader />}
      <ContentContainer>
        <Button
          kind="primary"
          onClick={() => {
            setPopup(true);
          }}
        >
          {"Clear all fields"}
        </Button>
        <ClearAllPopup
          active={popup}
          onClose={() => {
            setPopup(false);
          }}
          onSubmit={handleClearAll}
        />
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
            name="state"
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
            elementName="Apartment # / Suite # (etc.)"
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
            name="zip"
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
          housingAuthorityOther={housingAuthorityOther}
          handleHousingAuthorityOther={handleHousingAuthorityOther}
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
        <Utilities
          utilities={utilities}
          setUtilities={setUtilities}
          handleCheckBoxNA={handleCheckBoxNA}
        />
        <CommunityInfo
          communityAndNeighborInfo={communityAndNeighborInfo}
          handleCommunityAndNeighborInfo={handleCommunityAndNeighborInfo}
          otherText={communityAndNeighborInfoOther}
          handleOtherText={handleOtherText}
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
          elementName="Landlord Comments"
          name="additionalCommentsLL"
          kind="textarea"
          rows={5}
          value={additionalCommentsLL}
          handler={handleAdditionalCommentsLL}
        />

        <ImagesVideos unit_id={props.initialValues?._id ?? ""} onChange={setNewFiles} />

        <Thumbnail unit_id={props.initialValues?._id ?? ""} onChange={setThumbnail} />

        {(props.formType === "housingLocator" || props.formType === "edit") && (
          <HousingLocatorFields
            whereFindUnit={whereFindUnit}
            handleWhereFindUnit={handleWhereFindUnit}
            paymentRentingCriteria={paymentRentingCriteria}
            setPaymentRentingCriteria={setPaymentRentingCriteria}
            additionalRulesRegulations={additionalRulesRegulations}
            setAdditionalRulesRegulations={setAdditionalRulesRegulations}
            additionalCommentsHL={additionalCommentsHL}
            handleAdditionalCommentsHL={handleAdditionalCommentsHL}
          />
        )}
      </ContentContainer>

      <Button kind="primary" onClick={handleSubmit}>
        {props.formType === "edit" ? "Save changes" : "Submit"}
      </Button>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </MainContainer>
  );
}
