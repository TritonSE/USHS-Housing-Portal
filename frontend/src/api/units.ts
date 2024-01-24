import { APIResult, get, handleAPIError } from "./requests";

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
