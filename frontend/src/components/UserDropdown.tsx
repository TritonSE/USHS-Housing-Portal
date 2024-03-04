import { useEffect, useState } from "react";
import styled from "styled-components";

import { RenterCandidate } from "@/api/renter-candidates";
import { User } from "@/api/users";

const SearchContainer = styled.div<{ isRCDropdown: boolean }>`
  position: relative;
  z-index: 1;
`;

const Icon = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const SearchBar = styled.input<{ open: boolean; state: boolean; isRCDropdown: boolean }>`
  width: ${(props) => (props.isRCDropdown ? "300px" : "367px")};
  height: 44px;
  padding: 9px 40px 9px 12px;
  align-items: center;
  border-radius: 5px;
  border: ${(props) => (props.open ? "1.5px solid black;" : "1.5px solid #cdcaca")};
  box-shadow: 1px 1px 2px 0px rgba(188, 186, 183, 0.4);
  outline: none;
  font-size: 16px;
  font-weight: ${(props) => (props.state ? "475" : "400")};
  letter-spacing: 0.32px;
  color: ${(props) => (props.state ? "black" : "gray")};
  &:hover {
    border: 1.5px solid black;
  }
`;

const OptionsContainer = styled.div<{ isRCDropdown: boolean }>`
  position: absolute;
  top: 47px;
  max-height: 160px;
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  border-radius: 5px;
  border: 0.5px solid #cdcaca;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.isRCDropdown ? "#FFF" : "#fbf7f3")};
`;
const Option = styled.div`
  font-size: 15px;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 0.32px;
  cursor: pointer;
  height: 100%;
  padding: 8px;
  &:hover {
    background-color: #f3f3f3;
    // color: #b64201;
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

type Option = User | RenterCandidate;

type SelectProps = {
  placeholder: string;
  options: Option[];
  onSelect?: (value: Option | undefined) => void; //callback function for parent, sends current selected user
  reset?: boolean;
  isRCDropdown?: boolean;
};

export function UserDropdown({ placeholder, options, onSelect, reset, isRCDropdown }: SelectProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [searchValue, setSearchValue] = useState(""); //current text value in select input box
  const [validOptions, setValidOptions] = useState<Option[]>(options); //all RS filtered through search
  const [solid, setSolid] = useState(false); //search text color
  const [currentSelected, setCurrentSelected] = useState<Option>(); //current selected RS

  const handleSelect = (selectedValue: Option) => {
    setSearchValue(selectedValue.firstName + " " + selectedValue.lastName);
    setCurrentSelected(selectedValue);
    setOpenMenu(false);
  };

  //filters dropdown options (super messy, feedback welcome :D)
  const handleValidOptions = () => {
    const matches = options.filter((user: Option) =>
      (user.firstName + " " + user.lastName).toLowerCase().includes(searchValue.toLowerCase()),
    );

    //sort alphabetically if no search value
    if (searchValue === "") {
      matches.sort((a, b) => {
        const fullNameA = a.firstName + " " + a.lastName;
        const fullNameB = b.firstName + " " + b.lastName;
        return fullNameA < fullNameB ? -1 : 1;
      });
      //sort by 'best' match
    } else {
      matches.sort((a, b) => {
        const fullNameA = a.firstName + " " + a.lastName;
        const fullNameB = b.firstName + " " + b.lastName;
        return (
          fullNameA.toLowerCase().indexOf(searchValue.toLowerCase()) -
          fullNameB.toLowerCase().indexOf(searchValue.toLowerCase())
        );
      });
    }
    setValidOptions(matches);
  };

  //Reset search bar after action from parent component
  useEffect(() => {
    setOpenMenu(false);
    setSearchValue("");
    setCurrentSelected(undefined);
  }, [reset]);

  //triggers everytime text in input box changes; ensures options are filtered
  useEffect(() => {
    handleValidOptions();
  }, [searchValue, currentSelected, options]);

  //separated from the above useeffect so that validOptions are updated in time for these functions
  useEffect(() => {
    //selects user if current text exactly matches a valid user
    const idx = validOptions.map((e) => e.firstName + " " + e.lastName).indexOf(searchValue);
    if (idx !== -1) {
      if (validOptions.length === 1) {
        setCurrentSelected(validOptions[idx]);
        setSolid(true);
      }
      //case for if there's more than one possible match and a certain match is selected from the dropdown
      if (currentSelected?.firstName + " " + currentSelected?.lastName === searchValue) {
        setSolid(true);
      }
    } else {
      setSolid(false);
    }

    if (onSelect) onSelect(currentSelected);
  }, [validOptions]);

  return (
    <SearchContainer isRCDropdown={isRCDropdown ?? false}>
      <SearchBar
        onClick={() => {
          setOpenMenu(true);
        }}
        placeholder={placeholder}
        open={openMenu}
        state={solid}
        tabIndex={-1}
        value={searchValue}
        isRCDropdown={isRCDropdown ?? false}
        onInput={(e) => {
          setSearchValue((e.target as HTMLTextAreaElement).value);
          setCurrentSelected(undefined);
        }}
      />
      {openMenu && (
        <OptionsContainer isRCDropdown={isRCDropdown ?? false}>
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
                <div>{`${option.firstName} ${option.lastName}`}</div>
                {isRCDropdown ? (
                  <div>{"uid" in option && `ID: ${option.uid}`}</div>
                ) : (
                  <div>{`(${option.email})`}</div>
                )}
              </Option>
            ))
          ) : (
            <NoResults>No Results</NoResults>
          )}
        </OptionsContainer>
      )}
      <Icon src={"SearchSymbol.svg"} alt="search" />
    </SearchContainer>
  );
}
