import { useState } from "react";
import styled from "styled-components";

import { UnitCard } from "@/components/UnitCard";

const UnitCardLayout = styled.div`
  // margin: 95px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 55px;
`;

const PropertiesRow = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: black;
  font-family: "Montserrat";
  font-size: 27px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 95px;
  margin-top: 50px;
  gap: 30px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  left: 67vw;
  position: absolute;
`;

const PendingButton = styled.div<{ selected: boolean }>`
  display: flex;
  width: 164px;
  height: 55px;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => (props.selected ? "12px" : "12px 0px 0px 12px")};
  border: 1px solid ${(props) => (props.selected ? "rgba(162, 61, 4, 0.80)" : "#EEE")};
  background: ${(props) => (props.selected ? "#B64201" : "#EEE")};
  color: ${(props) => (props.selected ? "#EEE" : "#2E2E2E")};
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  z-index: ${(props) => (props.selected ? 1 : 0)};
  cursor: pointer;
`;
const ListingsButton = styled.div<{ selected: boolean }>`
  display: flex;
  width: 164px;
  height: 55px;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => (props.selected ? "12px" : "0px 12px 12px 0px")};
  border: 1px solid ${(props) => (props.selected ? "rgba(162, 61, 4, 0.80)" : "#EEE")};
  background: ${(props) => (props.selected ? "#B64201" : "#EEE")};
  color: ${(props) => (props.selected ? "#EEE" : "#2E2E2E")};
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  position: relative;
  left: -10px;
  z-index: ${(props) => (props.selected ? 1 : 0)};
  cursor: pointer;
`;

// Hard coded units for testing
// Props and units hard coded; replace with backend query
export const UnitCardGrid = () => {
  const [pendingSelected, setPendingSelected] = useState<boolean>(false);
  return (
    <GridContainer>
      {pendingSelected ? (
        <>
          <PropertiesRow>
            <div>Pending Approval</div>
            <ButtonsWrapper>
              <PendingButton
                onClick={() => {
                  setPendingSelected(true);
                }}
                selected={pendingSelected}
              >
                Pending Listings
              </PendingButton>
              <ListingsButton
                onClick={() => {
                  setPendingSelected(false);
                }}
                selected={!pendingSelected}
              >
                All Listings
              </ListingsButton>
            </ButtonsWrapper>
          </PropertiesRow>
          <UnitCardLayout>
            <UnitCard pending={true} />
            <UnitCard pending={true} />
            <UnitCard pending={true} />
          </UnitCardLayout>
        </>
      ) : (
        <>
          <PropertiesRow>
            <div>Available Properties</div>
            <ButtonsWrapper>
              <PendingButton
                onClick={() => {
                  setPendingSelected(true);
                }}
                selected={pendingSelected}
              >
                Pending Listings
              </PendingButton>
              <ListingsButton
                onClick={() => {
                  setPendingSelected(false);
                }}
                selected={!pendingSelected}
              >
                All Listings
              </ListingsButton>
            </ButtonsWrapper>
          </PropertiesRow>
          <UnitCardLayout>
            <UnitCard pending={false} />
            <UnitCard pending={false} />
            <UnitCard pending={false} />
            <UnitCard pending={false} />
            <UnitCard pending={false} />
            <UnitCard pending={false} />
          </UnitCardLayout>
        </>
      )}
    </GridContainer>
  );
};

export default UnitCardGrid;
