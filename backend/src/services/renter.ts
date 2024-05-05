import { RenterModel } from "../models/renter";

//Fetch renters from DB
export async function getRenterCandidates() {
  const renters = await RenterModel.find({});
  return renters;
}

export async function getRenterCandidate(id: string) {
  return await RenterModel.findById(id);
}

export async function createRenterCandidate(
  firstName: string,
  lastName: string,
  uid: string,
  program: string,
  adults: number,
  children: number,
  phone?: string,
  email?: string,
) {
  const query = { firstName, lastName, phone, email, uid, program, adults, children };
  const renter = await RenterModel.findOne(query);
  if (renter === null) {
    const newRenter = await RenterModel.create(query);
    return newRenter;
  } else {
    return null;
  }
}
