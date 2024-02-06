import { signOut } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";

import { PrimaryButton, SecondaryButton } from "@/components/Button";
import { auth } from "@/firebase";

const NavbarItems = styled.div`
  background-color: #ffffff;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0px 8px 34px 0px rgba(217, 217, 217, 0.4);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  width: 100vw;
  padding: 10px 96px;
`;

const Icon = styled.img`
  width: 62px;
  height: 52px;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.4px;
  line-height: 150%;
  gap: 34px;
  height: 47px;
`;

const LogoutButton = styled(PrimaryButton)`
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 16px;
`;

const ConfirmLogout = styled(LogoutButton)`
  width: 355px;
  height: 45px;
  border-radius: 12px;
`;

const CancelLogout = styled(SecondaryButton)`
  width: 355px;
  height: 45px;
  border-radius: 12px;
`;

const Link = styled.a`
  text-decoration: none;
  color: black;
`;

const Highlighted = styled(Link)`
  color: #b64201;
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
  gap: 70px;
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

type NavBarProps = {
  page: "Home" | "Profile";
};

export function NavBar({ page }: NavBarProps) {
  const [popup, setPopup] = useState(false);

  const togglePopup = () => {
    setPopup(!popup);
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out successfully.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <NavbarItems>
        <LeftWrapper>
          <Icon src="USHSLogo2.png" />
          {page === "Home" ? (
            <>
              <Highlighted href="/">Home</Highlighted>
              <Link href="/profile">Profile</Link>
            </>
          ) : (
            <>
              <Link href="/">Home</Link>
              <Highlighted href="profile">Profile</Highlighted>
            </>
          )}
        </LeftWrapper>
        <LogoutButton onClick={togglePopup}>Log Out</LogoutButton>
      </NavbarItems>

      {popup && (
        <>
          <Overlay />
          <Modal>
            <XWrapper>
              <XButton onClick={togglePopup}> &times; </XButton>
            </XWrapper>
            <h1>Log out?</h1>
            <ButtonsWrapper>
              <ConfirmLogout onClick={logOut}>Log out</ConfirmLogout>
              <CancelLogout onClick={togglePopup}>Cancel</CancelLogout>
            </ButtonsWrapper>
          </Modal>
        </>
      )}
    </div>
  );
}
