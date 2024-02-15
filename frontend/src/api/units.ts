import { APIResult, get, handleAPIError, post } from "./requests";

// Represents a Unit object as it will be received from the backend.
export type Unit = {
  landlordFirstName: string;
  landlordLastName: string;
  landlordEmail: string;
  landlordPhone: string;
  streetAddress: string;
  suiteNumber: string;
  city: string;
  state: string;
  areaCode: string;
  sqft: number;
  monthlyRent: number;
  securityDeposit: number;
  acceptThirdParty: boolean;
  housingAuthority: string;
  applicationFeeCost: number;
  dateAvailable: string;
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
  whereFound: string;
  paymentRentingCriteria: string[];
  additionalRules: string[];
  internalComments: string;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
};

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

export async function getUnits(_params: FilterParams): Promise<APIResult<Unit[]>> {
  try {
    // const query = new URLSearchParams(params);

    // const keysForDel: string[] = [];
    // query.forEach((value, key) => {
    //   if (value === "" || value === null || value === "undefined") {
    //     keysForDel.push(key);
    //   }
    // });

    // keysForDel.forEach((key) => {
    //   query.delete(key);
    // });

    // console.log(query.toString());

    const response = await get("/units");
    const json = (await response.json()) as Unit[];
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

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
