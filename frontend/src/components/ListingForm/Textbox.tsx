import {
  // CustomInputText,
  FieldHeader,
  Required,
  TextCol,
} from "@/components/ListingForm/CommonStyles";
import styled from "styled-components";

const CustomInputText = styled.input`
  background-color: #fbf7f3;
  color: black;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
`;

const CustomTextArea = styled.textarea`
background-color: #fbf7f3;
  color: black;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
`

type TextboxProps = {
  elementName?: string;
  placeholder?: string;
  kind?: "text" | "textarea";
  name: string;
  value: string | number | undefined;
  requiredField?: boolean;
  handler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const Textbox = (props: TextboxProps) => {
  return (
    <TextCol>
      {props.elementName && props.requiredField ? (
        <FieldHeader>
          {props.elementName} <Required>*</Required>
        </FieldHeader>
      ) : (
        <FieldHeader>{props.elementName}</FieldHeader>
      )}

      {!props.elementName && <FieldHeader>&nbsp;</FieldHeader>}

      <div>
        <label>
          {(!props.kind || props.kind === "text") && !props.placeholder && (
            <CustomInputText
              className="textbox"
              type="text"
              name={props.name}
              value={props.value}
              onChange={props.handler}
            />
          )}
          {(!props.kind || props.kind === "text") && props.placeholder && (
            <CustomInputText
              className="textbox"
              type= "text"
              placeholder={props.placeholder}
              name={props.name}
              value={props.value}
              onChange={props.handler}
            />
          )}
          {(props.kind === "textarea" ) && (
            <CustomTextArea value={props.value} onChange={props.handler}/>
          )}
        </label>
      </div>
    </TextCol>
  );
};
