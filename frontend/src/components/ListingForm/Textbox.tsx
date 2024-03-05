import {
  CustomInputText,
  FieldHeader,
  Required,
  TextCol,
} from "@/components/ListingForm/CommonStyles";

type TextboxProps = {
  elementName?: string;
  placeholder?: string;
  name: string;
  value: string | number | undefined;
  requiredField?: boolean;
  handler: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
          {!props.placeholder && (
            <CustomInputText
              className="textbox"
              type="text"
              name={props.name}
              value={props.value}
              onChange={props.handler}
            />
          )}
          {props.placeholder && (
            <CustomInputText
              className="textbox"
              type="text"
              placeholder={props.placeholder}
              name={props.name}
              value={props.value}
              onChange={props.handler}
            />
          )}
        </label>
      </div>
    </TextCol>
  );
};
