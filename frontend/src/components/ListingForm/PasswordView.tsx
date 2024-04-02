import { useState } from "react";
import styled from "styled-components";

import { Textbox } from "./Textbox";

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
  const correct = "password";

  const checkPassword = () => {
    if (password === correct) {
      setError(undefined);
      next();
    } else {
      setError("*Incorrect Password");
    }
  };

  return (
    <Wrapper>
      <Header>USHS Landlord Submissions Form</Header>
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
      />
      <Button kind="primary" onClick={checkPassword}>
        Enter
      </Button>
    </Wrapper>
  );
}
