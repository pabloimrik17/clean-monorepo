import { Module } from "@nestjs/common";
import { backendContainer } from "@repo/di";
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
            useValue: backendContainer.get("UserCreateUseCase"),
        },
        {
            provide: UserGetReservationsUseCase,
            useValue: backendContainer.get("UserGetReservationsUseCase"),
        },
    ],
})
export class UsersModule {}
