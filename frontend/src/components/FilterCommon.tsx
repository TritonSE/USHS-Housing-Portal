import styled, { css } from "styled-components";

export const DropDownPopup = styled.div`
  position: absolute;
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px;
  background-color: #fff;
  border: 0.5px solid #ec8537;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(188, 186, 183, 0.4);
  gap: 12px;
`;

export const DropdownIcon = styled.img`
  height: 20px;
  width: 20px;
`;

export const FilterSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Dropdown = styled.button<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  border-radius: 5px;
  ${(props) =>
    props.active
      ? css`
          border: 0.5px solid #ec8537;
        `
      : css`
          border: 0.5px solid #cdcaca;
        `}
  background-color: #fff;
  box-shadow: 1px 1px 2px 0px rgba(188, 186, 183, 0.4);
  width: 100%;
`;

export const FilterText = styled.p`
  color: #000;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
`;

export const DropdownRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-center;
  width: 100%;
`;

export const Sort = styled.button<{ active?: boolean }>`
  font-family: Montserrat;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  background-color: transparent;
  border-color: transparent;

  ${(props) =>
    props.active
      ? css`
          color: #ec8537;
        `
      : css`
          color: #111010;
        `}
`;

export const PopupHeaderText = styled(Sort)`
  margin: 0;
  font-weight: 700;
  font-size: 14px;
`;

export const FilterRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const ApplyButton = styled.button`
  border-radius: 5px;
  background: #b64201;
  border: 0;
  padding-left: 55px;
  padding-right: 55px;
  padding-top: 8px;
  padding-bottom: 8px;
  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 300;
  min-width: 100%;

  cursor: pointer;
  transition-duration: 300ms;
  &:hover {
    background-color: #ec8537;
    border-color: #ec8537;
  }
`;
