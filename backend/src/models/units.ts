import { InferSchemaType, ObtainSchemaGeneric, Schema, model } from "mongoose";

const unitSchema = new Schema(
  {
    landlordFirstName: { type: String, required: true },
    landlordLastName: { type: String, required: true },
    landlordEmail: { type: String, required: true },
    landlordPhone: { type: String, required: true },
    streetAddress: { type: String, required: true },
    suiteNumber: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    areaCode: { type: String, required: true },
    sqft: { type: Number, required: true },
    monthlyRent: { type: Number, required: true },
    securityDeposit: { type: Number, required: true },
    acceptThirdParty: { type: Boolean, required: true },
    housingAuthority: { type: String, required: true },
    applicationFeeCost: { type: Number, required: true },
    dateAvailable: { type: Date, required: true },
    leasedStatus: { type: String, required: false, enum: ["ushs", "removed"] },
    numBeds: { type: Number, required: true },
    numBaths: { type: Number, required: true },
    appliances: { type: [String], required: true },
    communityFeatures: { type: [String], required: true },
    parking: { type: [String], required: true },
    accessibility: { type: [String], required: true },
    pets: { type: [String], required: true },
    sharingAcceptable: { type: String, required: true },
    landlordComments: { type: String, required: false, default: "" },
    whereFound: { type: String, required: false, default: "" },
    paymentRentingCriteria: { type: [String], required: false },
    additionalRules: { type: [String], required: false },
    internalComments: { type: String, required: false, default: "" },
    approved: { type: Boolean, required: false, default: false },
  },
  {
    // Mongoose will automatically create "createdAt" and "updatedAt" properties
    // and update them accordingly when the document is saved/updated.
    timestamps: true,
    virtuals: {
      // Determine if a unit is available for rent.
      availableNow: {
        get: function () {
          return this.dateAvailable <= new Date() && this.leasedStatus === undefined;
        },
      },
      // Full address of the unit.
      listingAddress: {
        get: function () {
          return `${this.streetAddress}, ${this.suiteNumber}, ${this.city}, ${this.state} ${this.areaCode}`;
        },
      },
    },
    // Include virtual properties when converting to JSON or object.
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

export type Unit = InferSchemaType<typeof unitSchema> &
  ObtainSchemaGeneric<typeof unitSchema, "TVirtuals">;

export const UnitModel = model("Unit", unitSchema);
