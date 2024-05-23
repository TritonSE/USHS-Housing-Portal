import { APIResult, handleAPIError, post, put } from "./requests";
import { Referral } from "./units";

export type createReferralRequest = {
  renterCandidateId: string;
  unitId: string;
};

export type updateReferralRequest = {
  id: string;
  housingLocator: string;
  referringStaff: string;
  status: string;
};

export async function createReferral(
  referral: createReferralRequest,
): Promise<APIResult<Referral>> {
  try {
    const response = await post("/referrals", referral);
    const json = (await response.json()) as Referral;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function updateReferral(request: updateReferralRequest): Promise<APIResult<Referral>> {
  try {
    const response = await put(`/referrals/${request.id}`, request);
    const json = (await response.json()) as Referral;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
