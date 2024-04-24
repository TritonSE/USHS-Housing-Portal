import { APIResult, handleAPIError, post } from "./requests";

export type emailRequest = {
  recipient: string;
  subject: string;
  text: string;
};

export async function sendEmail(email: emailRequest): Promise<APIResult<string>> {
  try {
    const response = await post("/send-email", email);
    const json = (await response.json()) as string;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
