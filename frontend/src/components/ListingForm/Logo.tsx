import styled from "styled-components";

const LogoPosition = styled.div`
  position: absolute;
  top: 45px;
  left: 52px;
  width: 9%;
  flexshrink: 0;
`;

export const Logo = () => {
  return (
    <LogoPosition>
      <img
        src="/USHSLogo.svg"
        alt="Logo"
        style={{
          width: "80%",
          height: "80%",
        }}
      />
    </LogoPosition>
  );
};
