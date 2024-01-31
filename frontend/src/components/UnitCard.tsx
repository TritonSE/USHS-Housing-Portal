import styled from "styled-components";

const UnitCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  gap: 16px;

  padding-left: 18px;
  padding-top: 25px;
  width: 380px;
  height: 287px;
  background-color: white;

  border-radius: 6.5px;
  border: 1.3px solid #CDCACA;
  box-shadow: 1.181px 1.181px 2.362px 0px rgba(188, 186, 183, 0.40);
`;

const UnitCardText = styled.span`
  color: ${props => props.theme.colors.text};
  font-family: "Neutra Text";
`;

const AvailabilityRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  padding-bottom: 32px;
`;

const BedBathRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const AddressRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const AvailabilityIcon = styled.img`
  width: 23.621px;
  height: 23.621px;
`;

const AvailabilityText = styled(UnitCardText)`
  font-family: Montserrat;
  font-size: 16.535px;
  font-style: normal;
  font-weight: 300;
  line-height: 150%;
  letter-spacing: 0.331px;
`;

const RentText = styled(UnitCardText)`
  font-size: 33.07px;
  font-style: normal;
  font-weight: 700;
  line-height: 121%;
  letter-spacing: 0.331px;
`;

const AddressText = styled(UnitCardText)`
  font-family: Montserrat;
  font-size: 18.897px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
`;

const NumberText = styled(UnitCardText)`
  font-family: Montserrat;
  font-size: 21.26px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: 0.425px;
`;

const BedBathText = styled(NumberText)`
  font-weight: 500;
  padding-right: 10px;
`;

// Hard coded unit data for testing
const UnitCard = ({ unit }) => {
  return (
    <UnitCardContainer>
      <AvailabilityRow>
        <AvailabilityIcon src="/green_ellipse.svg" />
        <AvailabilityText>Available</AvailabilityText>
      </AvailabilityRow>
      <RentText>$1390/month</RentText>
      <BedBathRow>
        <NumberText>2</NumberText>
        <BedBathText>beds</BedBathText>
        <NumberText>2</NumberText>
        <BedBathText>baths</BedBathText>
        <NumberText>1231</NumberText>
        <BedBathText>sqft</BedBathText>
      </BedBathRow>
      <AddressRow>
        <AddressText>1829 Prospect Ave</AddressText>
        <AddressText>Pasadena, CA 91776</AddressText>
      </AddressRow>
    </UnitCardContainer>
  )
}

export default UnitCard;
