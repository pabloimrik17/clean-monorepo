import { User } from "../models/user.model.js";

export interface UserRepository {
    save(user: User): void;
    emailExists(email: string): boolean;
}
