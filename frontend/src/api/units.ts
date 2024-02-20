import { APIResult, get, handleAPIError, post } from "./requests";

// Represents a Unit object as it will be received from the backend.

export type FilterParams = {
  search?: string | undefined;
  availability: string;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  beds?: number;
  baths?: number;
  approved?: boolean;
  sort: number;
};

type HousingLocatorFields =
  | "whereFound"
  | "paymentRentingCriteria"
  | "additionalRules"
  | "internalComments"
  | "approved"
  | "createdAt"
  | "updatedAt";

export type CreateUnitRequest = Omit<Unit, HousingLocatorFields>;

export async function createUnit(unit: CreateUnitRequest): Promise<APIResult<Unit>> {
  try {
    const response = await post("/units", unit);
    const json = (await response.json()) as Unit;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

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

export type Unit = {
  _id: string;
  approved: boolean;
  landlordFirstName: string;
  landlordLastName: string;
  landlordEmail: string;
  landlordPhone: string;
  monthlyRent: number;
  securityDeposit: number;
  paymentRentingCriteria: string[];
  applicationFeeCost?: number;
  housingAuthority: string;
  holdingFeeAmount?: number;
  listingAddress: string;
  sqft: number;
  dateAvailable: Date;
  availableNow: boolean;
  numBeds: number;
  numBaths: number;
  appliances: string[];
  communityFeatures: string[];
  parking: string[];
  accessibility: string[];
  pets: string[];
  sharingAcceptable: string;
  landlordComments: string;
  subsidyType?: string;
  whereFound?: string;
  additionalRules?: string[];
  internalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function getUnit(id: string): Promise<APIResult<Unit>> {
  try {
    const response = await get(`/units/${id}`);
    const json = (await response.json()) as Unit;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
