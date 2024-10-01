import { User } from "../models/user.model.js";

export interface UserRepository {
    save(user: User): Promise<void>;
    emailExists(email: string): Promise<boolean>;
}
