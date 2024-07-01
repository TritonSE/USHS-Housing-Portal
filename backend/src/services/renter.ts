import createHttpError from "http-errors";

import { ReferralModel } from "../models/referral";
import { Renter, RenterModel } from "../models/renter";

export type EditRenterCandidateBody = Partial<Renter>;

//Fetch renters from DB
export async function getRenterCandidates() {
  const renters = await RenterModel.find({});
  return renters;
}

export async function getRenterCandidate(id: string) {
  const renter = await RenterModel.findById(id);
  const referrals = await ReferralModel.find({ renterCandidate: id })
    .populate("unit")
    .populate("assignedHousingLocator")
    .populate("assignedReferringStaff");

  return { renter, referrals };
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
  const renter = await RenterModel.findOne({ uid });
  if (renter !== null) {
    throw createHttpError(400, "Renter with that UID already exists");
  }
  const newRenterQuery = { firstName, lastName, phone, email, uid, program, adults, children };
  const newRenter = await RenterModel.create(newRenterQuery);
  return newRenter;
}

export async function editRenterCandidate(id: string, editQuery: EditRenterCandidateBody) {
  return await RenterModel.findByIdAndUpdate(id, editQuery, { new: true });
}
