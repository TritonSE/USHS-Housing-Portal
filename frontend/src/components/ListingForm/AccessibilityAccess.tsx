/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  CustomCheckboxRadio,
  FieldHeader,
  Margin32,
  RadioCheckBoxContainer,
  RadioCheckboxCol,
  Required,
} from "@/components/ListingForm/CommonStyles";

type AccessibilityAccessProps = {
  accessibility: string[];
  setAccessibility: React.Dispatch<React.SetStateAction<string[]>>;
  handleCheckBoxNA: (
    option: string,
    getter: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => void;
};
export const AccessibilityAccess = (props: AccessibilityAccessProps) => {
  return (
    <Margin32>
      <FieldHeader>
        Accessibility Access <Required>*</Required>
      </FieldHeader>
      <RadioCheckBoxContainer>
        <RadioCheckboxCol>
          <label>
            <CustomCheckboxRadio
              type="checkbox"
              name="1st floor"
              value="1st floor"
              checked={props.accessibility.includes("1st floor")}
              onChange={() => {
                props.handleCheckBoxNA("1st floor", props.accessibility, props.setAccessibility);
              }}
            />
            1st floor{" "}
          </label>
          <br />
          <label>
            <CustomCheckboxRadio
              type="checkbox"
              name="2nd floor and above"
              value="2nd floor and above"
              checked={props.accessibility.includes("2nd floor and above")}
              onChange={() => {
                props.handleCheckBoxNA(
                  "2nd floor and above",
                  props.accessibility,
                  props.setAccessibility,
                );
              }}
            />
            2nd floor and above{" "}
          </label>
          <br />
          <label>
            <CustomCheckboxRadio
              type="checkbox"
              name="Ramps up to unit"
              value="Ramps up to unit"
              checked={props.accessibility.includes("Ramps up to unit")}
              onChange={() => {
                props.handleCheckBoxNA(
                  "Ramps up to unit",
                  props.accessibility,
                  props.setAccessibility,
                );
              }}
            />
            Ramps up to unit
          </label>
        </RadioCheckboxCol>
        <div>
          <label>
            <CustomCheckboxRadio
              type="checkbox"
              name="Stairs only"
              value="Stairs only"
              checked={props.accessibility.includes("Stairs only")}
              onChange={() => {
                props.handleCheckBoxNA("Stairs only", props.accessibility, props.setAccessibility);
              }}
            />
            Stairs only
          </label>
          <br />
          <label>
            <CustomCheckboxRadio
              type="checkbox"
              name="Elevators to unit"
              value="Elevators to unit"
              checked={props.accessibility.includes("Elevators to unit")}
              onChange={() => {
                props.handleCheckBoxNA(
                  "Elevators to unit",
                  props.accessibility,
                  props.setAccessibility,
                );
              }}
            />
            Elevators to unit
          </label>
          <br />
          <label>
            <CustomCheckboxRadio
              type="radio"
              name="accessibilityN/A"
              value="N/A"
              checked={props.accessibility.includes("N/A")}
              onChange={() => {
                props.handleCheckBoxNA("N/A", props.accessibility, props.setAccessibility);
              }}
            />
            N/A
          </label>
        </div>
      </RadioCheckBoxContainer>
    </Margin32>
  );
};