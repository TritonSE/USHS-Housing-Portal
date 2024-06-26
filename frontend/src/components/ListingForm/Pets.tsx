import {
  CustomCheckboxRadio,
  FieldHeader,
  Margin32,
  OptionLabel,
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
          <OptionLabel>
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
          </OptionLabel>

          <OptionLabel>
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
          </OptionLabel>

          <OptionLabel>
            <CustomCheckboxRadio
              type="checkbox"
              name="ESA letter required"
              value="ESA letter required"
              checked={props.pets.includes("ESA letter required")}
              onChange={() => {
                props.handleCheckBoxNA("ESA letter required", props.pets, props.setPets);
              }}
            />
            ESA letter required
          </OptionLabel>

          <OptionLabel>
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
          </OptionLabel>
        </RadioCheckboxCol>
        <div>
          {" "}
          <OptionLabel>
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
          </OptionLabel>
          <OptionLabel>
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
          </OptionLabel>
          <OptionLabel>
            <CustomCheckboxRadio
              type="radio"
              name="N/A_pets"
              value="N/A"
              checked={props.pets.includes("N/A")}
              onChange={() => {
                props.handleCheckBoxNA("N/A", props.pets, props.setPets);
              }}
            />
            N/A
          </OptionLabel>
        </div>
      </RadioCheckBoxContainer>
    </Margin32>
  );
};
