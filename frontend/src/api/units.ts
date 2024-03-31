import { APIResult, deleteRequest, get, handleAPIError, post, put } from "./requests";

// Represents a Unit object as it will be received from the backend.
export type Unit = {
  _id: string;
  landlordFirstName: string;
  landlordLastName: string;
  landlordEmail: string;
  landlordPhone: string;
  streetAddress: string;
  suiteNumber: string;
  city: string;
  state: string;
  listingAddress: string;
  areaCode: string;
  sqft: number;
  monthlyRent: number;
  securityDeposit: number;
  acceptThirdParty: boolean;
  housingAuthority: string;
  applicationFeeCost: number;
  dateAvailable: string;
  leasedStatus?: "ushs" | "removed";
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
  search?: string;
  availability?: string;
  minPrice?: string;
  maxPrice?: string;
  beds?: string;
  baths?: string;
  sort?: string;
  approved?: "pending" | "approved";
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

export async function getUnits(params: FilterParams): Promise<APIResult<Unit[]>> {
  try {
    const queryParams = new URLSearchParams(params);
    const url = `/units?${queryParams.toString()}`;
    const response = await get(url);

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

export type RenterCandidate = {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  program: string;
  adults: number;
  children: number;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isHousingLocator: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Referral = {
  _id: string;
  status: string;
  renterCandidate: RenterCandidate;
  unitId: string;
  assignedHousingLocator: User;
  assignedReferringStaff: User;
  updatedAt: Date;
};

export async function getUnitReferrals(id: string): Promise<APIResult<Referral[]>> {
  try {
    const response = await get(`/units/${id}/referrals`);
    const json = (await response.json()) as Referral[];
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function approveUnit(unitId: string): Promise<APIResult<Unit>> {
  try {
    const response = await put(`/units/${unitId}/approve`, {});
    const json = (await response.json()) as Unit;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function deleteUnit(id: string): Promise<APIResult<Unit>> {
  try {
    const response = await deleteRequest(`/units/${id}`);
    const json = (await response.json()) as Unit;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
