import { User, type UserDatasource, UserRepository } from "@repo/domain-layer";
import { inject, injectable } from "inversify";

@injectable()
export class UserImplRepository implements UserRepository {
    constructor(
        @inject("UserDatasource")
        private readonly reservationDatasource: UserDatasource,
    ) {}

    emailExists(email: string): Promise<boolean> {
        return this.reservationDatasource.emailExists(email);
    }

    save(user: User): Promise<void> {
        return this.reservationDatasource.save(user);
    }
}
