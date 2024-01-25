import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import UnitModel from "@/models/units";

export const createUnit: RequestHandler = async (req, res, next) => {
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
  } = req.body;

  res.status(201).json(unit);

  try {
    const unit = await UnitModel.create({
      approved: approved,
      landlordFirstName: landlordFirstName,
      landlordLastName: landlordLastName,
      landlordEmail: landlordEmail,
      landlordPhone: landlordPhone,
      monthlyRent: monthlyRent,
      securityDeposit: securityDeposit,
      paymentRentingCriteria: paymentRentingCriteria,
      applicationFeeCost: applicationFeeCost,
      housingAuthority: housingAuthority,
      holdingFeeAmount: holdingFeeAmount,
      listingAddress: listingAddress,
      sqft: sqft,
      dateAvailable: dateAvailable,
      availableNow: availableNow,
      numBeds: numBeds,
      numBaths: numBaths,
      appliances: appliances,
      communityFeatures: communityFeatures,
      parking: parking,
      accessibility: accessibility,
      pets: pets,
      sharingAcceptable: sharingAcceptable,
      landlordComments: landlordComments,
    });
    res.status(201).json(unit);
  } catch (error) {
    next(error);
  }
};
