import { useEffect, useState } from "react";
import styled from "styled-components";

import { User } from "@/api/users";

const SearchContainer = styled.div`
  width: 367px;
  position: relative;
  z-index: 1;
`;

const SearchBar = styled.div<{ open: boolean }>`
  display: flex;
  width: 367px;
  height: 44px;
  padding: 9px 12px;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  border-radius: 5px;
  border: ${(props) => (props.open ? "1.5px solid black;" : "1.5px solid #cdcaca")};
  box-shadow: 1px 1px 2px 0px rgba(188, 186, 183, 0.4);
  outline: none;
  cursor: text;
  &:hover {
    border: 1.5px solid black;
  }
`;

const SearchText = styled.div<{ state: boolean }>`
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: 0.32px;
  overflow-x: auto;
  overflow-y: hidden;
  color: ${(props) => (props.state ? "black" : "gray")};
`;

const OptionsContainer = styled.div`
  position: absolute;
  top: 49px;
  max-height: 200px;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 5px;
  border: 0.5px solid var(--Card-Outline, #cdcaca);
  box-shadow: 1px 1px 2px 0px rgba(188, 186, 183, 0.4);
  display: flex;
  flex-direction: column;
  background-color: #fbf7f3;
`;
const Option = styled.div`
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: 0.32px;
  cursor: pointer;
  height: 100%;
  padding: 10px;
  &:hover {
    color: #debb01;
  }
`;

const NoResults = styled.div`
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: 0.32px;
  color: gray;
  height: 100%;
  padding: 10px;
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: rgbd(0, 0, 0, 0);
  z-index: -1;
`;

type SelectProps = {
  placeholder: string;
  options: User[];
  onSelect: (value: User) => void;
  onType: (value: string) => void;
  close: boolean;
};

export function Select({ placeholder, options, onSelect, onType, close }: SelectProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [value, setValue] = useState("");
  const [validOptions, setValidOptions] = useState<User[]>(options);
  const [solid, setSolid] = useState(false);
  const [currentSelected, setCurrentSelected] = useState<User>();

  const handleSelect = (selectedValue: User) => {
    setValue(selectedValue.firstName + " " + selectedValue.lastName);
    setCurrentSelected(selectedValue);
    onSelect(selectedValue);
    onType(selectedValue.firstName + " " + selectedValue.lastName);
    setOpenMenu(false);
  };

  //super messy filtering code, feedback welcome :)
  const handleValidOptions = () => {
    const matches = [];
    for (const i of options) {
      const fullName = i.firstName + " " + i.lastName;
      if (fullName.toLowerCase().includes(value.toLowerCase())) {
        matches.push(i);
      }
    }
    matches.sort((a, b) => {
      const fullNameA = a.firstName + " " + a.lastName;
      const fullNameB = b.firstName + " " + b.lastName;
      return (
        fullNameA.toLowerCase().indexOf(value.toLowerCase()) -
        fullNameB.toLowerCase().indexOf(value.toLowerCase())
      );
    });
    setValidOptions(matches);
  };

  useEffect(() => {
    setOpenMenu(false);
    setValue("");
  }, [close]);

  useEffect(() => {
    handleValidOptions();
    onType(value);
    if (
      value.valueOf() === (currentSelected?.firstName + " " + currentSelected?.lastName).valueOf()
    ) {
      setSolid(true);
    } else {
      setSolid(false);
    }
  }, [value, currentSelected]);

  return (
    <SearchContainer>
      <SearchBar
        onClick={() => {
          setOpenMenu(true);
        }}
        open={openMenu}
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === "Backspace") {
            setValue(value.substring(0, value.length - 1));
          } else if (e.key === "Escape") {
            setOpenMenu(false);
          } else if (e.key.length === 1 && !e.ctrlKey) {
            setValue(value + e.key);
          }
        }}
      >
        <SearchText state={solid}>{value === "" ? placeholder : value}</SearchText>
        <img src="SearchSymbol.svg" alt="Search" />
      </SearchBar>
      {openMenu && (
        <OptionsContainer>
          <Overlay
            onClick={() => {
              setOpenMenu(false);
            }}
          />
          {validOptions.length > 0 ? (
            validOptions.map((option, index) => (
              <Option
                key={index}
                onClick={() => {
                  handleSelect(option);
                }}
              >
                {option.firstName + " " + option.lastName}
              </Option>
            ))
          ) : (
            <NoResults>No Results</NoResults>
          )}
        </OptionsContainer>
      )}
    </SearchContainer>
  );
}
