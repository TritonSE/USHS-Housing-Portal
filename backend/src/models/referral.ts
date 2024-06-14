import { InferSchemaType, Schema, model } from "mongoose";

const referralSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ["Referred", "Viewing", "Pending", "Approved", "Denied", "Leased", "Canceled"],
      default: "Referred",
    },
    renterCandidate: { type: Schema.Types.ObjectId, ref: "Renter", required: true },
    unit: {
      type: Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },
    // Will be set later on in the flow
    assignedHousingLocator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    // Should be set to the user that created the referral (RS or HL)
    assignedReferringStaff: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  // Mongoose will automatically create "createdAt" and "updatedAt" properties
  // and update them accordingly when the document is saved/updated.
  { timestamps: true },
);

export type Referral = InferSchemaType<typeof referralSchema>;
export const ReferralModel = model<Referral>("Referral", referralSchema);
