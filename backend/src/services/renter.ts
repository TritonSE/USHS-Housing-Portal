import { ReferralModel } from "../models/referral";
import { RenterModel } from "../models/renter";

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
  const query = { firstName, lastName, phone, email, uid, program, adults, children };
  const renter = await RenterModel.findOne(query);
  if (renter === null) {
    const newRenter = await RenterModel.create(query);
    return newRenter;
  } else {
    return null;
  }
}
