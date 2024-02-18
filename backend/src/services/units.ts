import { Unit, UnitModel } from "@/models/units";

type HousingLocatorFields =
  | "whereFound"
  | "paymentRentingCriteria"
  | "additionalRules"
  | "internalComments"
  | "approved"
  | "createdAt"
  | "updatedAt";

// Define a new type that extends the Unit type excluding the fields
// that are filled out by an HL.
// Override dateAvailable to be a string instead of a Date object since the frontend
// will send a string. Mongoose will automatically convert it to a Date object.
export type NewUnit = { dateAvailable: string } & Omit<Unit, HousingLocatorFields>;

/**
 * Create a new Unit object in the database.
 * @param newUnit new unit to be created
 * @returns newly created unit object
 */
export const createUnit = async (newUnit: NewUnit) => {
  const unit = await UnitModel.create(newUnit);
  return unit;
};
