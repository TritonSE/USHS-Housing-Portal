import {
    CustomCheckboxRadio,
    FieldHeader,
    Margin32,
    OptionLabel,
    RadioCheckBoxContainer,
    RadioCheckboxCol,
    Required,
  } from "@/components/ListingForm/CommonStyles";
  
  type UtilitiesProps = {
    utilities: string[];
    setUtilities: React.Dispatch<React.SetStateAction<string[]>>;
    handleCheckBoxNA: (
      option: string,
      getter: string[],
      setter: React.Dispatch<React.SetStateAction<string[]>>,
    ) => void;
  };
  
  export const Utilities = (props: UtilitiesProps) => {
    return (
      <Margin32>
        <FieldHeader>
          Utilities Included <Required>*</Required>
        </FieldHeader>
        <RadioCheckBoxContainer>
          <RadioCheckboxCol>
            <OptionLabel>
              <CustomCheckboxRadio
                type="checkbox"
                name="Electricity"
                value="Electricity"
                checked={props.utilities.includes("Electricity")}
                onChange={() => {
                  props.handleCheckBoxNA("Electricity", props.utilities, props.setUtilities);
                }}
              />
              Electricity
            </OptionLabel>
  
            <OptionLabel>
              <CustomCheckboxRadio
                type="checkbox"
                name="Water"
                value="Water"
                checked={props.utilities.includes("Water")}
                onChange={() => {
                  props.handleCheckBoxNA("Water", props.utilities, props.setUtilities);
                }}
              />
              Water
            </OptionLabel>
  
            <OptionLabel>
              <CustomCheckboxRadio
                type="checkbox"
                name="Gas"
                value="Gas"
                checked={props.utilities.includes("Gas")}
                onChange={() => {
                  props.handleCheckBoxNA("Gas", props.utilities, props.setUtilities);
                }}
              />
              Gas
            </OptionLabel>
  
            <OptionLabel>
              <CustomCheckboxRadio
                type="checkbox"
                name="Trash"
                value="Trash"
                checked={props.utilities.includes("Trash")}
                onChange={() => {
                  props.handleCheckBoxNA("Trash", props.utilities, props.setUtilities);
                }}
              />
              Trash
            </OptionLabel>
            </RadioCheckboxCol>
        </RadioCheckBoxContainer>
      </Margin32>
    );
  };
  