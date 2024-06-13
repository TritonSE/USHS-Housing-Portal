/**
 *
 * Users API
 *
 * Provides functions for Users
 *
 */

import { APIResult, get, handleAPIError, post, put } from "./requests";
import { Referral } from "./units";

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isHousingLocator: boolean;
  createdAt: string;
  updatedAt: string;
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

export async function elevateUser(user: User): Promise<APIResult<User>> {
  try {
    const response = await put(`/users/${user._id}/elevate`, user);
    const json = (await response.json()) as User;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function demoteUser(user: User): Promise<APIResult<User>> {
  try {
    const response = await put(`/users/${user._id}/demote`, user);
    const json = (await response.json()) as User;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function getReferralsForUser(user: User): Promise<APIResult<Referral[]>> {
  try {
    const response = await get(`/users/${user._id}/referrals`);
    const json = (await response.json()) as Referral[];
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
