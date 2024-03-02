import React, { useContext, useState } from "react";

import { ReferralTableDropDown } from "./ReferralTableDropDown";

import { Referral, getUnitReferrals } from "@/api/units";
import { AuthContext } from "@/contexts/AuthContext";
import { DataContext } from "@/contexts/DataContext";

type ReferralTableProps = {
  id: string;
};

export const ReferralTable = (props: ReferralTableProps) => {
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const [referrals, setReferrals] = useState<Referral[]>([]);

  React.useEffect(() => {
    if (authContext.currentUser) {
      void getUnitReferrals(props.id).then((res) => {
        if (res.success) {
          setReferrals(res.data);
          console.log(referrals);
        }
      });
    }

    if (dataContext) {
      console.log(dataContext);
    }
  }, [authContext, dataContext]);

  return (
    <div>
      <ReferralTableDropDown
        values={["Alice", "Bob", "Charlie", "SUPER LONG LONG LONG LONG LONG NAME"]}
        defaultValue={"Alice"}
      ></ReferralTableDropDown>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

// type ReferralTableRowProps = {
//   name: string,
//   contactInfo: string, // email;phone-number
//   referringStaff: string,
//   housingLocator: string,
//   status: string,
//   lastUpdate: Date,
// }

// export const ReferralTableRow = (props: ReferralTableRowProps) => {

// }
