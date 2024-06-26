import styled from "styled-components";

import { ClearAllFields, HeaderMain, HeaderRequired } from "./HeaderStyles";

import { Header, Required } from "@/components/ListingForm/CommonStyles";

export const HeaderSubtext = styled.p`
  color: #000;
  text-align: center;

  /* Body 1 */
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 30px */
  letter-spacing: 0.4px;
`;

type LandlordListingFormHeaderProps = {
  // whether to show the "clear all fields" text
  showClearAllText: boolean;
};

export const LandlordListingFormHeader = ({ showClearAllText }: LandlordListingFormHeaderProps) => {
  return (
    <Header>
      <HeaderMain>
        Union Station Homeless Services
        <br />
        Landlord Listing Form
      </HeaderMain>
      <HeaderSubtext>
        Thank you for considering adding your listing to our database! Our organization aims to
        combat the homelessness crisis by matching families and individuals with the right housing
        options for them and sustaining support for an easy integration back into the community. For
        your listing to be properly added, please complete each field thoroughly and include as much
        information as possible. Thank you for your time!
      </HeaderSubtext>
      <HeaderRequired>
        The <Required>*</Required> next to the question indicates that it is required.
      </HeaderRequired>
      {showClearAllText && (
        <ClearAllFields>
          The information below is prepopulated from the previously submitted form. Press “clear all
          fields” to have a blank form.
        </ClearAllFields>
      )}
    </Header>
  );
};
