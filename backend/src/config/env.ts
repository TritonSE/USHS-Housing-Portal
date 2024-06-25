/**
 * Parses .env parameters and ensures they are of required types. If any .env parameters are
 * missing, the server will not start and an error will be thrown.
 */

import { cleanEnv } from "envalid";
import { str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "production", "staging"] }),
  PORT: str({ default: "8000" }),
  MONGODB_URI: str(),
  FRONTEND_ORIGIN: str(),
  FRONTEND_URL: str(),
  GMAILUSER: str(),
  GMAILPASS: str(),
  LANDLORD_FORM_PASSWORD: str(),
});
