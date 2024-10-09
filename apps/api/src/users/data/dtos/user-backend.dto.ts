import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { databaseSchema } from "../../../database/database-schema";

export class UserResponseDto {
    @ApiProperty()
    uuid!: string;

    @ApiProperty()
    name!: string;

    @ApiProperty()
    email!: string;

    @ApiProperty()
    hashed_password!: string;
}

export class UserCreateInputDto {
    @ApiProperty()
    name!: string;

    @ApiProperty()
    email!: string;

    @ApiProperty()
    hashed_password!: string;
}

export type UserGetDto = typeof databaseSchema.users.$inferSelect;
export type UserSaveDto = typeof databaseSchema.users.$inferInsert;
