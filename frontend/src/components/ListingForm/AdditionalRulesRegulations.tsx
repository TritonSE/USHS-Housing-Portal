/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  CustomCheckboxRadio,
  FieldHeader,
  Margin32,
  Required,
} from "@/components/ListingForm/CommonStyles";

type AdditionalRulesRegulationsProps = {
  additionalRulesRegulations: string[];
  setAdditionalRulesRegulations: React.Dispatch<React.SetStateAction<string[]>>;
  handleCheckBoxNA: (
    option: string,
    getter: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => void;
};
export const AdditionalRulesRegulations = (props: AdditionalRulesRegulationsProps) => {
  return (
    <Margin32>
      <FieldHeader>
        Additional Rules/Regulations <Required>*</Required>
      </FieldHeader>
      <label>
        <CustomCheckboxRadio
          type="checkbox"
          name="Pets allowed"
          value="Pets allowed"
          checked={props.additionalRulesRegulations.includes("Pets allowed")}
          onChange={() => {
            props.handleCheckBoxNA(
              "Pets allowed",
              props.additionalRulesRegulations,
              props.setAdditionalRulesRegulations,
            );
          }}
        />
        Pets allowed
      </label>
      <br />
      <label>
        <CustomCheckboxRadio
          type="checkbox"
          name="Manager on site"
          value="Manager on site"
          checked={props.additionalRulesRegulations.includes("Manager on site")}
          onChange={() => {
            props.handleCheckBoxNA(
              "Manager on site",
              props.additionalRulesRegulations,
              props.setAdditionalRulesRegulations,
            );
          }}
        />
        Manager on site
      </label>
      <br />
      <label>
        <CustomCheckboxRadio
          type="checkbox"
          name="Quiet Building"
          value="Quiet Building"
          checked={props.additionalRulesRegulations.includes("Quiet Building")}
          onChange={() => {
            props.handleCheckBoxNA(
              "Quiet Building",
              props.additionalRulesRegulations,
              props.setAdditionalRulesRegulations,
            );
          }}
        />
        Quiet Building
      </label>
      <br />
      <label>
        <CustomCheckboxRadio
          type="checkbox"
          name="Visitor Policies"
          value="Visitor Policies"
          checked={props.additionalRulesRegulations.includes("Visitor Policies")}
          onChange={() => {
            props.handleCheckBoxNA(
              "Visitor Policies",
              props.additionalRulesRegulations,
              props.setAdditionalRulesRegulations,
            );
          }}
        />
        Visitor Policies
      </label>
      <div>
        <label>
          <CustomCheckboxRadio
            type="checkbox"
            name="Kid friendly"
            value="Kid friendly"
            checked={props.additionalRulesRegulations.includes("Kid friendly")}
            onChange={() => {
              props.handleCheckBoxNA(
                "Kid friendly",
                props.additionalRulesRegulations,
                props.setAdditionalRulesRegulations,
              );
            }}
          />
          Kid friendly
        </label>
        <br />
        <label>
          <CustomCheckboxRadio
            type="checkbox"
            name="Minimal-management interactions"
            value="Minimal-management interactions"
            checked={props.additionalRulesRegulations.includes("Minimal-management interactions")}
            onChange={() => {
              props.handleCheckBoxNA(
                "Minimal-management interactions",
                props.additionalRulesRegulations,
                props.setAdditionalRulesRegulations,
              );
            }}
          />
          Minimal-management interactions
        </label>
        <br />
        <label>
          <CustomCheckboxRadio
            type="checkbox"
            name="High-management interactions"
            value="High-management interactions"
            checked={props.additionalRulesRegulations.includes("High-management interactions")}
            onChange={() => {
              props.handleCheckBoxNA(
                "High-management interactions",
                props.additionalRulesRegulations,
                props.setAdditionalRulesRegulations,
              );
            }}
          />
          High-management interactions
        </label>
        <br />
        <label>
          <CustomCheckboxRadio
            type="radio"
            name="N/A_additionalrulesregs"
            value="N/A"
            checked={props.additionalRulesRegulations.includes("N/A")}
            onChange={() => {
              props.handleCheckBoxNA(
                "N/A",
                props.additionalRulesRegulations,
                props.setAdditionalRulesRegulations,
              );
            }}
          />
          N/A
        </label>
      </div>
    </Margin32>
  );
};
