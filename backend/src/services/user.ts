/**
 * Business logic for user related operations.
 */

import { UserModel } from "../models/user";

import { sendHLDemotionEmail, sendHLPromotionEmail } from "./email";

// Fetch users from the database
export async function getUsers() {
  const users = await UserModel.find({});
  users.sort((a, b) => {
    const fullNameA = a.firstName + " " + a.lastName;
    const fullNameB = b.firstName + " " + b.lastName;
    return fullNameA < fullNameB ? -1 : 1;
  });
  return users;
}

// Create and save a new user to the database
export async function createUser(firstName: string, lastName: string, email: string) {
  const users = await UserModel.find({});
  const user = await UserModel.findOne({ firstName, lastName, email });
  let isHL = false;

  if (user === null) {
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

export async function getUserByEmail(email: string) {
  return await UserModel.findOne({ email });
}

export async function getUserByID(id: string) {
  return await UserModel.findById(id);
}

export async function elevateUser(id: string) {
  const RS = await getUserByID(id);
  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    { isHousingLocator: true },
    { new: true },
  );
  if (RS !== null) {
    void sendHLPromotionEmail(RS);
  }
  return updatedUser;
}

export async function demoteUser(id: string) {
  const RS = await getUserByID(id);
  if (RS !== null) {
    void sendHLDemotionEmail(RS);
  }
  return await UserModel.findByIdAndUpdate(id, { isHousingLocator: false });
}
