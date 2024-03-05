import { Header, Required } from "@/components/ListingForm/CommonStyles";

export const HousingLocatorHeader = () => {
  return (
    <Header>
      <h1>Housing Locator Add Listing Form</h1>

      <em>
        The <Required>*</Required> next to the question indicates that it is required.
      </em>
    </Header>
  );
};
