import { ObjectId } from "mongodb";
import { InferSchemaType, Schema, model } from "mongoose";

const referralSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ["Referred", "Viewing", "Pending", "Approved", "Denied", "Leased", "Canceled"],
      default: "Referred",
    },
    renterCandidateId: {
      type: ObjectId,
      required: true,
    },
    unitId: {
      type: ObjectId,
      required: true,
    },
    // Will be set later on in the flow
    assignedHousingLocatorId: {
      type: ObjectId,
      required: false,
    },
    // Should be set to the user that created the referral (RS or HL)
    assignedReferringStaffId: {
      type: ObjectId,
      required: true,
    },
  },
  // Mongoose will automatically create "createdAt" and "updatedAt" properties
  // and update them accordingly when the document is saved/updated.
  { timestamps: true },
);

export type Referral = InferSchemaType<typeof referralSchema>;
export const ReferralModel = model<Referral>("Referral", referralSchema);
