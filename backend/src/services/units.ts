import { UpdateQuery } from "mongoose";

import { Unit, UnitModel } from "@/models/units";

type UserReadOnlyFields = "approved" | "createdAt" | "updatedAt";

type HousingLocatorFields =
  | "leasedStatus"
  | "whereFound"
  | "paymentRentingCriteria"
  | "additionalRules"
  | "internalComments";

// Define a new type that extends the Unit type excluding the fields
// that are filled out by an HL.
// Override dateAvailable to be a string instead of a Date object since the frontend
// will send a string. Mongoose will automatically convert it to a Date object.
export type NewUnitBody = { dateAvailable: string } & Omit<
  Unit,
  HousingLocatorFields | UserReadOnlyFields
>;
export type EditUnitBody = { dateAvailable: string } & Omit<Unit, UserReadOnlyFields>;

export type FilterParams = {
  search?: string;
  availability?: string;
  housingAuthority?: string;
  accessibility?: string;
  rentalCriteria?: string;
  additionalRules?: string;
  minPrice?: string;
  maxPrice?: string;
  minSecurityDeposit?: string;
  maxSecurityDeposit?: string;
  minApplicationFee?: string;
  maxApplicationFee?: string;
  minSize?: string;
  maxSize?: string;
  fromDate?: string;
  toDate?: string;
  beds?: string;
  baths?: string;
  sort?: string;
  approved?: "pending" | "approved";
};

/**
 * Create a new Unit object in the database.
 * @param newUnit new unit to be created
 * @returns newly created unit object
 */
export const createUnit = async (newUnit: NewUnitBody, isHl: boolean) => {
  const createQuery = {
    ...newUnit,
    // Listing is automatically approved if the user is a housing locator
    approved: isHl,
  };

  const unit = await UnitModel.create(createQuery);
  return unit;
};

export const updateUnit = async (id: string, unitData: EditUnitBody) => {
  const updateQuery: UpdateQuery<Unit> = {};
  if (unitData.leasedStatus === null) {
    delete unitData.leasedStatus;
    // unset leasedStatus if null
    updateQuery.$unset = { leasedStatus: 1 };
  }

  updateQuery.$set = unitData;

  const updatedUnit = UnitModel.findByIdAndUpdate(id, updateQuery, { new: true });
  return updatedUnit;
};

export const approveUnit = async (unitId: string) => {
  const unit = await UnitModel.findById(unitId);
  if (unit === null) {
    return null;
  }
  unit.approved = true;
  await unit.save();
  return unit;
};

export const deleteUnit = async (id: string) => {
  const unit = await UnitModel.deleteOne({ _id: id });
  // TODO delete all references (ie. referrals)
  return unit;
};

export const getUnits = async (filters: FilterParams) => {
  // If FilterParams is empty return all available units
  if (Object.keys(filters).length === 0 && filters.constructor === Object) {
    const units = await UnitModel.find({ dateAvailable: { $lte: new Date() }, approved: true });
    return units;
  }

  const addressRegex = new RegExp(filters.search ?? "", "i");

  const minPrice = filters.minPrice === "undefined" ? 0 : +(filters.minPrice ?? 0);
  const maxPrice = filters.maxPrice === "undefined" ? 100000 : +(filters.maxPrice ?? 100000);

  const minSecurityDeposit =
    filters.minSecurityDeposit === "undefined" ? 0 : +(filters.minSecurityDeposit ?? 0);
  const maxSecurityDeposit =
    filters.maxSecurityDeposit === "undefined" ? 100000 : +(filters.maxSecurityDeposit ?? 100000);

  const minApplicationFee =
    filters.minApplicationFee === "undefined" ? 0 : +(filters.minApplicationFee ?? 0);
  const maxApplicationFee =
    filters.maxApplicationFee === "undefined" ? 100000 : +(filters.maxApplicationFee ?? 100000);

  const minSize = filters.minSize === "undefined" ? 0 : +(filters.minSize ?? 0);
  const maxSize = filters.maxSize === "undefined" ? 100000 : +(filters.maxSize ?? 100000);

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const fromDate = dateRegex.test(filters.fromDate ?? "") ? filters.fromDate : "1900-01-01";
  const toDate = dateRegex.test(filters.toDate ?? "") ? filters.toDate : "2100-01-01";

  const avail = filters.availability ? (filters.availability === "Available" ? true : false) : true;
  const approved = filters.approved ? (filters.approved === "approved" ? true : false) : true;

  let sortingCriteria;
  switch (filters.sort) {
    case "0": // Price (High to Low)
      sortingCriteria = "-monthlyRent";
      break;
    case "1": // Price (Low to High)
      sortingCriteria = "monthlyRent";
      break;
    case "2": // Newest
      sortingCriteria = "-createdAt";
      break;
    case "3": // Bedrooms
      sortingCriteria = "-numBeds";
      break;
    case "4": // Baths
      sortingCriteria = "-numBaths";
      break;
    default:
      sortingCriteria = "-monthlyRent";
      break;
  }

  //const hasAccessibility = !(filters.accessibility === undefined || filters.accessibility === "[]");
  //const rentalCriteria = !(filters.rentalCriteria === undefined || filters.rentalCriteria === "[]");
  // const additionalRules = !(
  //   filters.additionalRules === undefined || filters.additionalRules === "[]"
  // );

  const units = await UnitModel.find({
    numBeds: { $gte: filters.beds ?? 1 },
    numBaths: { $gte: filters.baths ?? 0.5 },
    monthlyRent: { $gte: minPrice, $lte: maxPrice },
    securityDeposit: { $gte: minSecurityDeposit, $lte: maxSecurityDeposit },
    applicationFeeCost: { $gte: minApplicationFee, $lte: maxApplicationFee },
    sqft: { $gte: minSize, $lte: maxSize },
    dateAvailable: { $gte: fromDate, $lte: toDate },
    housingAuthority: filters.housingAuthority ?? { $exists: true },
    approved,
    // accessibility: hasAccessibility
    //   ? { $in: JSON.parse(filters.accessibility ?? "[]") }
    //   : { $exists: true },
  }).sort(sortingCriteria);

  const filteredUnits = units.filter((unit: Unit) => {
    return addressRegex.test(unit.listingAddress) && unit.availableNow === avail;
  });

  return filteredUnits;
};
