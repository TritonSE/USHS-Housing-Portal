import styled from "styled-components";

import { FieldHeader, LabelTextCol, Required } from "@/components/ListingForm/CommonStyles";

const CustomInputDate = styled.input`
  background-color: #fbf7f3;
  color: black;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
  font-size: 16px;
`;

export type DateAvailableProps = {
  dateAvailable: string | undefined;
  handleDateAvailable: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
          name="Date Available"
          value={props.dateAvailable}
          onChange={props.handleDateAvailable}
        />
      </div>
    </LabelTextCol>
  );
};
