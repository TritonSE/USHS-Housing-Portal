import { useContext, useState } from "react";
import styled from "styled-components";

import { Unit } from "@/api/units";
import { UnitCard } from "@/components/UnitCard";
import { DataContext } from "@/contexts/DataContext";

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

const HeaderText = styled.span`
  font-family: "Neutraface Text";
  font-size: 32px;
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
  left: 74vw;
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

const ListingsButton = styled(PendingButton)`
  border-radius: ${(props) => (props.selected ? "12px" : "0px 12px 12px 0px")};
  position: relative;
  left: -10px;
`;

const AddListings = styled.div`
  display: flex;
  flex-direction: column
  width: 160px;
  padding: 15px 32px 15px 24px;
  align-items: center;
  border-radius: 30px;
  border: 1px solid #d9d8d8;
  background: rgba(182, 66, 1, 0.8);
  box-shadow: 0px 4px 4px 0px rgba(190, 180, 180, 0.25);
  position: fixed;
  left: 85vw;
  bottom: 7.5vh;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
`;

export type UnitCardGridProps = {
  units: Unit[];
  refreshUnits: (approved: "pending" | "approved") => void;
};

export const UnitCardGrid = ({ units, refreshUnits }: UnitCardGridProps) => {
  const [pendingSelected, setPendingSelected] = useState<boolean>(false);

  const dataContext = useContext(DataContext);

  const approvedString = pendingSelected ? "pending" : "approved";

  return (
    <>
      <GridContainer>
        {pendingSelected ? (
          <>
            <PropertiesRow>
              <HeaderText>Pending Approval</HeaderText>
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
                    refreshUnits("approved");
                  }}
                  selected={!pendingSelected}
                >
                  All Listings
                </ListingsButton>
              </ButtonsWrapper>
            </PropertiesRow>
            <UnitCardLayout>
              {units.length > 0 &&
                units.map((option, index) => (
                  <UnitCard
                    unit={option}
                    refreshUnits={() => {
                      refreshUnits(approvedString);
                    }}
                    key={index}
                  />
                ))}
              {units.length === 0 && <HeaderText>No matching units found</HeaderText>}
            </UnitCardLayout>
          </>
        ) : (
          <>
            <PropertiesRow>
              <HeaderText>Available Properties</HeaderText>
              {dataContext.currentUser?.isHousingLocator && (
                <ButtonsWrapper>
                  <PendingButton
                    onClick={() => {
                      setPendingSelected(true);
                      refreshUnits("pending");
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
              )}
            </PropertiesRow>
            <UnitCardLayout>
              {units.length > 0 &&
                units.map((option, index) => (
                  <UnitCard
                    unit={option}
                    refreshUnits={() => {
                      refreshUnits(approvedString);
                    }}
                    key={index}
                  />
                ))}
              {units.length === 0 && <HeaderText>No matching units found</HeaderText>}
            </UnitCardLayout>
          </>
        )}
      </GridContainer>
      {dataContext.currentUser?.isHousingLocator && (
        <AddListings>
          <img src="add_symbol.svg" alt="add" />
          <div>Listings</div>
        </AddListings>
      )}
    </>
  );
};

export default UnitCardGrid;
