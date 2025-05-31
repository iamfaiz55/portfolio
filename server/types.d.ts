// types.d.ts
import { IUserProtected } from "./path-to-your-protectedRoute-file";

declare global {
  namespace Express {
    interface Request {
      user?: IUserProtected;
    }
  }
}
