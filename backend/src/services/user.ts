/**
 * Business logic for user related operations.
 */

import { UserModel } from "@/models/user";

// Fetch users from the database
export async function getUsers() {
  // TODO
  const users = await UserModel.find();
  return users;
}

// Create and save a new user to the database
export function createUser() {
  // TODO
  console.log("Pretend to create a user.");
}
