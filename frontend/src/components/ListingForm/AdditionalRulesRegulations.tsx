import {
  Margin32,
  //   RadioCheckBoxContainer,
  //   RadioCheckboxCol,
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
      <h3>
        Additional Rules/Regulations <Required>*</Required>
      </h3>
      {/* <RadioCheckBoxContainer>
        <RadioCheckboxCol> */}
      <label>
        <input
          type="checkbox"
          name="additionalRulesRegulations allowed"
          value="additionalRulesRegulations allowed"
          checked={props.additionalRulesRegulations.includes("additionalRulesRegulations allowed")}
          onChange={() => {
            props.handleCheckBoxNA(
              "additionalRulesRegulations allowed",
              props.additionalRulesRegulations,
              props.setAdditionalRulesRegulations,
            );
          }}
        />
        additionalRulesRegulations allowed
      </label>
      <br />
      <label>
        <input
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
        <input
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
        <input
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
      {/* </RadioCheckboxCol> */}
      <div>
        {" "}
        <label>
          <input
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
          <input
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
          <input
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
          <input
            type="radio"
            name="N/A"
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
      {/* //   </RadioCheckBoxContainer> */}
    </Margin32>
  );
};
