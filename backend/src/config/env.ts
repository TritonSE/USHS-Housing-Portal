/**
 * Parses .env parameters and ensures they are of required types. If any .env parameters are
 * missing, the server will not start and an error will be thrown.
 */

import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "production", "staging"] }),
  PORT: port({ default: 8000 }),
  MONGODB_URI: str(),
  FRONTEND_ORIGIN: str(),
});
