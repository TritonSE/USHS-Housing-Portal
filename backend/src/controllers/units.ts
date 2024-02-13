import { RequestHandler } from "express";

// import { asyncHandler } from "./wrappers";

// import { createUnit } from "@/services/units";

type CreateUnitRequestBody = {
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

export const createUnitsHandler: RequestHandler = (req, res, _) => {
  const {
    approved,
    landlordFirstName,
    landlordLastName,
    landlordEmail,
    landlordPhone,
    monthlyRent,
    securityDeposit,
    paymentRentingCriteria,
    applicationFeeCost,
    housingAuthority,
    holdingFeeAmount,
    listingAddress,
    sqft,
    dateAvailable,
    availableNow,
    numBeds,
    numBaths,
    appliances,
    communityFeatures,
    parking,
    accessibility,
    pets,
    sharingAcceptable,
    landlordComments,
  } = req.body as CreateUnitRequestBody;

  // createUnit();

  res.status(201).json({
    unit: {
      approved,
      landlordFirstName,
      landlordLastName,
      landlordEmail,
      landlordPhone,
      monthlyRent,
      securityDeposit,
      paymentRentingCriteria,
      applicationFeeCost,
      housingAuthority,
      holdingFeeAmount,
      listingAddress,
      sqft,
      dateAvailable,
      availableNow,
      numBeds,
      numBaths,
      appliances,
      communityFeatures,
      parking,
      accessibility,
      pets,
      sharingAcceptable,
      landlordComments,
    },
  });
};
