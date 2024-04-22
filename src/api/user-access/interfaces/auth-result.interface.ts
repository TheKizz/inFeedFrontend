import { UserModel } from "../entities/user.entity";

export interface IAuthResult {
  user: UserModel;
  token: string;
}
