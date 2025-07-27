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
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
  z-index: 2;
  padding: 97px 186px;
`;

const HeadingWrapper = styled.div`
  font-family: "Neutraface Text";
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
`;

const MessageWrapper = styled.div`
  font-size: 16px;
  margin-top: 10px;
  text-align: center;
`;

const ButtonsWrapper = styled.div`
  padding-top: 25px;
  display: flex;
  flex-direction: row;
  gap: 400px;
`;

const Icon = styled.img`
  width: 78px;
  height: 78px;
`;

type PopupProps = {
  active: boolean;
  onClose: () => void;
};

export const ExportPopup = ({ active, onClose }: PopupProps) => {
  if (!active) return null;

  return (
    <>
      <Overlay />
      <Modal>
        <Icon src="/dark_green_check.svg" />
        <div>
          <HeadingWrapper>Data Exporting...</HeadingWrapper>
          <MessageWrapper>
            Generating an Excel sheet with all Units, Referrals, Renter Candidates, and Staff data.
            The download will start shortly...
          </MessageWrapper>
        </div>
        <ButtonsWrapper>
          <Button onClick={onClose} kind="primary">
            Done
          </Button>
        </ButtonsWrapper>
      </Modal>
    </>
  );
};
