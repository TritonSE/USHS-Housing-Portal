import styled from "styled-components";
import UnitCard from "@/components/UnitCard";

const UnitCardLayout = styled.div`
  margin: 95px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 55px;
`;

// Hard coded units for testing
export const UnitCardGrid = ({ units }) => {
  return (
    <UnitCardLayout>
      <UnitCard />
      <UnitCard />
      <UnitCard />
      <UnitCard />
      <UnitCard />
      <UnitCard />
    </UnitCardLayout>
  )
}

export default UnitCardGrid;
