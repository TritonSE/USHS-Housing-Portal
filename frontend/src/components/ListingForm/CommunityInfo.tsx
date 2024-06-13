import { useRef, useState } from "react";

import {
  CustomCheckboxRadio,
  FieldHeader,
  Margin32,
  OptionLabel,
  OtherText,
  RadioCheckBoxContainer,
  RadioCheckboxCol,
  Required,
} from "@/components/ListingForm/CommonStyles";

type CommunityInfoProps = {
  communityAndNeighborInfo: string[];
  handleCommunityAndNeighborInfo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  otherText: string | undefined;
  handleOtherText: (text: string, checked: boolean) => void;
};

export const CommunityInfo = (props: CommunityInfoProps) => {
  const [otherText, setOtherText] = useState<string | undefined>(props.otherText);
  const otherCheckbox = useRef<HTMLInputElement>(null);

  return (
    <Margin32>
      <FieldHeader>
        Community and Neighborhood Information <Required>*</Required>
      </FieldHeader>
      <RadioCheckBoxContainer>
        <RadioCheckboxCol>
          <OptionLabel>
            <CustomCheckboxRadio
              type="checkbox"
              name="Automatic gate"
              value="Automatic gate"
              checked={props.communityAndNeighborInfo.includes("Automatic gate")}
              onChange={props.handleCommunityAndNeighborInfo}
            />
            Automatic gate
          </OptionLabel>

          <OptionLabel>
            <CustomCheckboxRadio
              type="checkbox"
              name="Gated community"
              value="Gated community"
              checked={props.communityAndNeighborInfo.includes("Gated community")}
              onChange={props.handleCommunityAndNeighborInfo}
            />
            Gated community
          </OptionLabel>

          <OptionLabel>
            <CustomCheckboxRadio
              type="checkbox"
              name="Pool"
              value="Pool"
              checked={props.communityAndNeighborInfo.includes("Pool")}
              onChange={props.handleCommunityAndNeighborInfo}
            />
            Pool
          </OptionLabel>

          <OptionLabel>
            <CustomCheckboxRadio
              type="checkbox"
              name="Club house"
              value="Clubhouse"
              checked={props.communityAndNeighborInfo.includes("Clubhouse")}
              onChange={props.handleCommunityAndNeighborInfo}
            />
            Clubhouse
          </OptionLabel>

          <OptionLabel>
            <CustomCheckboxRadio
              type="checkbox"
              name="Near public transport"
              value="Near public transport"
              checked={props.communityAndNeighborInfo.includes("Near public transport")}
              onChange={props.handleCommunityAndNeighborInfo}
            />
            Near public transport
          </OptionLabel>

          <OptionLabel>
            <CustomCheckboxRadio
              type="checkbox"
              name="Near grocery stores"
              value="Near grocery stores"
              checked={props.communityAndNeighborInfo.includes("Near grocery stores")}
              onChange={props.handleCommunityAndNeighborInfo}
            />
            Near grocery stores
          </OptionLabel>

          <OptionLabel>
            <CustomCheckboxRadio
              type="checkbox"
              name="Near schools"
              value="Near schools"
              checked={props.communityAndNeighborInfo.includes("Near schools")}
              onChange={props.handleCommunityAndNeighborInfo}
            />
            Near schools
          </OptionLabel>
        </RadioCheckboxCol>
        <div>
          <OptionLabel>
            <CustomCheckboxRadio
              type="checkbox"
              name="BBQ"
              value="BBQ"
              checked={props.communityAndNeighborInfo.includes("BBQ")}
              onChange={props.handleCommunityAndNeighborInfo}
            />
            BBQ
          </OptionLabel>

          <OptionLabel>
            <CustomCheckboxRadio
              type="checkbox"
              name="Playground nearby"
              value="Playground nearby"
              checked={props.communityAndNeighborInfo.includes("Playground nearby")}
              onChange={props.handleCommunityAndNeighborInfo}
            />
            Playground nearby
          </OptionLabel>

          <OptionLabel>
            <CustomCheckboxRadio
              type="checkbox"
              name="Park nearby"
              value="Park nearby"
              checked={props.communityAndNeighborInfo.includes("Park nearby")}
              onChange={props.handleCommunityAndNeighborInfo}
            />
            Park nearby
          </OptionLabel>

          <OptionLabel>
            <CustomCheckboxRadio
              type="checkbox"
              name="Smoke area"
              value="Smoke area"
              checked={props.communityAndNeighborInfo.includes("Smoke area")}
              onChange={props.handleCommunityAndNeighborInfo}
            />
            Smoke area
          </OptionLabel>

          <OptionLabel>
            <CustomCheckboxRadio
              type="checkbox"
              name="Other"
              value={otherText}
              defaultChecked={otherText !== undefined}
              onChange={(e) => {
                props.handleOtherText(otherText ?? "", e.target.checked);
              }}
              ref={otherCheckbox}
            />
            Other:{" "}
            <OtherText
              type="text"
              name="communityOtherText"
              value={otherText}
              onChange={(e) => {
                setOtherText(e.target.value);
                if (otherCheckbox.current) otherCheckbox.current.checked = true;
                props.handleOtherText(e.target.value, true);
              }}
            />
          </OptionLabel>
        </div>
      </RadioCheckBoxContainer>
    </Margin32>
  );
};
