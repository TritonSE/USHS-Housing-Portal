import { APIResult, get, handleAPIError, post } from "./requests";

export type RenterCandidate = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  program?: string;
};

export type createRenterCandidateRequest = {
  firstName: string;
  lastName: string;
  contactInfo: string;
  program?: string;
};

export async function getRenterCandidates(): Promise<APIResult<RenterCandidate[]>> {
  try {
    const response = await get("/renter-candidates");
    const json = (await response.json()) as RenterCandidate[];
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function createRenterCandidate(
  renter: createRenterCandidateRequest,
): Promise<APIResult<RenterCandidate>> {
  try {
    const response = await post("/renter-candidates", renter);
    const json = (await response.json()) as RenterCandidate;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
