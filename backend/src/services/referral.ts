import createHttpError from "http-errors";
import { ObjectId } from "mongoose";

import { ReferralModel } from "../models/referral";

import { sendReferralAssignmentEmail, sendReferralUnitLeasedEmail } from "./email";
import { getUserByID } from "./user";

import { User } from "@/models/user";

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

const INACTIVE_REFERRAL_STATUSES = ["Leased", "Denied", "Canceled"];

export async function editReferral(
  id: string,
  assignedHousingLocatorId: string,
  assignedReferringStaffId: string,
  status: string,
) {
  let referral = await ReferralModel.findById(id);
  const updateHL = referral?.assignedHousingLocator?.toString() !== assignedHousingLocatorId;
  const setLeased =
    status === "Leased" &&
    referral?.status !== "Leased" &&
    referral?.status !== "Denied" &&
    referral?.status !== "Canceled";

  referral = await ReferralModel.findByIdAndUpdate(
    id,
    {
      assignedHousingLocator: assignedHousingLocatorId,
      assignedReferringStaff: assignedReferringStaffId,
      status,
    },
    { new: true },
  )
    .populate("renterCandidate")
    .populate("assignedHousingLocator")
    .populate("assignedReferringStaff");

  const HL = referral?.assignedHousingLocator as unknown as User;

  if (updateHL) {
    if (HL !== null && referral !== null) {
      void sendReferralAssignmentEmail(referral, HL);
    }
  }

  if (setLeased) {
    // get all referrals for the leased unit
    const refs = await getUnitReferrals(referral?.unit.toString() ?? "");
    // filter only active referrals
    const activeReferrals = refs.filter((ref) => !INACTIVE_REFERRAL_STATUSES.includes(ref.status));

    for (const ref of activeReferrals) {
      // assignedHousingLocator is populated in the getUnitReferrals call
      const housingLocator = ref.assignedHousingLocator as unknown as User;
      if (housingLocator) void sendReferralUnitLeasedEmail(ref, housingLocator);
    }
  }

  return referral;
}

export async function deleteUnitReferrals(unitId: string) {
  return await ReferralModel.deleteMany({ unit: unitId });
}

export async function deleteReferral(id: string) {
  return await ReferralModel.deleteOne({ _id: id });
}

export async function getReferralsForUser(id: string) {
  const user = await getUserByID(id);

  if (!user) {
    throw createHttpError(404, "User notfound.");
  }

  let query;
  const { isHousingLocator } = user;

  if (isHousingLocator) {
    query = { assignedHousingLocator: id };
  } else {
    query = { assignedReferringStaff: id };
  }

  const referrals = await ReferralModel.find(query)
    .populate("renterCandidate")
    .populate("assignedHousingLocator")
    .populate("assignedReferringStaff");

  return referrals;
}

export async function getAllReferrals() {
  const referrals = await ReferralModel.find({})
    .populate("renterCandidate")
    .populate("assignedHousingLocator")
    .populate("assignedReferringStaff");
  return referrals;
}
