import { type HttpClient, User, UserDatasource } from "@repo/domain-layer";
import { inject, injectable } from "inversify";
import { UserApiDto, UserApiGetQueryParamsDto } from "../dtos/user-api.dto";

@injectable()
export class UserRemoteDataSource implements UserDatasource {
    constructor(
        @inject("HttpClient")
        private readonly httpClient: HttpClient,
    ) {}

    async save(user: User): Promise<void> {
        const body: UserApiDto = this.toDto(user);

        await this.httpClient.put<void, UserApiDto>(`/user/${user.id}`, body);
    }

    async emailExists(email: string): Promise<boolean> {
        const query: UserApiGetQueryParamsDto = {
            email,
        };

        const userDto = await this.httpClient.get<UserApiDto>("/user", query);

        return userDto !== null;
    }

    private toDomain(userDto: UserApiDto): null | User {
        return new User({
            id: userDto.uuid,
            name: userDto.name,
            email: userDto.email,
            passwordHash: userDto.hashed_password,
        });
    }

    private toDto(user: User): UserApiDto {
        return {
            uuid: user.id,
            name: user.name,
            email: user.email,
            hashed_password: user.passwordHash,
        };
    }
}
