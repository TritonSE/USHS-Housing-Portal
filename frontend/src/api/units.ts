import { APIResult, get, handleAPIError } from "./requests";

export type FilterParams = {
  search?: string | undefined,
  availability: string,
  minPrice?: number,
  maxPrice?: number,
  beds?: number,
  baths?: number,
  approved?: boolean,
  sort: string
};

export async function getUnits(params: FilterParams): Promise<APIResult<Unit[]>> {
  try {
    console.log(params);
    const query = new URLSearchParams(params);

    let keysForDel = [];
    query.forEach((value, key) => {
      if (value === '' || value === null || value === undefined) {
        keysForDel.push(key);
      }
    });

    keysForDel.forEach(key => {
      query.delete(key);
    });

    console.log(query.toString());
  } catch (error) {
    return handleAPIError(error);
  }
}
