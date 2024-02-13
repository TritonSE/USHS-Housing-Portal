import { APIResult, handleAPIError } from "./requests";

export type FilterParams = {
  search?: string | undefined;
  availability: number;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  beds?: number;
  baths?: number;
  approved?: boolean;
  sort: number;
};

export function getUnits(params: FilterParams): Promise<APIResult<Unit[]>> {
  try {
    const query = new URLSearchParams(params);

    const keysForDel: string[] = [];
    query.forEach((value, key) => {
      if (value === "" || value === null || value === "undefined") {
        keysForDel.push(key);
      }
    });

    keysForDel.forEach((key) => {
      query.delete(key);
    });

    console.log(query.toString());
  } catch (error) {
    return handleAPIError(error);
  }
}
