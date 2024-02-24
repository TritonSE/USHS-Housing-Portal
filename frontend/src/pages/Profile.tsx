import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

import { User, elevateUser } from "@/api/users";
import { Page } from "@/components";
import { Button } from "@/components/Button";
import { NavBar } from "@/components/NavBar";
import { UserDropdown } from "@/components/UserDropdown";
import { AuthContext } from "@/contexts/AuthContext";
import { DataContext } from "@/contexts/DataContext";

const Items = styled.div<{ IsHL: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.IsHL ? "8vh" : "30vh")} 0px 0px 0px;
  max-height: 100vh;
  gap: 7vh;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 100px;
  width: 100%;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Name = styled.div`
  font-size: 28px;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: 0.64px;
`;

const Email = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: 0.4px;
`;

const ProfilePicture = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 100px;
`;

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-left: 20vw;
`;

const AssignHeader = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: 0.4px;
`;

const AssignWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 100%;
`;

const HLWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-flow: wrap;
  row-gap: 12px;
`;

const HLDiv = styled.div`
  width: 27vw;
  font-size: 16px;
`;

const SearchRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 80px;
`;

const AssignButton = styled(Button)`
  border-radius: 12px;
  padding: 12px 24px;
  z-index: 1;
`;

const ElevatePopup = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 600px;
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
  const [allHousingLocators, setAllHousingLocators] = useState<User[]>([]);
  const [currentRS, setCurrentRS] = useState<User>(); //tracks current RS selected (for assignment)
  const [assignedRS, setAssignedRS] = useState<User>(); //tracks last RS elevated (for popup)
  const [resetSelect, setResetSelect] = useState<boolean>(false); //resets select component when state changes

  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);

  const handleAssign = () => {
    //only lets assignment happen if current text in search box matches the currently selected RS
    if (currentRS !== undefined) {
      elevateUser(currentRS)
        .then((value) => {
          if (value.success) {
            //reset select component
            setResetSelect(!resetSelect);
            setPopup(true);
            setAssignedRS(currentRS);

            dataContext.refetchData();
            setCurrentRS(undefined);
          } else {
            console.log(value.error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setAllReferringStaff(dataContext.allReferringStaff);
    setAllHousingLocators(dataContext.allHousingLocators);
  }, [dataContext.allReferringStaff, dataContext.allHousingLocators]);

  return (
    <Page>
      <Helmet>
        <title>Profile | USHS Housing Portal</title>
      </Helmet>
      <NavBar page="Profile" />
      <Items IsHL={dataContext.currentUser?.isHousingLocator ?? false}>
        <ProfileWrapper>
          <ProfilePicture src={authContext.currentUser?.photoURL ?? ""} alt="Profile Img" />
          <InfoWrapper>
            <Name>{authContext.currentUser?.displayName}</Name>
            <Email>{authContext.currentUser?.email}</Email>
          </InfoWrapper>
        </ProfileWrapper>

        {dataContext.currentUser?.isHousingLocator && (
          <CenterDiv>
            <AssignWrapper>
              <AssignHeader>Current Housing Locators:</AssignHeader>
              <HLWrapper>
                {allHousingLocators.map((HS, index) => (
                  <HLDiv key={index}>{HS.firstName + " " + HS.lastName}</HLDiv>
                ))}
              </HLWrapper>
            </AssignWrapper>
            <AssignWrapper>
              <AssignHeader>Assign Housing Locators:</AssignHeader>
              <SearchRow>
                <UserDropdown
                  placeholder="Search People"
                  options={allReferringStaff}
                  onSelect={(value) => {
                    setCurrentRS(value);
                  }}
                  reset={resetSelect}
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
                  <XButton
                    onClick={() => {
                      setPopup(false);
                    }}
                  >
                    &times;
                  </XButton>
                </ElevatePopup>
              )}
            </AssignWrapper>
          </CenterDiv>
        )}
      </Items>
    </Page>
  );
}
