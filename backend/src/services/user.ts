/**
 * Business logic for user related operations.
 */

import { UserModel } from "@/models/user";

// Fetch users from the database
export async function getUsers() {
  const users = await UserModel.find({});
  return users;
}

// Create and save a new user to the database
export async function createUser(firstName: string, lastName: string, email: string) {
  // TODO

  const users = await UserModel.find({});
  console.log(typeof users);
  const user = await UserModel.findOne({ firstName, lastName, email });
  let isHL = false;

  if (user == null) {
    if (users.length === 0) {
      isHL = true;
    }
    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      isHousingLocator: isHL,
    });
    return newUser;
  } else {
    return null;
  }
}
