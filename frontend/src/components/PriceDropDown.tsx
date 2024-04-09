import { useState } from "react";
import styled, { css } from "styled-components";

import {
  ApplyButton,
  DropDownPopup,
  Dropdown,
  DropdownIcon,
  DropdownRow,
  FilterSubContainer,
  FilterText,
  PopupHeaderText,
} from "@/components/FilterCommon";

const MinMaxDash = styled.img`
  width: 10px;
  height: 10px;
  margin-left: 5px;
  margin-right: 5px;
`;

const ArrowIcon = styled.img`
  height: 12px;
  width: 12px;
`;

const MinMaxBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
  border: 0.5px solid #cdcaca;
  background: #f5f5f5;
  box-shadow: 1px 1px 2px 0px rgba(228, 227, 226, 0.4);
  padding: 7px;
  width: 85px;
`;

const MinMaxRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
`;

const MinMaxPopup = styled.div`
  position: absolute;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-height: 85px;
  overflow: scroll;
  background-color: #fff;
  border: 0.5px solid #cdcaca;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 0px rgba(228, 227, 226, 0.4);
`;

const MinMaxPopupButton = styled.button`
  color: #000;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 500;
  border: 0;
  background-color: transparent;
  padding: 12px;
  min-width: 100%;

  &:hover {
    background: rgba(236, 133, 55, 0.2);
  }
`;

const PriceSubcontainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const PriceFilterText = styled(FilterText)``;

const PlaceholderText = styled.p<{ active: boolean }>`
  color: #cdcaca;
  font-family: Montserrat;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  padding-right: 5px;

  ${(props) =>
    props.active
      ? css`
          color: #000;
          padding-left: 11px;
          padding-right: 11px;
        `
      : css`
          color: #cdcaca;
        `}
`;

const PriceFilterSubContainer = styled(FilterSubContainer)`
  width: 231px;
`;

export type PriceState = {
  minPrice: number;
  maxPrice: number;
};

export type PriceDisplayState = {
  minPriceDisplay: number;
  maxPriceDisplay: number;
  notApplied: boolean;
};

export type PriceDropDownProps = {
  value: PriceState;
  setValue(val: PriceState): void;
  displayValue: PriceDisplayState;
  setDisplayValue(val: PriceDisplayState): void;
};

export const PriceDropDown = (props: PriceDropDownProps) => {
  const [isActive, setIsActive] = useState(false);
  const [minPriceOpen, setMinPriceOpen] = useState(false);
  const [maxPriceOpen, setMaxPriceOpen] = useState(false);

  const priceOptions: number[] = [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000];

  const minPriceText =
    props.displayValue.minPriceDisplay === -1 ? "No Min" : `$${props.displayValue.minPriceDisplay}`;

  const maxPriceText =
    props.displayValue.maxPriceDisplay === -1 ? "No Max" : `$${props.displayValue.maxPriceDisplay}`;

  let dropdownText = "Price";
  if (!props.displayValue.notApplied) {
    if (props.displayValue.minPriceDisplay !== -1 || props.displayValue.maxPriceDisplay !== -1) {
      dropdownText = `${minPriceText} - ${maxPriceText}`;
    }
  }

  return (
    <PriceFilterSubContainer>
      <Dropdown
        active={isActive}
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        <DropdownRow>
          <PriceFilterText>{dropdownText}</PriceFilterText>
          <DropdownIcon src={isActive ? "/up_arrow.svg" : "/dropdown.svg"} />
        </DropdownRow>
      </Dropdown>
      {isActive && (
        <DropDownPopup>
          <PopupHeaderText>Price</PopupHeaderText>
          <MinMaxRow>
            <PriceSubcontainer>
              <MinMaxBox
                onClick={() => {
                  setMinPriceOpen(!minPriceOpen);
                }}
              >
                <PlaceholderText active={props.displayValue.minPriceDisplay !== -1}>
                  {minPriceText}
                </PlaceholderText>
                <ArrowIcon src={minPriceOpen ? "/price_up_arrow.svg" : "/down_arrow.svg"} />
              </MinMaxBox>
              {minPriceOpen && (
                <MinMaxPopup>
                  {priceOptions.map((text, idx) => (
                    <MinMaxPopupButton
                      key={idx}
                      onClick={() => {
                        props.setDisplayValue({ ...props.displayValue, minPriceDisplay: text });
                        setMinPriceOpen(false);
                      }}
                    >
                      {`$${text}`}
                    </MinMaxPopupButton>
                  ))}
                </MinMaxPopup>
              )}
            </PriceSubcontainer>
            <MinMaxDash src="/min_max_dash.svg" />
            <PriceSubcontainer>
              <MinMaxBox
                onClick={() => {
                  setMaxPriceOpen(!maxPriceOpen);
                }}
              >
                <PlaceholderText active={props.displayValue.maxPriceDisplay !== -1}>
                  {maxPriceText}
                </PlaceholderText>
                <ArrowIcon src={maxPriceOpen ? "/price_up_arrow.svg" : "/down_arrow.svg"} />
              </MinMaxBox>
              {maxPriceOpen && (
                <MinMaxPopup>
                  {priceOptions.map((text, idx) => (
                    <MinMaxPopupButton
                      key={idx}
                      onClick={() => {
                        props.setDisplayValue({ ...props.displayValue, maxPriceDisplay: text });
                        setMaxPriceOpen(false);
                      }}
                    >
                      {`$${text}`}
                    </MinMaxPopupButton>
                  ))}
                </MinMaxPopup>
              )}
            </PriceSubcontainer>
          </MinMaxRow>
          <ApplyButton
            onClick={() => {
              setIsActive(false);
              setMinPriceOpen(false);
              setMaxPriceOpen(false);
              props.setValue({
                ...props.value,
                minPrice: props.displayValue.minPriceDisplay,
                maxPrice: props.displayValue.maxPriceDisplay,
              });
              props.setDisplayValue({
                ...props.displayValue,
                notApplied: false,
              });
            }}
          >
            Apply
          </ApplyButton>
        </DropDownPopup>
      )}
    </PriceFilterSubContainer>
  );
};
