import { IGetUser } from "../../src/interfaces/users";

declare module "express-serve-static-core" {
  interface Request {
    user?: Omit<IGetUser, "password">;
  }
}
