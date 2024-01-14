/**
 *
 * Users API
 *
 * Provides functions for Users
 *
 */

import { APIResult, get, handleAPIError } from "./requests";

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isHousingLocator: boolean;
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
