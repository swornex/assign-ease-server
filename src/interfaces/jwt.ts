import { JwtPayload } from "jsonwebtoken";
import { IGetUser } from "./users";

export interface IJwtPayload extends JwtPayload {
  data: Omit<IGetUser, "password">;
}
