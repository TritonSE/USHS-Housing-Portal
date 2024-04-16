import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div<{ width?: number; height?: number }>`
  border-radius: 50%;
  width: ${({ width }) => width ?? 50}px;
  height: ${({ height }) => height ?? 50}px;
  border: 8px solid #d8d8d8;
  border-top: 8px solid ${({ theme }) => theme.colors.primary};
  animation: ${spin} 700ms linear infinite;
`;
