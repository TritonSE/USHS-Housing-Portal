import { useEffect, useState } from "react";
import styled from "styled-components";

import { User } from "@/api/users";

const SearchContainer = styled.div`
    width: 367px;
    position: relative;
    z-index: 1;
`

const SearchBar = styled.div`
  display: flex;
  width: 367px;
  height: 44px;
  padding: 9px 12px;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  border-radius: 5px;
  border: 2px solid var(--Card-Outline, #cdcaca);
  box-shadow: 1px 1px 2px 0px rgba(188, 186, 183, 0.4);
  cursor: text;
  &:hover{
    border: 2px solid black;
  }
`;

const SearchText = styled.div`
font-size: 16px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: 0.32px;
  overflow-x: auto;
  overflow-y: hidden;
`

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
  background-color: #FBF7F3;

`;
const Option = styled.div`
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: 0.32px;
  cursor: pointer;
  height: 100%;
  padding: 10px;
  &:hover{
    color: #DEBB01;
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
`

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: rgbd(0,0,0,0);
  z-index: -1;
`

type SelectProps = {
  placeholder: string;
  options: User[];
  onChange: (value: User) => void;
  close: boolean;
};

export function Select({ placeholder, options, onChange, close}: SelectProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [value, setValue] = useState("");
  const [validOptions, setValidOptions] = useState<User[]>(options);

    useEffect(()=>{
        setOpenMenu(false);
        setValue("");
    }, [close]);

    useEffect(()=>{
        handleValidOptions();
    }, [value]);

  const handleSelect = (selectedValue: User) => {
    setValue(selectedValue.firstName + " " + selectedValue.lastName);
    onChange(selectedValue);
    setOpenMenu(false);
  };

  //super messy filtering code, feedback welcome :)
  const handleValidOptions = () => {
    const matches = [];
    for(let i = 0; i<options.length; i++){
        const fullName = options[i].firstName + " " + options[i].lastName;
        if(fullName.toLowerCase().indexOf(value.toLowerCase())!=-1){
            matches.push(options[i]);
        }
    }
    matches.sort((a, b) => {
        const fullNameA = a.firstName + " " + a.lastName;
        const fullNameB = b.firstName + " " + b.lastName;
        return fullNameA.toLowerCase().indexOf(value.toLowerCase()) - 
                fullNameB.toLowerCase().indexOf(value.toLowerCase());
    })
    setValidOptions(matches);
}
  
  return (
    <SearchContainer>
      <SearchBar onClick={()=>setOpenMenu(true)} tabIndex={-1} onKeyDown={(e)=>{
        if(e.key==="Backspace"){
            setValue(value.substring(0, value.length-1));
            setOpenMenu(true);
        }else if(e.key==="Escape"){
            setOpenMenu(false);
        }else if(!e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey 
                && e.key!=="Tab" && e.key!=="CapsLock" && e.key!=="Enter"
                && e.key.indexOf("Arrow")==-1){
            setValue(value+e.key);
            setOpenMenu(true);
        }
      }}>
        <SearchText>{value===""?placeholder:value}</SearchText>
        <img src="SearchSymbol.svg" alt="Search" />
        </SearchBar>
      {openMenu &&  (
        <OptionsContainer>
        <Overlay onClick={()=>setOpenMenu(false)}/>
          {validOptions.length>0?(validOptions.map((option, index) => (
              <Option
                key={index}
                onClick={() => {
                  handleSelect(option);
                }}
              >
                {option.firstName + " " + option.lastName}
              </Option>
            ))):<NoResults>No Results</NoResults>}
        </OptionsContainer>
      )}
    </SearchContainer>
  );
}
