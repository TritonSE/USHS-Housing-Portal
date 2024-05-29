import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  onClose: () => void;
  onSubmit: () => void;
};

export const ClearAllPopup = ({ active, onClose, onSubmit }: PopupProps) => {
  const [popup, setPopup] = useState<boolean>(false);
  const { handleSubmit, reset } = useForm();

  useEffect(() => {
    setPopup(active);
  }, [active]);

  return (
    <>
      {popup && (
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
              <h1>
                Are you sure you want to clear all fields? All previously inputted information will
                be erased.
              </h1>
              <ButtonsWrapper>
                <Button
                  onClick={() => {
                    onClose();
                  }}
                  kind="secondary"
                >
                  Cancel
                </Button>
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
      )}
    </>
  );
};
