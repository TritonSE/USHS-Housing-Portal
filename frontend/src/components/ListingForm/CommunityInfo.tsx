import {
  Margin32,
  RadioCheckBoxContainer,
  RadioCheckboxCol,
  Required,
} from "@/components/ListingForm/CommonStyles";

type CommunityInfoProps = {
  communityAndNeighborInfo: string[];
  handleCommunityAndNeighborInfo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  communityAndNeighborInfoOther: string;
  handleCommunityAndNeighborInfoOther: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function CommunityInfo(props: CommunityInfoProps) {
  return (
    <Margin32>
      <h3>
        Community and Neighborhood Information <Required>*</Required>
      </h3>
      <RadioCheckBoxContainer>
        <RadioCheckboxCol>
          <label>
            <input
              type="checkbox"
              name="Automatic gate"
              value="Automatic gate"
              checked={props.communityAndNeighborInfo.includes("Automatic gate")}
              onChange={props.handleCommunityAndNeighborInfo}
            />
            Automatic gate
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="Gated community"
              value="Gated community"
              checked={props.communityAndNeighborInfo.includes("Gated community")}
              onChange={props.handleCommunityAndNeighborInfo}
            />
            Gated community
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="Pool"
              value="Pool"
              checked={props.communityAndNeighborInfo.includes("Pool")}
              onChange={props.handleCommunityAndNeighborInfo}
            />
            Pool
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="Club house"
              value="Clubhouse"
              checked={props.communityAndNeighborInfo.includes("Clubhouse")}
              onChange={props.handleCommunityAndNeighborInfo}
            />
            Clubhouse
          </label>
        </RadioCheckboxCol>
        <div>
          <label>
            <input
              type="checkbox"
              name="BBQ"
              value="BBQ"
              checked={props.communityAndNeighborInfo.includes("BBQ")}
              onChange={props.handleCommunityAndNeighborInfo}
            />
            BBQ
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="Smoke area"
              value="Smoke area"
              checked={props.communityAndNeighborInfo.includes("Smoke area")}
              onChange={props.handleCommunityAndNeighborInfo}
            />
            Smoke area
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              name="Other"
              value="Other"
              checked={props.communityAndNeighborInfo.includes("Other")}
              onChange={props.handleCommunityAndNeighborInfo}
            />
            Other:{" "}
            <input
              type="text"
              name="communityOtherText"
              value={
                props.communityAndNeighborInfo.includes("Other")
                  ? props.communityAndNeighborInfoOther
                  : ""
              }
              onChange={props.handleCommunityAndNeighborInfoOther}
            />
          </label>
        </div>
      </RadioCheckBoxContainer>
    </Margin32>
  );
}

export default CommunityInfo;
