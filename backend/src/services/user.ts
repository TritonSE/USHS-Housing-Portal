/**
 * Business logic for user related operations.
 */

import { UserModel } from "@/models/user";

// Fetch a user from the database
export async function getUser(id: string) {
  // TODO
  const user = await UserModel.findById(id);
  return user;
}

// Create and save a new user to the database
export function createUser() {
  // TODO
  console.log("Pretend to create a user.");
}
