import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

import { User, elevateUser } from "@/api/users";
import { Page } from "@/components";
import { Button } from "@/components/Button";
import { NavBar } from "@/components/NavBar";
import { Select } from "@/components/Select";
import { AuthContext } from "@/contexts/AuthContext";
import { DataContext } from "@/contexts/DataContext";

const Items = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20vh 0px 0px 0px;
  max-height: 100vh;
  gap: 100px;
  // background-color: red;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 100px;
  width: 100%;
  // background-color: red;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 25px;
  font-size: 23px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: 0.4px;
`;

const ProfilePicture = styled.img`
  width: 182px;
  height: 182px;
  flex-shrink: 0;
  border-radius: 100px;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const AssignWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  max-width: 100%;
`;

const AssignHeader = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: 0.4px;
`;

const SearchRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 80px;
`;

const AssignButton = styled(Button)`
  border-radius: 12px;
  z-index: 1;
`;

const ElevatePopup = styled.div`
  display: flex;
  flex-direction: row;
  max-width:;
  height: 40px;
  gap: 10px;
  padding: 8px 12px 8px 20px;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background: rgba(23, 235, 160, 0.24);
`;

const PopupWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  font-size: 13.5px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
`;

const XButton = styled.div`
  &:hover {
    cursor: pointer;
  }
  font-size: 30px;
`;

export function Profile() {
  const [popup, setPopup] = useState<boolean>(false);
  const [allReferringStaff, setAllReferringStaff] = useState<User[]>([]);
  const [currentRS, setCurrentRS] = useState<User>();
  const [assignedRS, setAssignedRS] = useState<User>();
  const [currentText, setCurrentText] = useState<string>();
  const [close, setClose] = useState<boolean>(false);

  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);

  const togglePopup = () => {
    setPopup(!popup);
  };

  const handleAssign = () => {
    if (
      currentRS === undefined ||
      currentText?.valueOf() !== (currentRS.firstName + " " + currentRS.lastName).valueOf()
    ) {
      return;
    }
    elevateUser(currentRS)
      .then((value) => {
        if (value.success) {
          setClose(!close);
          setPopup(true);
          setAssignedRS(currentRS);

          const idx = allReferringStaff.map((e) => e.email).indexOf(currentRS.email);
          allReferringStaff.splice(idx, 1);
          setCurrentRS(undefined);
        } else {
          console.log(value.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setAllReferringStaff(dataContext.allReferringStaff);
  }, [dataContext.allReferringStaff]);

  return (
    <Page>
      <Helmet>
        <title>Profile | USHS Housing Portal</title>
      </Helmet>
      <NavBar page="Profile" />
      <Items>
        <ProfileWrapper>
          <ProfilePicture src={authContext.currentUser?.photoURL ?? ""} alt="Profile Img" />
          <InfoWrapper>
            <div>{authContext.currentUser?.displayName}</div>
            <div>{authContext.currentUser?.email}</div>
          </InfoWrapper>
        </ProfileWrapper>
        {dataContext.currentUser?.isHousingLocator && (
          <CenterDiv>
            <AssignWrapper>
              <AssignHeader>Assign Housing Locators:</AssignHeader>
              <SearchRow>
                <Select
                  placeholder="Search People"
                  options={allReferringStaff}
                  onSelect={(value) => {
                    setCurrentRS(value);
                  }}
                  onType={(value) => {
                    setCurrentText(value);
                  }}
                  close={close}
                />
                <AssignButton kind="primary" onClick={handleAssign}>
                  Assign
                </AssignButton>
              </SearchRow>
              {popup && assignedRS !== undefined && (
                <ElevatePopup>
                  <PopupWrapper>
                    <img src="CheckSymbol.svg" alt="Check" />
                    <div>
                      {`${assignedRS?.firstName} ${assignedRS?.lastName} succesfully assigned as a Housing Locator`}
                    </div>
                  </PopupWrapper>
                  <XButton onClick={togglePopup}>&times;</XButton>
                </ElevatePopup>
              )}
            </AssignWrapper>
          </CenterDiv>
        )}
      </Items>
    </Page>
  );
}
