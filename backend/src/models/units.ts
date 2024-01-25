// import { Timestamp } from "mongodb";
import { InferSchemaType, Schema, model } from "mongoose";

const unitSchema = new Schema(
  {
    approved: { type: Boolean, required: false, default: false },
    landlordFirstName: { type: String, required: true },
    landlordLastName: { type: String, required: true },
    landlordEmail: { type: String, required: true },
    landlordPhone: { type: String, required: true },
    monthlyRent: { type: Number, required: true },
    securityDeposit: { type: Number, required: true },
    paymentRentingCriteria: { type: [String], required: true },
    applicationFeeCost: { type: Number, required: false, default: undefined },
    housingAuthority: { type: String, required: true },
    holdingFeeAmount: { type: Number, required: false, default: undefined },
    listingAddress: { type: String, required: true },
    sqft: { type: Number, required: true },
    dateAvailable: { type: Date, required: true },
    availableNow: { type: Boolean, required: true },
    numBeds: { type: Number, required: true },
    numBaths: { type: Number, required: true },
    appliances: { type: [String], required: true },
    communityFeatures: { type: [String], required: true },
    parking: { type: [String], required: true },
    accessibility: { type: [String], required: true },
    pets: { type: [String], required: true },
    sharingAcceptable: { type: String, required: true },
    landlordComments: { type: String, required: true },
    // subsidyType: {},
    // whereFound: {},
    // additionalRules: {type: [String], require},
    // internalNotes: {type: String, required: false},
    // createdAt: {type: Date, default: Timestamp, required: true},
    // updatedAt: {type: Date, default: Timestamp, required: true},
  },
  // Mongoose will automatically create "createdAt" and "updatedAt" properties
  // and update them accordingly when the document is saved/updated.
  // { timestamps: true },
);

type Unit = InferSchemaType<typeof unitSchema>;

export const UnitModel = model<Unit>("Unit", unitSchema);
