import { APIResult, handleAPIError, post } from "src/api/requests";

export type FilterParams = {
  search?: string | undefined;
  availability: number;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  beds?: number;
  baths?: number;
  approved?: boolean;
  sort: number;
};

export function getUnits(params: FilterParams): Promise<APIResult<Unit[]>> {
  try {
    const query = new URLSearchParams(params);

    const keysForDel: string[] = [];
    query.forEach((value, key) => {
      if (value === "" || value === null || value === "undefined") {
        keysForDel.push(key);
      }
    });

    keysForDel.forEach((key) => {
      query.delete(key);
    });

    console.log(query.toString());
  } catch (error) {
    return handleAPIError(error);
  }
}

export type CreateUnitRequest = {
  approved: boolean;
  landlordFirstName: string;
  landlordLastName: string;
  landlordEmail: string;
  landlordPhone: string;
  monthlyRent: number;
  securityDeposit: number;
  paymentRentingCriteria: [string];
  applicationFeeCost: number;
  housingAuthority: string;
  holdingFeeAmount: number;
  listingAddress: string;
  sqft: number;
  dateAvailable: Date;
  availableNow: boolean;
  numBeds: number;
  numBaths: number;
  appliances: [string];
  communityFeatures: [string];
  parking: [string];
  accessibility: [string];
  pets: [string];
  sharingAcceptable: string;
  landlordComments: string;
};

export async function createUnit(unit: CreateUnitRequest): Promise<APIResult<Unit>> {
  try {
    const response = await post("/api/units", unit);
    const json = (await response.json()) as UnitJSON;
    return { success: true, data: parseUnit(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}
