import { type APIResult, handleAPIError, post } from "src/api/requests";

export interface Unit {
  _id: string;
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
  dateCreated: Date;
  dateUpdated: Date;
}

interface UnitJSON {
  _id: string;
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
  dateCreated: Date;
  dateUpdated: Date;
}

function parseUnit(unit: UnitJSON): Unit {
  return {
    _id: unit._id,
    approved: unit.approved,
    landlordFirstName: unit.landlordFirstName,
    landlordLastName: unit.landlordLastName,
    landlordEmail: unit.landlordEmail,
    landlordPhone: unit.landlordPhone,
    monthlyRent: unit.monthlyRent,
    securityDeposit: unit.securityDeposit,
    paymentRentingCriteria: unit.paymentRentingCriteria,
    applicationFeeCost: unit.applicationFeeCost,
    housingAuthority: unit.housingAuthority,
    holdingFeeAmount: unit.holdingFeeAmount,
    listingAddress: unit.listingAddress,
    sqft: unit.sqft,
    dateAvailable: unit.dateAvailable,
    availableNow: unit.availableNow,
    numBeds: unit.numBeds,
    numBaths: unit.numBaths,
    appliances: unit.appliances,
    communityFeatures: unit.communityFeatures,
    parking: unit.parking,
    accessibility: unit.accessibility,
    pets: unit.pets,
    sharingAcceptable: unit.sharingAcceptable,
    landlordComments: unit.landlordComments,
    dateCreated: unit.dateCreated,
    dateUpdated: unit.dateUpdated,
  };
}

/**
 * The expected inputs when we want to create a new Task object. In the MVP, we only
 * need to provide the title and optionally the description, but in the course of
 * this tutorial you'll likely want to add more fields here.
 */
export interface CreateUnitRequest {
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
}

export async function createUnit(unit: CreateUnitRequest): Promise<APIResult<Unit>> {
  try {
    const response = await post("/api/units", unit);
    const json = (await response.json()) as UnitJSON;
    return { success: true, data: parseUnit(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}
