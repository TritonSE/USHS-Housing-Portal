import { ReferralModel } from "@/models/referral";

export async function getUnitReferrals(id: string) {
  const referrals = await ReferralModel.find({ unitId: id })
    .populate("renterCandidate")
    .populate("assignedHousingLocator")
    .populate("assignedReferringStaff");

  return referrals;
}
