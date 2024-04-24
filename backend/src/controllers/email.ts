import { RequestHandler } from "express";

import { asyncHandler } from "./wrappers";

import { sendEmail } from "@/services/email";

type SendEmailRequestBody = {
  recipient: string;
  subject: string;
  text: string;
};

export const sendEmailHandler: RequestHandler = asyncHandler(async (req, res, _) => {
  const { recipient, subject, text } = req.body as SendEmailRequestBody;

  const response = await sendEmail(recipient, subject, text);

  if (response !== null) {
    res.status(200).json(response);
  } else {
    res.status(400).send("Email Unsuccessful");
  }
});
