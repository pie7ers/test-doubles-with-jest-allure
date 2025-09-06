import { IUser } from "../models/user";
import { users } from "../data/users";
import { omitAttributes } from "../../utils/objects";

export interface IAuthService {
  login(username: string, password: string): IUser | null;
}

export class AuthService implements IAuthService {

  login(username: string, password: string): IUser | null {
    const user = users.find(u => u.username === username && u.password === password);
    const baseUser = omitAttributes(user, ["password"]);
    return baseUser || null;
  }
}
