/**
 * Initializes mongoose and express.
 */

import "module-alias/register";
import { onRequest } from "firebase-functions/v2/https";
import { HttpsError, beforeUserCreated } from "firebase-functions/v2/identity";
import mongoose from "mongoose";

import app from "@/app";
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
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}.`);
      });
    }
  })
  .catch(console.error);
// Register our express app as a Firebase Function
export const backend = onRequest({ region: "us-west1" }, app);

export const beforecreated = beforeUserCreated((event) => {
  const user = event.data;
  if (ENVIRONMENT === "production" && !user.email?.includes("@unionstationhs.org")) {
    throw new HttpsError("invalid-argument", "Unauthorized email");
  }
});
