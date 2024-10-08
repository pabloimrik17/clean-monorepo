import { type HttpClient, User, UserDatasource } from "@repo/domain-layer";
import { inject, injectable } from "inversify";
import {
    UserFrontendDto,
    UserFrontendGetQueryParamsDto,
} from "../dtos/user-frontend.dto";

@injectable()
export class UserRemoteDataSource implements UserDatasource {
    constructor(
        @inject("HttpClient")
        private readonly httpClient: HttpClient,
    ) {}

    async save(user: User): Promise<void> {
        const body: UserFrontendDto = this.toDto(user);

        await this.httpClient.put<void, UserFrontendDto>(
            `/user/${user.id}`,
            body,
        );
    }

    async emailExists(email: string): Promise<boolean> {
        const query: UserFrontendGetQueryParamsDto = {
            email,
        };

        const userDto = await this.httpClient.get<UserFrontendDto>(
            "/user",
            query,
        );

        return userDto !== null;
    }

    private toDomain(userDto: UserFrontendDto): null | User {
        return new User({
            id: userDto.uuid,
            name: userDto.name,
            email: userDto.email,
            passwordHash: userDto.hashed_password,
        });
    }

    private toDto(user: User): UserFrontendDto {
        return {
            uuid: user.id,
            name: user.name,
            email: user.email,
            hashed_password: user.passwordHash,
        };
    }
}
