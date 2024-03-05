// import styled from "styled-components";

import {
  CustomInputDate,
  FieldHeader,
  LabelTextCol,
  Required,
} from "@/components/ListingForm/CommonStyles";

export type DateAvailableProps = {
  dateAvailable: string | undefined;
  handleDateAvailable: () => void;
};

export const DateAvailable = (props: DateAvailableProps) => {
  return (
    <LabelTextCol>
      <FieldHeader>
        Date Available
        <Required>*</Required>
      </FieldHeader>
      <div>
        <CustomInputDate
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
