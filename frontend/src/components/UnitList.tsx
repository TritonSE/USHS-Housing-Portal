import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { Pagination } from "./Pagination";

import { Unit } from "@/api/units";
import { FiltersContext } from "@/pages/Home";

const ENTRIES_PER_PAGE = 6;

const UnitTable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
  background-color: white;
`;

const UnitTableHeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 44px;
  margin-right: 44px;
  margin-top: 32px;

  padding-bottom: 17px;
  justify-content: space-between;
  gap: 20px; //causes problems when shrinking, status overflows out of table
  border-bottom: 0.4px solid #cdcacacc;
`;

const UnitTableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: Montserrat;
  color: black;
  margin-left: 44px;
  margin-right: 44px;
  height: 100px;

  padding-bottom: 17px;
  padding-top: 17px;

  border-bottom: 0.4px solid #cdcacacc;
  gap: 20px;
  &:hover {
    background-color: #ec85371a;
    border: 0.4px solid #b64201;
  }
`;

const UnitItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-family: "Montserrat";
  align-items: center;
  width: 150px;
`;

const ListingAddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-family: "Montserrat";
  width: 200px;
  align-items: center;
`;

const UnitHeaderItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Poppins";
  font-size: 14px;
  line-height: 21px;
  color: #909090;
  align-items: center;
  width: 150px;
`;

const UnitListFooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin-left: 44px;
  margin-right: 44px;
  padding-top: 17px;
  height: 90px;
`;

const UnitListFooter = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
`;

const AvailableWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 85.45px;
  height: 29px;
  padding: 4px 12px 4px 12px;
  gap: 10px;
  border-radius: 4px;
  background: #7a923a33;
  border: 1px solid #7a923a;
  color: #7a923a;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.01em;
  justify-content: center;
`;

const PendingWrapper = styled(AvailableWrapper)`
  background: #b6420133;
  border: 1px solid #b64201;
  color: #b64201;
`;

const UnitNotFoundWrapper = styled.div`
  margin-top: 40px;
  align-self: center;
`;

export type UnitListProps = {
  units: Unit[];
};

export const UnitList = ({ units }: UnitListProps) => {
  const { pathname } = useLocation();
  const { filters } = useContext(FiltersContext);
  const [pageNumber, setPageNumber] = useState<number>(1);

  return (
    <UnitTable>
      <UnitTableHeaderRow>
        <UnitHeaderItemWrapper>Listing Address</UnitHeaderItemWrapper>
        <UnitHeaderItemWrapper>Price</UnitHeaderItemWrapper>
        <UnitHeaderItemWrapper>Beds</UnitHeaderItemWrapper>
        <UnitHeaderItemWrapper>Baths</UnitHeaderItemWrapper>
        <UnitHeaderItemWrapper>Sqft</UnitHeaderItemWrapper>
        <UnitHeaderItemWrapper>Status</UnitHeaderItemWrapper>
      </UnitTableHeaderRow>
      <>
        {units.length > 0 &&
          units
            .slice((pageNumber - 1) * ENTRIES_PER_PAGE, pageNumber * ENTRIES_PER_PAGE)
            .map((unit: Unit, index) => (
              <Link
                to={`/unit/${unit._id}`}
                state={{ filters, prevPage: pathname }}
                style={{ textDecoration: "none" }}
                key={index}
              >
                <UnitTableRow>
                  <ListingAddressWrapper>{unit.listingAddress}</ListingAddressWrapper>
                  <UnitItemWrapper>${unit.monthlyRent}</UnitItemWrapper>
                  <UnitItemWrapper>{unit.numBeds}</UnitItemWrapper>
                  <UnitItemWrapper>{unit.numBaths}</UnitItemWrapper>
                  <UnitItemWrapper>{unit.sqft}</UnitItemWrapper>
                  <UnitItemWrapper>
                    {" "}
                    {unit.availableNow && unit.approved ? (
                      <UnitItemWrapper>
                        <AvailableWrapper>Available</AvailableWrapper>
                      </UnitItemWrapper>
                    ) : !unit.approved ? (
                      <UnitItemWrapper>
                        <PendingWrapper>Pending</PendingWrapper>
                      </UnitItemWrapper>
                    ) : unit.leasedStatus !== undefined ? (
                      <UnitItemWrapper>Leased</UnitItemWrapper>
                    ) : (
                      <UnitItemWrapper>Not Available</UnitItemWrapper>
                    )}
                  </UnitItemWrapper>
                </UnitTableRow>
              </Link>
            ))}
        {units.length === 0 && <UnitNotFoundWrapper>No matching units found</UnitNotFoundWrapper>}
      </>
      <UnitListFooterWrapper>
        <UnitListFooter>
          <Pagination
            totalPages={Math.ceil(units.length / ENTRIES_PER_PAGE)}
            currPage={pageNumber}
            setPageNumber={setPageNumber}
          />
        </UnitListFooter>
      </UnitListFooterWrapper>
    </UnitTable>
  );
};
