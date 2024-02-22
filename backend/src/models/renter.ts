import { InferSchemaType, Schema, model } from "mongoose";

const renterSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    uid: { type: String, required: true },
    program: { type: String, required: true },
    adults: { type: Number, required: true },
    children: { type: Number, required: true },
  },
  { timestamps: true },
);

export type Renter = InferSchemaType<typeof renterSchema>;

export const RenterModel = model<Renter>("Renter", renterSchema);
