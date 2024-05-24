import { APIResult, deleteRequest, handleAPIError, post, put } from "./requests";
import { Referral } from "./units";

export type CreateReferralRequest = {
  renterCandidateId: string;
  unit: string;
};

export type UpdateReferralRequest = {
  id: string;
  housingLocator: string;
  referringStaff: string;
  status: string;
};

export async function createReferral(
  referral: CreateReferralRequest,
): Promise<APIResult<Referral>> {
  try {
    const response = await post("/referrals", referral);
    const json = (await response.json()) as Referral;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function updateReferral(
  request: Partial<UpdateReferralRequest>,
): Promise<APIResult<Referral>> {
  try {
    const response = await put(`/referrals/${request.id}`, request);
    const json = (await response.json()) as Referral;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function deleteReferral(id: string): Promise<APIResult<Referral>> {
  try {
    const response = await deleteRequest(`/referrals/${id}`);
    const json = (await response.json()) as Referral;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
