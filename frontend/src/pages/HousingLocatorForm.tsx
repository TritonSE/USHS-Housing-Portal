import { useNavigate } from "react-router-dom";

import { Page } from "@/components";
import { ListingFormComponents } from "@/components/ListingFormComponents";

export function HousingLocatorForm() {
  const navigate = useNavigate();

  return (
    <div>
      <Page>
        <ListingFormComponents
          formType={"housingLocator"}
          handleAfterSubmit={() => {
            navigate("/");
          }}
        />
      </Page>
    </div>
  );
}
