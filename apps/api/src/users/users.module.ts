import { Module } from "@nestjs/common";
import { container } from "@repo/di";
import {
    UserCreateUseCase,
    UserGetReservationsUseCase,
} from "@repo/domain-layer";
import { UsersController } from "./users/users.controller";

@Module({
    controllers: [UsersController],
    providers: [
        {
            provide: UserCreateUseCase,
            useValue: container.get("UserCreateUseCase"),
        },
        {
            provide: UserGetReservationsUseCase,
            useValue: container.get("UserGetReservationsUseCase"),
        },
    ],
})
export class UsersModule {}
