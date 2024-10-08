import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class UserBackendDto {
    @ApiProperty()
    uuid!: string;

    @ApiProperty()
    name!: string;

    @ApiProperty()
    email!: string;

    @ApiProperty()
    hashed_password!: string;
}

export class UserCreateBackendDto {
    @ApiProperty()
    name!: string;

    @ApiProperty()
    email!: string;

    @ApiProperty()
    hashed_password!: string;
}

export interface UserBackendGetQueryParamsDto {
    email: string;
}
