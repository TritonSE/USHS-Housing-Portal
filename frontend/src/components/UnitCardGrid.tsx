import styled from "styled-components";

import { Unit } from "@/api/units";
import { UnitCard } from "@/components/UnitCard";

const UnitCardLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 22px;
`;

const HeaderText = styled.span`
  font-family: "Neutraface Text";
  font-size: 32px;
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
              key={`${option.listingAddress}_${index}`}
            />
          ))}
        {units.length === 0 && <HeaderText>No matching units found</HeaderText>}
      </UnitCardLayout>
    </>
  );
};

export default UnitCardGrid;
