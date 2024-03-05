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
        src="/LogoTransparent.png"
        alt="Logo"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </LogoPosition>
  );
};
