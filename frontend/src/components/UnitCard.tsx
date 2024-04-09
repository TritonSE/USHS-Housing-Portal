import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Button } from "./Button";

import { Unit, deleteUnit } from "@/api/units";
import { DataContext } from "@/contexts/DataContext";
import { FiltersContext } from "@/pages/Home";

const UnitCardContainer = styled.div<{ pending: boolean }>`
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
  border: 1.3px solid ${(props) => (props.pending ? "rgba(230, 159, 28, 0.50)" : "#cdcaca")};
  box-shadow: 1.181px 1.181px 2.362px 0px rgba(188, 186, 183, 0.4);

  // position: absolute;
`;

const UnitCardText = styled.span`
  color: black;
  font-family: "Neutraface Text";
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

const DeleteIcon = styled.img`
  width: 35.432px;
  height: 35.432px;
  border-radius: 118.107px;
  background: #ec8537;
  position: relative;
  top: -27px;
  left: 310px;
  cursor: pointer;
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.25);
  z-index: 2;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 736px;
  height: 447px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 50px;
  z-index: 2;
`;

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

const ConfirmDelete = styled(Button)`
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 16px;
  width: 355px;
  height: 45px;
  border-radius: 12px;
`;

const XWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px 27px;
  font-size: 30px;
`;

const XButton = styled.div`
  &:hover {
    cursor: pointer;
  }
  height: 10px;
  width: 10px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
`;

type CardProps = {
  unit: Unit;
  refreshUnits?: () => void;
};

export const UnitCard = ({ unit, refreshUnits }: CardProps) => {
  const { filters } = useContext(FiltersContext);
  const [popup, setPopup] = useState<boolean>(false);
  const dataContext = useContext(DataContext);

  const handleDelete = () => {
    deleteUnit(unit._id)
      .then((value) => {
        if (value.success) console.log(value.data);
        setPopup(false);
        if (refreshUnits) refreshUnits();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Link to={`/unit/${unit._id}`} state={filters} style={{ textDecoration: "none" }}>
        <UnitCardContainer pending={!unit.approved}>
          <AvailabilityRow>
            {unit.availableNow && unit.approved ? (
              <AvailabilityIcon src="/green_ellipse.svg" />
            ) : (
              <AvailabilityIcon src="/red_ellipse.svg" />
            )}
            {unit.availableNow && unit.approved ? (
              <AvailabilityText>Available</AvailabilityText>
            ) : !unit.approved ? (
              <AvailabilityText>Pending Approval</AvailabilityText>
            ) : unit.leasedStatus !== undefined ? (
              <AvailabilityText>Leased</AvailabilityText>
            ) : (
              <AvailabilityText>Not Available</AvailabilityText>
            )}
          </AvailabilityRow>
          <RentText>{`$${unit.monthlyRent}/month`}</RentText>
          <BedBathRow>
            <NumberText>{unit.numBeds}</NumberText>
            <BedBathText>beds</BedBathText>
            <NumberText>{unit.numBaths}</NumberText>
            <BedBathText>baths</BedBathText>
            <NumberText>{unit.sqft}</NumberText>
            <BedBathText>sqft</BedBathText>
          </BedBathRow>
          <AddressRow>
            <AddressText>{unit.streetAddress}</AddressText>
            <AddressText>{`${unit.city}, ${unit.state} ${unit.areaCode}`}</AddressText>
          </AddressRow>
          {unit.approved && dataContext.currentUser?.isHousingLocator && (
            <DeleteIcon
              src="delete.png"
              onClick={(e) => {
                // Stop click from propagating to parent (opening the unit page)
                e.preventDefault();
                e.stopPropagation();
                setPopup(true);
              }}
            />
          )}
        </UnitCardContainer>
      </Link>
      {popup && (
        <>
          <Overlay />
          <Modal>
            <XWrapper>
              <XButton
                onClick={() => {
                  setPopup(false);
                }}
              >
                &times;
              </XButton>
            </XWrapper>
            <HeadingWrapper>
              <img src="warning.svg" alt="Warning" />
              <h1>Delete this listing?</h1>
            </HeadingWrapper>

            <ButtonsWrapper>
              <ConfirmDelete
                kind="primary"
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete
              </ConfirmDelete>
              <ConfirmDelete
                kind="secondary"
                onClick={() => {
                  setPopup(false);
                }}
              >
                Cancel
              </ConfirmDelete>
            </ButtonsWrapper>
          </Modal>
        </>
      )}
    </>
  );
};

export default UnitCard;
