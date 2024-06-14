import styled from "styled-components";

import { Button } from "@/components/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 48px;
`;

const Header = styled.div`
  font-family: "Neutraface Text";
  font-size: 48px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  width: 55vw;
  line-height: 150%;
  text-align: center;
`;

const Message = styled.div`
  font-size: 20px;
  font-style: italic;
  font-weight: 400;
`;

const Image = styled.img`
  width: 549px;
`;

type DoneViewProps = {
  // Function to call when the user wants to submit another listing
  handleResubmit: () => void;
};

export function DoneView({ handleResubmit }: DoneViewProps) {
  return (
    <Wrapper>
      <Image src="USHSWideLogo.svg" alt="" />
      <Header>Thank you for submitting your listing to Union Station Homeless Services</Header>
      <Button kind="primary" onClick={handleResubmit}>
        Submit another listing
      </Button>
      <Message>If you have no other listings to add, you may close this tab.</Message>
    </Wrapper>
  );
}
