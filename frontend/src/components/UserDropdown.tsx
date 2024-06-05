import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { ClickAwayListener } from "./ClickAwayListener";

import { RenterCandidate } from "@/api/renter-candidates";
import { User } from "@/api/users";

const SearchContainer = styled.div`
  position: relative;
`;

const Icon = styled.img<{ isTableDropdown?: boolean }>`
  position: absolute;
  top: ${(props) => (props.isTableDropdown ? "12px" : "10px")};
  right: 10px;
`;

const SearchBar = styled.input<{
  width?: string;
  open: boolean;
  state: boolean;
  isRCDropdown: boolean;
}>`
  width: ${(props) => (props.width ? props.width : props.isRCDropdown ? "300px" : "367px")};
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
  z-index: 1;
  position: absolute;
  top: 47px;
  max-height: ${(props) => (props.isRCDropdown ? "250px" : "160px")};
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  border-radius: 5px;
  border: 0.5px solid #cdcaca;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  background-color: #fff;
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

type Option = User | RenterCandidate;

type SelectProps = {
  width?: string;
  placeholder: string;
  initialSelection?: Option;
  options: Option[];
  onSelect: (value: Option) => void; //callback function for parent, sends current selected user
  reset?: boolean;
  isRCDropdown?: boolean;
  isTableDropdown?: boolean;
};

export function UserDropdown({
  width,
  placeholder,
  initialSelection,
  options,
  onSelect,
  reset,
  isRCDropdown,
  isTableDropdown,
}: SelectProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [searchValue, setSearchValue] = useState(""); //current text value in select input box
  const [validOptions, setValidOptions] = useState<Option[]>(options); //all RS filtered through search
  const [currentSelected, setCurrentSelected] = useState<Option>(); //current selected RS

  const handleSelect = (selectedValue: Option) => {
    setCurrentSelected(selectedValue);
    onSelect(selectedValue);
    setOpenMenu(false);
  };

  const syncSearchValue = () => {
    setSearchValue(
      currentSelected ? currentSelected.firstName + " " + currentSelected.lastName : "",
    );
  };

  // Update search value when selected value changes
  useEffect(syncSearchValue, [currentSelected]);

  useEffect(() => {
    if (initialSelection && !currentSelected) {
      setCurrentSelected(initialSelection);
    }
  }, [initialSelection]);

  // Reset search bar after action from parent component
  useEffect(() => {
    if (reset !== undefined) {
      setOpenMenu(false);
      setCurrentSelected(undefined);
    }
  }, [reset]);

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
        return fullNameA.toLowerCase() < fullNameB.toLowerCase() ? -1 : 1;
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

  //triggers everytime text in input box changes; ensures options are filtered
  useEffect(() => {
    handleValidOptions();
  }, [searchValue, currentSelected, options]);

  const boldSearchText = useMemo(
    () => currentSelected?.firstName + " " + currentSelected?.lastName === searchValue,
    [currentSelected, searchValue],
  );

  return (
    <SearchContainer>
      <SearchBar
        width={width}
        onClick={() => {
          if (currentSelected) {
            // reset search value if a selection already exists
            setSearchValue("");
          }
          setOpenMenu(true);
        }}
        placeholder={placeholder}
        open={openMenu}
        state={boldSearchText}
        tabIndex={-1}
        value={searchValue}
        isRCDropdown={isRCDropdown ?? false}
        onInput={(e) => {
          setSearchValue((e.target as HTMLTextAreaElement).value);
        }}
      />
      {openMenu && (
        <ClickAwayListener
          onClickAway={() => {
            // set search value back to original since nothing was selected
            syncSearchValue();
            setOpenMenu(false);
          }}
        >
          <OptionsContainer isRCDropdown={isRCDropdown ?? false}>
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
        </ClickAwayListener>
      )}
      {isTableDropdown ? (
        <Icon isTableDropdown={true} src={openMenu ? "/up_arrow.svg" : "/dropdown.svg"} />
      ) : (
        <Icon src="/SearchSymbol.svg" alt="search" />
      )}
    </SearchContainer>
  );
}
