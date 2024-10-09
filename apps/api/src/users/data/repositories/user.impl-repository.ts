import { Inject, Injectable } from "@nestjs/common";
import { User, type UserDatasource, UserRepository } from "@repo/domain-layer";

@Injectable()
export class UserImplRepository implements UserRepository {
    constructor(
        @Inject("UserDatasource")
        private readonly reservationDatasource: UserDatasource,
    ) {}

    emailExists(email: string): Promise<boolean> {
        return this.reservationDatasource.emailExists(email);
    }

    save(user: User): Promise<void> {
        return this.reservationDatasource.save(user);
    }
}
