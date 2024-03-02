import styled from "styled-components";

export const Button = styled.button<{ kind: "primary" | "secondary" }>`
  padding: 12px 28px;
  background-color: ${(props) => (props.kind === "primary" ? "#b64201" : "#ffffff")};
  color: ${(props) => (props.kind === "primary" ? "#ffffff" : "#b64201")};
  border: 1px solid #b64201;
  border-radius: 14px;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.32px;
  cursor: pointer;
  white-space: nowrap;
  transition-duration: 300ms;
  &:hover {
    background-color: ${(props) =>
      props.kind === "primary" ? "#EC8537" : "rgba(236, 133, 55, 0.20)"};
    border-color: ${(props) => (props.kind === "primary" ? "#EC8537" : "#b64201")};
  }
`;
