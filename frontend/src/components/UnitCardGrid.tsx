import styled from "styled-components";

import { Unit } from "@/api/units";
import { UnitCard } from "@/components/UnitCard";

const UnitCardLayout = styled.div`
  // margin: 95px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 55px;
`;

const PropertiesText = styled.span`
  color: black;
  font-family: "Montserrat";
  font-size: 27px;
  font-weight: 700;
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 95px;
  gap: 30px;
`;

export type UnitCardGridProps = {
  units: Unit[];
};

export const UnitCardGrid = (props: UnitCardGridProps) => {
  console.log(props.units);

  return (
    <GridContainer>
      <PropertiesText>Available Properties</PropertiesText>
      <UnitCardLayout>
        {props.units.map((unit, idx) => (
          <UnitCard key={idx} unit={unit} />
        ))}
      </UnitCardLayout>
    </GridContainer>
  );
};

export default UnitCardGrid;
