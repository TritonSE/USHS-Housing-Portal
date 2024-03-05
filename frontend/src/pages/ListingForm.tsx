import { Page } from "@/components";
import { ListingFormComponents } from "@/components/ListingFormComponents";

export function ListingForm() {
  return (
    <div>
      <Page>
        <ListingFormComponents formType={1} />
      </Page>
    </div>
  );
}
