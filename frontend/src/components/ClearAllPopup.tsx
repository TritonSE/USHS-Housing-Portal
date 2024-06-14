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
  width: 612px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 50px;
  z-index: 2;
  padding: 40px 96px;
`;

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
`;

const WarningMessageWrapper = styled.div`
  display: inline;
  align-items: center;
  text-align: center;
  margin-bottom: 0;
`;

const ConfirmButton = styled(Button)`
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 16px;
  height: 40px;
  border-radius: 12px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 240px;
`;

type PopupProps = {
  active: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ClearAllPopup = ({ active, onClose, onConfirm }: PopupProps) => {
  if (!active) return null;

  return (
    <>
      <Overlay />
      <Modal>
        <div />
        <HeadingWrapper>
          <img src="/warning.svg" alt="warning" />
        </HeadingWrapper>
        <WarningMessageWrapper>
          Are you sure you want to <b>clear all fields?</b> All previously inputted information will
          be <b>erased.</b>
        </WarningMessageWrapper>
        <ButtonsWrapper>
          <ConfirmButton kind="secondary" onClick={onClose}>
            Cancel
          </ConfirmButton>

          <ConfirmButton kind="primary" onClick={onConfirm}>
            Clear all fields
          </ConfirmButton>
        </ButtonsWrapper>
      </Modal>
    </>
  );
};
