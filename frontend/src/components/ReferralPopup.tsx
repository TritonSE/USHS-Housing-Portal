import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import styled from "styled-components";

import { Button } from "./Button";
import { UserDropdown } from "./UserDropdown";

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
  padding-top: 60px;
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
  padding-top: 30px;
  display: flex;
  flex-direction: row;
  gap: 400px;
`;

export const SubmitButton = styled.input`
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

type PopupProps = {
  active: boolean;
  onClose: () => void;
};

export const ReferralPopup = ({ active, onClose }: PopupProps) => {
  const [popup, setPopup] = useState<boolean>(false);
  const [addRC, setAddRC] = useState<boolean>(false);
  const [allRCs, setAllRCs] = useState<RenterCandidate[]>([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    setPopup(active);
  }, [active]);

  useEffect(() => {
    getRenterCandidates()
      .then((value) => {
        if (value.success) {
          setAllRCs(value.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [popup]);

  const handleCreateRC = (data: FieldValues) => {
    if (data.email === "") delete data.email;
    if (data.phone === "") delete data.phone;
    createRenterCandidate(data as createRenterCandidateRequest)
      .then((value) => {
        if (value.success) {
          const id = value.data._id;
          console.log(id);
          reset();
          onClose();
          setAddRC(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                  setAddRC(false);
                }}
              >
                &times;
              </XButton>
            </XWrapper>
            <Wrapper>
              <h1>Add Referral</h1>
              {!addRC ? (
                <ContentWrapper>
                  <div>Choose existing renter candidate:</div>
                  <DropdownWrapper>
                    <UserDropdown
                      placeholder={"Choose from dropdown"}
                      options={allRCs}
                      isRCDropdown={true}
                    ></UserDropdown>
                    <Button kind="secondary">Apply</Button>
                  </DropdownWrapper>
                  <Or>or</Or>
                  <div>Add new renter candidate</div>
                  <Button
                    onClick={() => {
                      setAddRC(true);
                    }}
                    kind="secondary"
                  >
                    Add new candidate
                  </Button>
                </ContentWrapper>
              ) : (
                <>
                  <Header>Add new renter candidate:</Header>
                  <FormWrapper onSubmit={(event) => void handleSubmit(handleCreateRC)(event)}>
                    <InputSection>
                      <div>First Name *</div>
                      <InputBox {...register("firstName", { required: true })} />
                    </InputSection>
                    <InputSection>
                      <div>Last Name *</div>
                      <InputBox {...register("lastName", { required: true })} />
                    </InputSection>
                    <InputSection>
                      <div>Phone number</div>
                      <InputBox
                        placeholder="(xxx) xxx-xxxx"
                        {...register("phone", { required: false })}
                      />
                    </InputSection>
                    <InputSection>
                      <div>Email</div>
                      <InputBox {...register("email", { required: false })} />
                    </InputSection>
                    <InputSection>
                      <div>Unique Identifier *</div>
                      <InputBox {...register("uid", { required: true })} />
                    </InputSection>
                    <InputSection>
                      <div>Housing Program *</div>
                      <InputBox {...register("program", { required: true })} />
                    </InputSection>
                    <InputSection>
                      <div>Number of adults (include self) *</div>
                      <InputBox placeholder="Ex: 3" {...register("adults", { required: true })} />
                    </InputSection>
                    <InputSection>
                      <div>Number of children *</div>
                      <InputBox placeholder="Ex: 3" {...register("children", { required: true })} />
                    </InputSection>
                    <ButtonsWrapper>
                      <Button
                        onClick={() => {
                          setAddRC(false);
                        }}
                        kind="secondary"
                      >
                        Back
                      </Button>
                      <SubmitButton type="submit" value="Add Referral"></SubmitButton>
                    </ButtonsWrapper>
                  </FormWrapper>
                </>
              )}
            </Wrapper>
          </Modal>
        </>
      )}
    </>
  );
};
