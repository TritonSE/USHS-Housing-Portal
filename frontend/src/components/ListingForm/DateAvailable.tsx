// import styled from "styled-components";

import { LabelTextCol, Required } from "@/components/ListingForm/CommonStyles";

export type DateAvailableProps = {
  dateAvailable: string | undefined;
  handleDateAvailable: () => void;
};

export const DateAvailable = (props: DateAvailableProps) => {
  return (
    <LabelTextCol>
      <h3>
        Date Available
        <Required>*</Required>
      </h3>
      <div>
        <input
          type="date"
          name="No"
          value={props.dateAvailable}
          onChange={props.handleDateAvailable}
        />
      </div>
    </LabelTextCol>
  );
};

export default DateAvailable;
