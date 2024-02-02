import styled from "styled-components";
import { UnitCard } from "@/components/UnitCard";

const UnitCardLayout = styled.div`
  // margin: 95px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 55px;
`;

const PropertiesText = styled.span`
  color: ${(props) => props.theme.colors.text};
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

// Hard coded units for testing
export const UnitCardGrid = ({ units }) => {
  return (
    <GridContainer>
      <PropertiesText>Available Properties</PropertiesText>
      <UnitCardLayout>
        <UnitCard />
        <UnitCard />
        <UnitCard />
        <UnitCard />
        <UnitCard />
        <UnitCard />
      </UnitCardLayout>
    </GridContainer>
  );
};

export default UnitCardGrid;
