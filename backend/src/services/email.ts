import Email from "email-templates";
import createHttpError from "http-errors";
import { createTransport } from "nodemailer";

import { getRenterCandidate } from "./renter";

import env from "@/config/env";
import { Referral } from "@/models/referral";
import { UnitModel } from "@/models/units";
import { User } from "@/models/user";

const transport = createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: env.GMAILUSER,
    pass: env.GMAILPASS,
  },
  secure: true,
});

const email = new Email({
  views: { root: "src/emails" },
  message: {
    from: env.GMAILUSER,
  },
  preview: { openSimulator: false },
  transport,
});

async function sendEmail(recipient: string, template: string, locals: Record<string, string>) {
  try {
    await email.send({
      template,
      message: {
        to: recipient,
      },
      locals,
    });
  } catch (e) {
    console.error(e);
    throw createHttpError(500, `Error sending ${template} email to ${recipient}.`);
  }
}

function sendBasicGreetingEmail(recipient: User, template: string) {
  return sendEmail(recipient.email, template, { name: recipient.firstName });
}

export function sendHLPromotionEmail(recipient: User) {
  return sendBasicGreetingEmail(recipient, "promotion");
}

export function sendHLDemotionEmail(recipient: User) {
  return sendBasicGreetingEmail(recipient, "demotion");
}

function linkTo(path: string) {
  return `${env.FRONTEND_URL}/${path}`;
}

export async function sendReferralInfoEmail(referral: Referral, recipient: User, template: string) {
  const { renter } = await getRenterCandidate(referral.renterCandidate._id.toString());
  const unit = await UnitModel.findById(referral.unit);

  if (!renter || !unit) {
    throw createHttpError(500, "Error sending referral assignment email.");
  }

  return sendEmail(recipient.email, template, {
    name: recipient.firstName,
    renterName: `${renter.firstName} ${renter.lastName}`,
    renterUrl: linkTo(`candidate/${renter._id.toString()}`),
    unitAddress: unit.listingAddress,
    unitUrl: linkTo(`unit/${unit._id.toString()}`),
  });
}

export function sendReferralAssignmentEmail(referral: Referral, recipient: User) {
  return sendReferralInfoEmail(referral, recipient, "referral-assignment");
}

export function sendReferralUnitLeasedEmail(referral: Referral, recipient: User) {
  return sendReferralInfoEmail(referral, recipient, "referral-unit-leased");
}
