import { InferSchemaType, Schema, model } from "mongoose";

const renterSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactInfo: { type: String, required: true },
    program: { type: String, required: false },
  },
  // Mongoose will automatically create "createdAt" and "updatedAt" properties
  // and update them accordingly when the document is saved/updated.
  { timestamps: true },
);

export type Renter = InferSchemaType<typeof renterSchema>;

export const RenterModel = model<Renter>("Renter", renterSchema);
