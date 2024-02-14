import { RenterModel } from "../models/renter";

//Fetch renters from DB
export async function getRenterCandidates() {
  const renters = await RenterModel.find({});
  return renters;
}

export async function createRenterCandidate(
  firstName: string,
  lastName: string,
  contactInfo: string,
  program?: string,
) {
  const query =
    typeof program !== "undefined"
      ? { firstName, lastName, contactInfo, program }
      : { firstName, lastName, contactInfo };
  const renter = await RenterModel.findOne(query);
  if (renter === null) {
    const newRenter = await RenterModel.create(query);
    return newRenter;
  } else {
    return null;
  }
}
