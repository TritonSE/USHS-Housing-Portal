import { useEffect, useState } from "react";
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

export type PriceDropDownProps = {
  onApply(minPrice: number, maxPrice: number): void;
  registerResetCallback(callback: () => void): void;
};

export const PriceDropDown = (props: PriceDropDownProps) => {
  const [isActive, setIsActive] = useState(false);
  const [minPriceOpen, setMinPriceOpen] = useState(false);
  const [maxPriceOpen, setMaxPriceOpen] = useState(false);
  const [minPriceSelected, setMinPriceSelected] = useState(-1);
  const [maxPriceSelected, setMaxPriceSelected] = useState(-1);
  const [dropdownText, setDropdownText] = useState("Price");

  const priceOptions: number[] = [0, 50, 100, 150, 200];

  const minPriceText = minPriceSelected === -1 ? "No Min" : `$${priceOptions[minPriceSelected]}k`;

  const maxPriceText = maxPriceSelected === -1 ? "No Max" : `$${priceOptions[maxPriceSelected]}k`;

  const resetFilter = () => {
    setMinPriceSelected(-1);
    setMaxPriceSelected(-1);
    setDropdownText("Price");
  };

  const updateDropdownText = () => {
    if (minPriceSelected !== -1 || maxPriceSelected !== -1) {
      setDropdownText(`${minPriceText} - ${maxPriceText}`);
    }
  };

  useEffect(() => {
    props.registerResetCallback(resetFilter);
  }, []);

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
          <MinMaxRow
            onClick={() => {
              setMinPriceOpen(!minPriceOpen);
            }}
          >
            <PriceSubcontainer>
              <MinMaxBox
                onClick={() => {
                  setMinPriceOpen(!minPriceOpen);
                }}
              >
                <PlaceholderText active={minPriceSelected !== -1}>{minPriceText}</PlaceholderText>
                <ArrowIcon src={minPriceOpen ? "/price_up_arrow.svg" : "/down_arrow.svg"} />
              </MinMaxBox>
              {minPriceOpen && (
                <MinMaxPopup>
                  {priceOptions.map((text, idx) => (
                    <MinMaxPopupButton
                      key={idx}
                      onClick={() => {
                        setMinPriceSelected(idx);
                        setMinPriceOpen(false);
                      }}
                    >
                      {`$${text}k`}
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
                <PlaceholderText active={maxPriceSelected !== -1}>{maxPriceText}</PlaceholderText>
                <ArrowIcon src={maxPriceOpen ? "/price_up_arrow.svg" : "/down_arrow.svg"} />
              </MinMaxBox>
              {maxPriceOpen && (
                <MinMaxPopup>
                  {priceOptions.map((text, idx) => (
                    <MinMaxPopupButton
                      key={idx}
                      onClick={() => {
                        setMaxPriceSelected(idx);
                        setMaxPriceOpen(false);
                      }}
                    >
                      {`$${text}k`}
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
              if (minPriceSelected < maxPriceSelected) {
                updateDropdownText();
                props.onApply(minPriceSelected, maxPriceSelected);
              } else {
                setDropdownText("Price");
                setMinPriceSelected(-1);
                setMaxPriceSelected(-1);
              }
            }}
          >
            Apply
          </ApplyButton>
        </DropDownPopup>
      )}
    </FilterSubContainer>
  );
};
