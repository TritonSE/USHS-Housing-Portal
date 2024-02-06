import styled from "styled-components";

export const PrimaryButton = styled.button`
  padding: 12px 32px;
  background-color: #b64201;
  border-radius: 14px;
  color: #ffffff;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.32px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
`;

export const SecondaryButton = styled(PrimaryButton)`
  background-color: #ffffff;
  border: 1px solid #b64201;
  color: #b64201;
`;
