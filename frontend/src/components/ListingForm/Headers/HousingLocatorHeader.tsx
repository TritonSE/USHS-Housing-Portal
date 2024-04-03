import { Header, Required } from "@/components/ListingForm/CommonStyles";
import { HeaderMain, HeaderRequired } from "@/components/ListingForm/Headers/HeaderSyles";

export const HousingLocatorHeader = () => {
  return (
    <Header>
      <HeaderMain>Housing Locator Add Listing Form</HeaderMain>
      <p>
        <HeaderRequired>
          The <Required>*</Required> next to the question indicates that it is required.
        </HeaderRequired>
      </p>
    </Header>
  );
};
