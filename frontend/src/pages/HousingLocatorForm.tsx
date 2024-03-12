import { Page } from "@/components";
import { ListingFormComponents } from "@/components/ListingFormComponents";

export function HousingLocatorForm() {
  return (
    <div>
      <Page>
        <ListingFormComponents formType={2} />
      </Page>
    </div>
  );
}
