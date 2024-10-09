import { Injectable } from "@nestjs/common";
import { User, UserDatasource } from "@repo/domain-layer";
import { eq } from "drizzle-orm";
import { databaseSchema } from "../../../database/database-schema";
import { DrizzleService } from "../../../database/drizzle.service";
import { UserSaveDto } from "../dtos/user-backend.dto";

@Injectable()
export class UserRemoteDataSource implements UserDatasource {
    constructor(private readonly drizzleService: DrizzleService) {}

    async save(user: User): Promise<void> {
        const data: UserSaveDto = this.toDto(user);

        await this.drizzleService.db.insert(databaseSchema.users).values(data);
    }

    async emailExists(email: string): Promise<boolean> {
        const user = await this.drizzleService.db
            .select()
            .from(databaseSchema.users)
            .where(eq(databaseSchema.users.email, email));

        return user.length > 0;
    }

    private toDto(user: User): UserSaveDto {
        return {
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash,
        };
    }
}
