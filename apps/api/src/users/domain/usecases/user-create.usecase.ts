import { Inject, Injectable } from "@nestjs/common";
import {
    EmailAlreadyRegisteredException,
    User,
    UserRepository,
} from "@repo/domain-layer";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class UserCreateUseCase {
    constructor(
        @Inject("UserRepository")
        private readonly userRepository: UserRepository,
    ) {}

    async execute(
        name: string,
        email: string,
        password: string,
    ): Promise<User> {
        if (await this.userRepository.emailExists(email)) {
            throw new EmailAlreadyRegisteredException();
        }

        const newUser = new User({
            id: uuidv4(),
            name,
            email,
            passwordHash: this.hash(password),
        });

        await this.userRepository.save(newUser);

        return newUser;
    }

    private hash(password: string): string {
        return password.split("").reverse().join("");
    }
}
