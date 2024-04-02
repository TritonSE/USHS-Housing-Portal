import styled from "styled-components";

import {
  // CustomInputText,
  FieldHeader,
  Required,
  TextCol,
} from "@/components/ListingForm/CommonStyles";

const CustomInputText = styled.input<{ fontSize?: number; error: boolean }>`
  background-color: #fbf7f3;
  color: black;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid ${(props) => (props.error ? props.theme.colors.primary : "#ccc")};
  width: 300px;
  ${(props) =>
    props.fontSize &&
    `
      font-size: ${props.fontSize}px;
    `}
`;

const CustomTextArea = styled.textarea<{ fontSize?: number; error: boolean }>`
  background-color: #fbf7f3;
  color: black;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid ${(props) => (props.error ? props.theme.colors.primary : "#ccc")};
  width: 300px;
  ${(props) =>
    props.fontSize &&
    `
      font-size: ${props.fontSize}px;
    `}
`;

const Error = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: ${(props) => props.theme.colors.primary};
`;

type TextboxProps = {
  elementName?: string;
  placeholder?: string;
  kind?: "text" | "textarea";
  type?: string;
  name: string;
  value: string | number | undefined;
  requiredField?: boolean;
  fontSize?: number;
  errorMessage?: string;
  handler:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | ((event: React.ChangeEvent<HTMLTextAreaElement>) => void);
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
              type={props.type ?? "text"}
              name={props.name}
              value={props.value}
              onChange={props.handler as (event: React.ChangeEvent<HTMLInputElement>) => void}
              fontSize={props.fontSize}
              error={!!props.errorMessage}
            />
          )}
          {(!props.kind || props.kind === "text") && props.placeholder && (
            <CustomInputText
              className="textbox"
              type={props.type ?? "text"}
              placeholder={props.placeholder}
              name={props.name}
              value={props.value}
              onChange={props.handler as (event: React.ChangeEvent<HTMLInputElement>) => void}
              fontSize={props.fontSize}
              error={!!props.errorMessage}
            />
          )}
          {props.kind === "textarea" && (
            <CustomTextArea
              value={props.value}
              onChange={props.handler as (event: React.ChangeEvent<HTMLTextAreaElement>) => void}
              error={!!props.errorMessage}
            />
          )}
        </label>
        {props.errorMessage && <Error>{props.errorMessage}</Error>}
      </div>
    </TextCol>
  );
};
