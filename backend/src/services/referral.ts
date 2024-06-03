import { ObjectId } from "mongoose";

import { sendEmail } from "./email";
import { getUserByID } from "./user";

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

const INACTIVE_REFERRAL_STATUSES = ["Leased", "Denied", "Canceled"];

export async function editReferral(
  id: string,
  assignedHousingLocatorId: string,
  assignedReferringStaffId: string,
  status: string,
) {
  const Ref = await ReferralModel.findById(id);
  const updateHL = Ref?.assignedHousingLocator?.toString() !== assignedHousingLocatorId;
  const setLeased =
    status === "Leased" &&
    Ref?.status !== "Leased" &&
    Ref?.status !== "Denied" &&
    Ref?.status !== "Canceled";
  await ReferralModel.findByIdAndUpdate(id, {
    assignedHousingLocator: assignedHousingLocatorId,
    assignedReferringStaff: assignedReferringStaffId,
    status,
  });
  const referral = await ReferralModel.findById(id);
  const HL = await getUserByID(referral?.assignedHousingLocator?.toString() ?? "");

  if (updateHL) {
    if (HL !== null) {
      await sendEmail(
        HL.email,
        "Referral Update",
        `You have been assigned a new referral. Please login to the portal to view the update.`,
      );
    }
  }
  if (setLeased) {
    const refs = await getUnitReferrals(referral?.unit.toString() ?? "");
    const userPromises = [];
    const emailPromises = [];
    for (const ref of refs) {
      if (!INACTIVE_REFERRAL_STATUSES.includes(ref.status)) {
        userPromises.push(getUserByID(ref.assignedHousingLocator?.toString() ?? ""));
      }
    }
    const users = await Promise.all(userPromises);
    for (const user of users) {
      if (user?.email) {
        emailPromises.push(
          sendEmail(user.email, "Referral Update", "One of your referrals has been leased."),
        );
      }
    }
    await Promise.all(emailPromises);
  }

  return referral;
}

export async function deleteUnitReferrals(unitId: string) {
  return await ReferralModel.deleteMany({ unit: unitId });
}

export async function deleteReferral(id: string) {
  return await ReferralModel.deleteOne({ _id: id });
}
