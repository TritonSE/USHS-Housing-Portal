import { ObjectId } from "mongodb";

import { ReferralModel } from "@/models/referral";

export async function getUnitReferrals(id: string) {
  const referrals = await ReferralModel.find({ unitId: id })
    .populate("renterCandidate")
    .populate("assignedHousingLocator")
    .populate("assignedReferringStaff");

  return referrals;
}

export async function createReferral(
  renterCandidateId: string,
  unitId: string,
  referringStaff: ObjectId,
) {
  const referral = await ReferralModel.create({
    renterCandidate: renterCandidateId,
    unitId,
    assignedReferringStaff: referringStaff,
  });
  return referral;
}
