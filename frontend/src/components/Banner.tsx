import React, { useState } from "react";
import styled from "styled-components";

const ElevatePopup = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
  padding: 8px 12px 8px 20px;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background: ${(props) => props.color};
`;

const PopupWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  font-size: 13.5px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.32px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TitleText = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  font-style: bold;
  letter-spacing: 0.4px;
`;

const XButton = styled.div`
  &:hover {
    cursor: pointer;
  }
  font-size: 30px;
  position: absolute;
  top: 5%;
  right: 1%;
`;

export type BannerProps = {
  visible: boolean;
  image: string;
  withTitle: boolean;
  title: string;
  message: string;
  withX: boolean;
  color: string;
};

export const Banner = (props: BannerProps) => {
  const [popup, setPopup] = useState<boolean>(props.visible);

  React.useEffect(() => {
    setPopup(props.visible);
  }, [props.visible]);

  if (popup)
    return (
      <ElevatePopup color={props.color}>
        <PopupWrapper>
          <img src={props.image} alt="Check" />
          <TextWrapper>
            {props.withTitle && <TitleText>{props.title}</TitleText>}
            {props.message}
          </TextWrapper>
        </PopupWrapper>
        {props.withX && (
          <XButton
            onClick={() => {
              setPopup(false);
            }}
          >
            &times;
          </XButton>
        )}
      </ElevatePopup>
    );

  return null;
};
