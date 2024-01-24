import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";

import { Unit, getUnit } from "@/api/units";
import { Page } from "@/components";
// import { privateDecrypt } from "crypto";

export function UnitDetails() {
  const [unit, setUnit] = useState<Unit>();
  const { id } = useParams();

  React.useEffect(() => {
    if (id !== undefined) {
      void getUnit(id).then((result) => {
        if (result.success) {
          setUnit(result.data);
        }
      });
    }
  }, []);

  if (unit === undefined) {
    return (
      <Page>
        <Helmet>
          <title>Unit Does Not Exist | USHS Housing Portal</title>
        </Helmet>
        {/* add button */}
        <h1>This unit does not exist!</h1>
      </Page>
    );
  }

  return (
    <Page>
      <Helmet>
        <title>{unit._id} | USHS Housing Portal</title>
      </Helmet>
      {/* add button */}
      <h2>{unit.monthlyRent}/month</h2>
      <h1>{unit.listingAddress}</h1>
      <h2>Fees </h2>
      <h3>Security Deposit: </h3>
      <ul>
        <li>{unit.securityDeposit}</li>
      </ul>
      <h3>Application Fee: </h3>
      <ul>
        <li>{unit.applicationFeeCost}</li>
      </ul>
      <h3>Payment/Renting Criteria: </h3>
      <ul>
        <li>{unit.paymentRentingCriteria}</li>
      </ul>
      <h3>Holding Fee; </h3>
      <ul>
        {/* check to see if the holding fee amount is needed and 
            base ouput on that  */}
        <li>{unit.holdingFeeAmount}</li>
      </ul>
      <h2> Housing Specifications: </h2>
      <h3>Parking: </h3>
      <ul>
        <li>{unit.parking}</li>
      </ul>
      <h3>Accessibility Access:</h3>
      <ul>
        <li>{unit.accessibility}</li>
      </ul>
      <h3>Pets/Animals</h3>
      <ul>
        <li>{unit.pets}</li>
      </ul>
      <h3>Sharing House Acceptable:</h3>
      <ul>
        <li>{unit.sharingAcceptable}</li>
      </ul>
      <h3>Appliances: </h3>
      <ul>
        <li>{unit.appliances}</li>
      </ul>
      <h3>Community/Neighborhood Information: </h3>
      <ul>
        <li>{unit.communityFeatures}</li>
      </ul>
      <h3>Housing Authority: </h3>
      <ul>
        <li>{unit.housingAuthority}</li>
      </ul>
      <h3>Additional Comments from Landlord: </h3>
      <ul>
        <li>{unit.additionalRules}</li>
      </ul>
    </Page>
  );
}
