import { User } from "../models/user.model.js";

export interface UserDatasource {
    save(user: User): void;
    emailExists(email: string): boolean;
}
