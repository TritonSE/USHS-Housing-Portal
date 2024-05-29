import { APIResult, get, handleAPIError, post } from "./requests";

export type RenterCandidate = {
  _id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  uid: string;
  program: string;
  adults: number;
  children: number;
  createdAt: string;
  updatedAt: string;
};

export type createRenterCandidateRequest = {
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  uid: string;
  program: string;
  adults: number;
  children: number;
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

export async function getRenterCandidate(id: string): Promise<APIResult<RenterCandidate>> {
  try {
    const response = await get(`/renter-candidates/${id}`);
    const json = (await response.json()) as RenterCandidate;
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
