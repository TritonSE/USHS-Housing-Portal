import { useState } from "react";
import styled from "styled-components";

import { Textbox } from "./Textbox";

import { checkFormPassword } from "@/api/units";
import { Button } from "@/components/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 30px;
`;

const Header = styled.div`
  font-family: "Neutraface Text";
  font-size: 48px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const Image = styled.img`
  width: 693px;
`;

type PasswordViewProps = {
  // Function to call when the user enters the correct password
  handleNext: () => void;
};

export function PasswordView({ handleNext: next }: PasswordViewProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>();

  const checkPassword = () => {
    void checkFormPassword(password).then((res) => {
      if (res.success) {
        setError(undefined);
        next();
      } else {
        setError("*Incorrect Password");
      }
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") checkPassword();
  };

  return (
    <Wrapper>
      <Header>USHS Landlord Submission Form</Header>
      <Image src="USHSWideLogo.svg" alt="" />
      <Textbox
        errorMessage={error}
        name="password"
        placeholder="Password"
        type="password"
        fontSize={20}
        value={password}
        handler={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(event.target.value);
        }}
        onKeyDown={handleKeyPress}
      />
      <Button kind="primary" onClick={checkPassword}>
        Enter
      </Button>
    </Wrapper>
  );
}
