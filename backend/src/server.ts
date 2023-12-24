/**
 * Initializes mongoose and express.
 */

import "module-alias/register";
import * as functions from "firebase-functions";
import mongoose from "mongoose";

import expressApp from "@/app";
import env from "@/config/env";

const PORT = env.PORT;
const MONGODB_URI = env.MONGODB_URI;
const ENVIRONMENT = env.NODE_ENV;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Mongoose connected!");

    if (ENVIRONMENT === "development") {
      // Run Express server in development.
      // When deployed, we don't need a server b/c Firebase handles that.
      expressApp.listen(PORT, () => {
        console.log(`Server running on port ${PORT}.`);
      });
    }
  })
  .catch(console.error);

// Set up Firebase Functions handler
export const app = functions.https.onRequest(expressApp);
