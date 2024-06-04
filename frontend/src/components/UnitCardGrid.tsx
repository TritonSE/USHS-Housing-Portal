import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Unit } from "@/api/units";
import { UnitCard } from "@/components/UnitCard";
import { DataContext } from "@/contexts/DataContext";

const UnitCardLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 55px;
`;

const HeaderText = styled.span`
  font-family: "Neutraface Text";
  font-size: 32px;
`;

const AddListings = styled.div`
  display: flex;
  flex-direction: column;
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
  showPendingUnits?: boolean;
  refreshUnits: (approved: "pending" | "approved") => void;
};

export const UnitCardGrid = ({
  units,
  refreshUnits,
  showPendingUnits = false,
}: UnitCardGridProps) => {
  const navigate = useNavigate();

  const dataContext = useContext(DataContext);

  return (
    <>
      <UnitCardLayout>
        {units.length > 0 &&
          units.map((option, index) => (
            <UnitCard
              unit={option}
              refreshUnits={() => {
                refreshUnits(showPendingUnits ? "pending" : "approved");
              }}
              key={index}
            />
          ))}
        {units.length === 0 && <HeaderText>No matching units found</HeaderText>}
      </UnitCardLayout>
      {dataContext.currentUser?.isHousingLocator && (
        <AddListings
          onClick={() => {
            navigate("/new-listing");
          }}
        >
          <img src="add_symbol.svg" alt="add" />
          <div>Listings</div>
        </AddListings>
      )}
    </>
  );
};

export default UnitCardGrid;
