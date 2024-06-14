import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FilterParams, Unit, getUnits } from "@/api/units";
import styled from "styled-components";

import { Button } from "./Button";

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
  width: 900px;
  height: 600px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  z-index: 2;
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  padding-top: 25px;
  display: flex;
  flex-direction: row;
  gap: 400px;
`;

type PopupProps = {
  active: boolean;
  units: Unit[];
  filters: FilterParams;
  onClose: () => void;
};

export const ExportPopup = ({ active, units, filters, onClose }: PopupProps) => {
  const [popup, setPopup] = useState<boolean>(false);
  const [popup2, setPopup2] = useState<boolean>(false);

  useEffect(() => {
    setPopup(active);
  }, [active]);

  const onSubmit = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(units);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Units");
    setPopup2(true);
    setPopup(false);
  };

  return (
    <>
      {(popup && (
        <>
          <Overlay />
          <Modal>
            <XWrapper>
              <XButton
                onClick={() => {
                  onClose();
                }}
              >
                &times;
              </XButton>
            </XWrapper>
            <Wrapper>
              <h1>Exporting listings with the following filters:</h1>
              <h1>
                {" "}
                Price | ${filters.minPrice}-{filters.maxPrice}
              </h1>
              <h1>
                {" "}
                Beds & Baths | ${filters.beds}+ Beds, ${filters.baths}+ Baths
              </h1>
              <h1> Housing Authority | HACLA </h1>
              <h1>
                {" "}
                Rental Criteria | 3rd Party Payment, Credit Check Required, Background Check
                Requuired{" "}
              </h1>
              <ButtonsWrapper>
                <Button
                  onClick={() => {
                    onSubmit();
                  }}
                  kind="primary"
                >
                  Clear All Fields
                </Button>
              </ButtonsWrapper>
            </Wrapper>
          </Modal>
        </>
      )) ||
        (popup2 && (
          <>
            <Overlay />
            <Modal>
              <Wrapper>
                <h1>Data Exported</h1>
                <h1> Locate on Computer </h1>
                <ButtonsWrapper>
                  <Button
                    onClick={() => {
                      onSubmit();
                    }}
                    kind="primary"
                  >
                    Done
                  </Button>
                </ButtonsWrapper>
              </Wrapper>
            </Modal>
          </>
        ))}
    </>
  );
};
