import { type HttpClient, User, UserDatasource } from "@repo/domain-layer";
import { inject, injectable } from "inversify";
import { GetUserQueryParamsDto, UserDto } from "../dtos/user.dto.js";

@injectable()
export class UserRemoteDataSource implements UserDatasource {
    constructor(
        @inject("HttpClient")
        private readonly httpClient: HttpClient,
    ) {}

    async save(user: User): Promise<void> {
        const body: UserDto = this.toDto(user);

        await this.httpClient.put<void, UserDto>(`/user/${user.id}`, body);
    }

    async emailExists(email: string): Promise<boolean> {
        const query: GetUserQueryParamsDto = {
            email,
        };

        const userDto = await this.httpClient.get<UserDto>("/user", query);

        return userDto !== null;
    }

    private toDomain(userDto: UserDto): null | User {
        return new User({
            id: userDto.uuid,
            name: userDto.name,
            email: userDto.email,
            passwordHash: userDto.hashed_password,
        });
    }

    private toDto(user: User): UserDto {
        return {
            uuid: user.id,
            name: user.name,
            email: user.email,
            hashed_password: user.passwordHash,
        };
    }
}
