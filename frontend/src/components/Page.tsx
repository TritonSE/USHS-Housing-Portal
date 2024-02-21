import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: #fbf7f3;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: auto;
`;

const Content = styled.main``;

export type PageProps = {
  children: React.ReactNode;
};

export const Page = ({ children }: PageProps) => {
  return (
    <PageContainer>
      <ContentWrapper>
        <Content>{children}</Content>
      </ContentWrapper>
    </PageContainer>
  );
};
