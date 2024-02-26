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
  justify-content: flex-start;
  align-items: center;
  border-radius: 3px;
  border: 0.5px solid #cdcaca;
  background: #f5f5f5;
  box-shadow: 1px 1px 2px 0px rgba(228, 227, 226, 0.4);
  padding: 7px;
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

const PriceFilterText = styled(FilterText)`
  padding-right: 80px;
`;

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

export type PriceState = {
  minPrice: number;
  maxPrice: number;
  minPriceDisplay: number;
  maxPriceDisplay: number;
  notApplied: boolean;
};

export type PriceDropDownProps = {
  value: PriceState;
  setValue(val: PriceState): void;
  onApply(): void;
};

export const PriceDropDown = (props: PriceDropDownProps) => {
  const [isActive, setIsActive] = useState(false);
  const [minPriceOpen, setMinPriceOpen] = useState(false);
  const [maxPriceOpen, setMaxPriceOpen] = useState(false);

  const priceOptions: number[] = [0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000];

  const minPriceText =
    props.value.minPriceDisplay === -1 ? "No Min" : `$${priceOptions[props.value.minPriceDisplay]}`;

  const maxPriceText =
    props.value.maxPriceDisplay === -1 ? "No Max" : `$${priceOptions[props.value.maxPriceDisplay]}`;

  let dropdownText = "Price";
  if (!props.value.notApplied) {
    if (props.value.minPriceDisplay !== -1 || props.value.maxPriceDisplay !== -1) {
      dropdownText = `${minPriceText} - ${maxPriceText}`;
    }
  }

  return (
    <FilterSubContainer>
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
                <PlaceholderText active={props.value.minPriceDisplay !== -1}>
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
                        props.setValue({ ...props.value, minPriceDisplay: idx });
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
                <PlaceholderText active={props.value.maxPriceDisplay !== -1}>
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
                        props.setValue({ ...props.value, maxPriceDisplay: idx });
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
                minPrice: priceOptions[props.value.minPriceDisplay],
                maxPrice: priceOptions[props.value.maxPriceDisplay],
                notApplied: false,
              });
              props.onApply();
            }}
          >
            Apply
          </ApplyButton>
        </DropDownPopup>
      )}
    </FilterSubContainer>
  );
};
