import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  // Mongoose will automatically create "createdAt" and "updatedAt" properties
  // and update them accordingly when the document is saved/updated.
  { timestamps: true },
);

type User = InferSchemaType<typeof userSchema>;

export const UserModel = model<User>("User", userSchema);
