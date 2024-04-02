import { APIResult, handleAPIError, post } from "./requests";
import { Referral } from "./units";

export type createReferralRequest = {
  renterCandidateId: string;
  unitId: string;
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
