import { useEffect, useState } from "react";
import styled from "styled-components";

import { Button } from "./Button";
import { UserDropdown } from "./UserDropdown";

import { RenterCandidate, getRenterCandidates } from "@/api/renter-candidates";

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
  width: 800px;
  height: 550px;
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
  gap: 80px;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
  letter-spacing: 0.32px;
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
  right: 175px;
`;

type PopupProps = {
  active: boolean;
  onClose: () => void;
};

export const ReferralPopup = ({ active, onClose }: PopupProps) => {
  const [popup, setPopup] = useState<boolean>(false);
  const [addRC, setAddRC] = useState<boolean>(false);
  const [allRCs, setAllRCs] = useState<RenterCandidate[]>([]);

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
  }, []);

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
              {addRC ? (
                <>
                  <Header>Add new renter Candidate:</Header>
                </>
              ) : (
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
              )}
            </Wrapper>
          </Modal>
        </>
      )}
    </>
  );
};
