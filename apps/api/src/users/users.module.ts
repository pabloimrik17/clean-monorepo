import { Module } from "@nestjs/common";
import { backendContainer } from "@repo/di";
import { UserGetReservationsUseCase } from "@repo/domain-layer";
import { UserRemoteDataSource } from "./data/datasources/user-remote.datasource";
import { UserImplRepository } from "./data/repositories/user.impl-repository";
import { UserCreateUseCase } from "./domain/usecases/user-create.usecase";
import { UsersController } from "./presentation/users.controller";

@Module({
    controllers: [UsersController],
    providers: [
        UserCreateUseCase,
        {
            provide: UserGetReservationsUseCase,
            useValue: backendContainer.get("UserGetReservationsUseCase"),
        },
        {
            provide: "UserRepository",
            useClass: UserImplRepository,
        },
        {
            provide: "UserDatasource",
            useClass: UserRemoteDataSource,
        },
        {
            provide: "HttpClient",
            useValue: backendContainer.get("HttpClient"),
        },
    ],
})
export class UsersModule {}
