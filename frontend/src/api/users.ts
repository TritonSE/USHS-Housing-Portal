/**
 *
 * Users API
 *
 * Provides functions for Users
 *
 */

import { APIResult, get, handleAPIError, post } from "./requests";

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isHousingLocator: boolean;
};

export type createUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
};

export async function getUsers(): Promise<APIResult<User[]>> {
  try {
    const response = await get("/users");
    const json = (await response.json()) as User[];
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function createUser(user: createUserRequest): Promise<APIResult<User>> {
  try {
    const response = await post("/users", user);
    const json = (await response.json()) as User;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
