import { User } from "@/models/user";

declare global {
  namespace Express {
    interface Request {
      currentUser: User;
    }
  }
}
