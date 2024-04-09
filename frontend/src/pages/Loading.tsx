import styled from "styled-components";

import { Page } from "@/components";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export function Loading() {
  return (
    <Page>
      <Container>
        <LoadingSpinner width={120} height={120} />
      </Container>
    </Page>
  );
}
