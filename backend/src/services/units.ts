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
  beds?: string;
  baths?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
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
    // delete unitData.leasedStatus;
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

  const units = await UnitModel.find({
    numBeds: { $gte: filters.beds ?? 1 },
    numBaths: { $gte: filters.baths ?? 0.5 },
    monthlyRent: { $gte: minPrice, $lte: maxPrice },
    approved,
  }).sort(sortingCriteria);

  const filteredUnits = units.filter((unit: Unit) => {
    return addressRegex.test(unit.listingAddress) && unit.availableNow === avail;
  });

  return filteredUnits;
};
