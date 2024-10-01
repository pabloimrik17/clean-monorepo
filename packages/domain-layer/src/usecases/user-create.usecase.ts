import { inject, injectable } from "inversify";
import { v4 as uuidv4 } from "uuid";
import { EmailAlreadyRegisteredException, User } from "../models/user.model.js";
import type { UserRepository } from "../repositories/user.repository.js";

@injectable()
export class UserCreateUseCase {
    constructor(
        @inject("UserRepository")
        private readonly userRepository: UserRepository,
    ) {}

    async execute(
        name: string,
        email: string,
        password: string,
    ): Promise<User> {
        if (this.userRepository.emailExists(email)) {
            throw new EmailAlreadyRegisteredException();
        }

        const newUser = new User({
            id: uuidv4(),
            name,
            email,
            passwordHash: this.hash(password),
        });

        this.userRepository.save(newUser);

        return newUser;
    }

    private hash(password: string): string {
        return password.split("").reverse().join("");
    }
}
