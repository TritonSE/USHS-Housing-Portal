import { useState } from "react";
import { Helmet } from "react-helmet-async";

import { CreateUnitRequest, Unit, createUnit, updateUnit } from "@/api/units";
import { Page } from "@/components";
import { DoneView } from "@/components/ListingForm/DoneView";
import { PasswordView } from "@/components/ListingForm/PasswordView";
import { ListingFormComponents } from "@/components/ListingFormComponents";

type FormState = "password" | "form" | "done";

export function LandlordListingForm() {
  const [state, setState] = useState<FormState>("password");
  const [initialValues, setInitialValues] = useState<Unit>();

  const goToForm = () => {
    setState("form");
  };

  const goToDone = (initialvalues: Unit) => {
    setInitialValues(initialvalues);
    setState("done");
  };

  const CurrentView = () => {
    switch (state) {
      case "password":
        return <PasswordView handleNext={goToForm} />;
      case "form":
        return (
          <ListingFormComponents
            formType={"landlord"}
            handleAfterSubmit={goToDone}
            initialValues={initialValues}
          />
        );
      case "done":
        return <DoneView handleResubmit={goToForm} />;
    }
  };

  return (
    <Page>
      <Helmet>
        <title>USHS Landlord Submissions Form</title>
      </Helmet>
      <CurrentView />
    </Page>
  );
}
