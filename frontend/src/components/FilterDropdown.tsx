import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 28px;
  margin: 20px 10px;
  padding: 10px 20px;
  background-color: transparent;
`;

const SearchBar = styled.input`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 9px;
  padding-right: 134px;
  padding-top: 12px;
  padding-bottom: 12px;
  border-radius: 5px;
  border: 0.5px solid #cdcaca;
  background-color: #fff;
  box-shadow: 1px 1px 2px 0px rgba(188, 186, 183, 0.4);

  &::placeholder {
    color: #000;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 600;
  }
`;

const Dropdown = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 9px;
  padding-right: 75px;
  padding-top: 11px;
  padding-bottom: 11px;
  border-radius: 5px;
  border: 0.5px solid #cdcaca;
  background-color: #fff;
  box-shadow: 1px 1px 2px 0px rgba(188, 186, 183, 0.4);
`;

const FilterText = styled.p`
  color: #000;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
`;

const ResetFilterText = styled(FilterText)`
  color: var(--Primary, #b64201);
  font-weight: 500;
`;

const Sort = styled.div``;

export const FilterDropdown = () => {
  return (
    <FilterContainer>
      <SearchBar placeholder="Search Property"></SearchBar>
      <Dropdown>
        <FilterText>Availability</FilterText>
      </Dropdown>

      <Dropdown>
        <FilterText>Price</FilterText>
      </Dropdown>

      <Dropdown>
        <FilterText>Beds & Bath</FilterText>
      </Dropdown>

      <ResetFilterText>Reset filters</ResetFilterText>
    </FilterContainer>
  );
};
