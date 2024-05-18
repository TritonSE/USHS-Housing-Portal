import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Button } from "./Button";
import { UserDropdown } from "./UserDropdown";

import { createReferral, createReferralRequest } from "@/api/referrals";
import {
  RenterCandidate,
  createRenterCandidate,
  createRenterCandidateRequest,
  getRenterCandidates,
} from "@/api/renter-candidates";

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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
  letter-spacing: 0.32px;
  padding-top: 100px;
`;

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 80px;
  align-items: center;
`;

const Or = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 30px */
  letter-spacing: 0.4px;
`;

const Header = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
  letter-spacing: 0.32px;
  position: relative;
  right: 195px;
  padding-top: 50px;
  padding-bottom: 15px;
`;

const FormWrapper = styled.form`
  width: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: wrap;
  column-gap: 100px;
  row-gap: 10px;
`;

const InputSection = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: Montserrat;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: 0.32px;
`;

const InputBox = styled.input`
  display: flex;
  padding: 6px 12px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid var(--Neutral-Gray2, #d8d8d8);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: 0.32px;
  color: var(--Neutral-Gray6, #484848);
`;

const ButtonsWrapper = styled.div`
  padding-top: 25px;
  display: flex;
  flex-direction: row;
  gap: 400px;
`;

const SubmitButton = styled.input`
  padding: 12px 28px;
  background-color: #b64201;
  color: #ffffff;
  border: 1px solid #b64201;
  border-radius: 14px;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.32px;
  cursor: pointer;
  white-space: nowrap;
  transition-duration: 300ms;
  &:hover {
    background-color: #ec8537;
    border-color: #ec8537;
  }
`;

const Error = styled.div`
  color: red;
  padding-top: 10px;
`;

type PopupProps = {
  active: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export const ClearAllPopup = ({ active, onClose, onSubmit }: PopupProps) => {
  const [popup, setPopup] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm();

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
