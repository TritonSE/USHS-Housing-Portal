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
  max-height: 160px;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 5px;
  border: 0.5px solid #cdcaca;
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
  onSelect?: (value: User | undefined) => void; //callback function for parent
  onType?: (value: string) => void; //callback function for parent
  reset?: boolean;
};

export function Select({ placeholder, options, onSelect, onType, reset }: SelectProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [searchValue, setSearchValue] = useState(""); //current text value in select input box
  const [validOptions, setValidOptions] = useState<User[]>(options); //all RS filtered through search
  const [solid, setSolid] = useState(false); //search text color
  const [currentSelected, setCurrentSelected] = useState<User>(); //current selected RS

  //handles actions after clicking on a dropdown item
  const handleSelect = (selectedValue: User) => {
    const displayName = selectedValue.firstName + " " + selectedValue.lastName;
    setSearchValue(displayName);
    setCurrentSelected(selectedValue);
    setOpenMenu(false);
  };

  //filters dropdown options (super messy, feedback welcome :D)
  const handleValidOptions = () => {
    const matches = [];
    for (const i of options) {
      const fullName = i.firstName + " " + i.lastName;
      if (fullName.toLowerCase().includes(searchValue.toLowerCase())) {
        matches.push(i);
      }
    }
    matches.sort((a, b) => {
      const fullNameA = a.firstName + " " + a.lastName;
      const fullNameB = b.firstName + " " + b.lastName;
      return (
        fullNameA.toLowerCase().indexOf(searchValue.toLowerCase()) -
        fullNameB.toLowerCase().indexOf(searchValue.toLowerCase())
      );
    });
    setValidOptions(matches);
  };

  //Reset search bar after action from parent component
  useEffect(() => {
    setOpenMenu(false);
    setSearchValue("");
    setCurrentSelected(undefined);
  }, [reset]);

  //triggers everytime text in input box changes; ensures options are filtered + callbacks + text color
  useEffect(() => {
    handleValidOptions();
    if (onType) onType(searchValue);
    if (onSelect) onSelect(currentSelected);

    //search text is black if it matches the selected user; indicates that it's valid for assignment
    if (searchValue === currentSelected?.firstName + " " + currentSelected?.lastName) {
      setSolid(true);
    } else {
      setSolid(false);
    }
  }, [searchValue, currentSelected]);

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
            setSearchValue(searchValue.substring(0, searchValue.length - 1));
          } else if (e.key === "Escape") {
            setOpenMenu(false);
          } else if (e.key.length === 1 && !e.ctrlKey) {
            setSearchValue(searchValue + e.key);
          }
        }}
      >
        <SearchText state={solid}>{searchValue === "" ? placeholder : searchValue}</SearchText>
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
