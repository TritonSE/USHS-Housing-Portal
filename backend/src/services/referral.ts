import { ObjectId } from "mongoose";

import { ReferralModel } from "@/models/referral";

export async function getUnitReferrals(id: string) {
  const referrals = await ReferralModel.find({ unit: id })
    .populate("renterCandidate")
    .populate("assignedHousingLocator")
    .populate("assignedReferringStaff");

  return referrals;
}

export async function createReferral(
  renterCandidateId: string,
  unit: string,
  referringStaff: ObjectId,
  isHL: boolean,
) {
  const referral = await ReferralModel.create({
    renterCandidate: renterCandidateId,
    unit,
    assignedReferringStaff: referringStaff,
    assignedHousingLocator: isHL ? referringStaff : undefined,
  });

  return referral;
}

export async function editReferral(
  id: string,
  assignedHousingLocatorId: string,
  assignedReferringStaffId: string,
  status: string,
) {
  await ReferralModel.findByIdAndUpdate(id, {
    assignedHousingLocator: assignedHousingLocatorId,
    assignedReferringStaff: assignedReferringStaffId,
    status,
  });
  const referral = await ReferralModel.findById(id);
  return referral;
}
