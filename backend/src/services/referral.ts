import { ReferralModel } from "@/models/referral";

export async function getUnitReferrals(id: string) {
  const referrals = await ReferralModel.find({ unitId: id }).populate("renterCandidate");
  return referrals;
}
