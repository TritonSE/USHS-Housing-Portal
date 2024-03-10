/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  CustomCheckboxRadio,
  FieldHeader,
  Margin32,
  RadioCheckBoxContainer,
  RadioCheckboxCol,
  Required,
} from "@/components/ListingForm/CommonStyles";

type PetsProps = {
  pets: string[];
  setPets: React.Dispatch<React.SetStateAction<string[]>>;
  handleCheckBoxNA: (
    option: string,
    getter: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => void;
};
export const Pets = (props: PetsProps) => {
  return (
    <Margin32>
      <FieldHeader>
        Pets/animals <Required>*</Required>
      </FieldHeader>
      <RadioCheckBoxContainer>
        <RadioCheckboxCol>
          <label>
            <CustomCheckboxRadio
              type="checkbox"
              name="Pets allowed"
              value="Pets allowed"
              checked={props.pets.includes("Pets allowed")}
              onChange={() => {
                props.handleCheckBoxNA("Pets allowed", props.pets, props.setPets);
              }}
            />
            Pets allowed
          </label>
          <br />
          <label>
            <CustomCheckboxRadio
              type="checkbox"
              name="Pets not allowed"
              value="Pets not allowed"
              checked={props.pets.includes("Pets not allowed")}
              onChange={() => {
                props.handleCheckBoxNA("Pets not allowed", props.pets, props.setPets);
              }}
            />
            Pets not allowed
          </label>
          <br />
          <label>
            <CustomCheckboxRadio
              type="checkbox"
              name="ESA letter required"
              value="ESA letter required"
              checked={props.pets.includes("ESA letter requirequired")}
              onChange={() => {
                props.handleCheckBoxNA(
                  "ESA letter requirequiredFieldColor",
                  props.pets,
                  props.setPets,
                );
              }}
            />
            ESA letter requirequiredFieldColor
          </label>
          <br />
          <label>
            <CustomCheckboxRadio
              type="checkbox"
              name="Small dogs/cats allowed only"
              value="Small dogs/cats allowed only"
              checked={props.pets.includes("Small dogs/cats allowed only")}
              onChange={() => {
                props.handleCheckBoxNA("Small dogs/cats allowed only", props.pets, props.setPets);
              }}
            />
            Small dogs/cats allowed only
          </label>
        </RadioCheckboxCol>
        <div>
          {" "}
          <label>
            <CustomCheckboxRadio
              type="checkbox"
              name="Big dogs allowed"
              value="Big dogs allowed"
              checked={props.pets.includes("Big dogs allowed")}
              onChange={() => {
                props.handleCheckBoxNA("Big dogs allowed", props.pets, props.setPets);
              }}
            />
            Big dogs allowed
          </label>
          <br />
          <label>
            <CustomCheckboxRadio
              type="checkbox"
              name="Pet deposit fee (included in security deposit)"
              value="Pet deposit fee (included in security deposit)"
              checked={props.pets.includes("Pet deposit fee (included in security deposit)")}
              onChange={() => {
                props.handleCheckBoxNA(
                  "Pet deposit fee (included in security deposit)",
                  props.pets,
                  props.setPets,
                );
              }}
            />
            Pet deposit fee (included in security deposit)
          </label>
          <br />
          <label>
            <CustomCheckboxRadio
              type="radio"
              name="N/A"
              value="N/A"
              checked={props.pets.includes("N/A")}
              onChange={() => {
                props.handleCheckBoxNA("N/A", props.pets, props.setPets);
              }}
            />
            N/A
          </label>
          {console.log(props.pets)}
          {console.log("props.pets.includes(\"N/A\"): " + props.pets.includes("N/A"))}

        </div>
      </RadioCheckBoxContainer>
    </Margin32>
  );
};
