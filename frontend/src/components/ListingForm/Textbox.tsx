import styled from "styled-components";

import { FieldHeader, Required, TextCol } from "@/components/ListingForm/CommonStyles";

const CustomInputText = styled.input<{ fontSize?: number; error: boolean }>`
  background-color: #fbf7f3;
  color: black;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid ${(props) => (props.error ? props.theme.colors.primary : "#ccc")};
  width: 300px;
  font-size: ${(props) => props.fontSize ?? 16}px;
`;

const CustomTextArea = styled.textarea<{ fontSize?: number; error: boolean }>`
  background-color: #fbf7f3;
  color: black;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid ${(props) => (props.error ? props.theme.colors.primary : "#ccc")};
  width: 300px;
  font-size: ${(props) => props.fontSize ?? 16}px;
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
} & React.HTMLProps<HTMLInputElement> &
  React.HTMLProps<HTMLTextAreaElement>;

export const Textbox = ({
  elementName,
  requiredField,
  kind,
  placeholder,
  type,
  name,
  value,
  handler,
  fontSize,
  errorMessage,
  ...restProps
}: TextboxProps) => {
  return (
    <TextCol>
      {elementName && requiredField ? (
        <FieldHeader>
          {elementName} <Required>*</Required>
        </FieldHeader>
      ) : (
        <FieldHeader>{elementName}</FieldHeader>
      )}

      {!elementName && <FieldHeader>&nbsp;</FieldHeader>}

      <div>
        <label>
          {(!kind || kind === "text") && !placeholder && (
            <CustomInputText
              className="textbox"
              type={type ?? "text"}
              name={name}
              value={value}
              onChange={handler as (event: React.ChangeEvent<HTMLInputElement>) => void}
              fontSize={fontSize}
              error={!!errorMessage}
              {...restProps}
            />
          )}
          {(!kind || kind === "text") && placeholder && (
            <CustomInputText
              className="textbox"
              type={type ?? "text"}
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={handler as (event: React.ChangeEvent<HTMLInputElement>) => void}
              fontSize={fontSize}
              error={!!errorMessage}
              {...restProps}
            />
          )}
          {kind === "textarea" && (
            <CustomTextArea
              value={value}
              onChange={handler as (event: React.ChangeEvent<HTMLTextAreaElement>) => void}
              error={!!errorMessage}
              {...restProps}
            />
          )}
        </label>
        {errorMessage && <Error>{errorMessage}</Error>}
      </div>
    </TextCol>
  );
};
