import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { z } from "zod";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: (value) =>
                z
                    .object({
                        DATABASE_HOST: z.string(),
                        DATABASE_PORT: z.string(),
                        DATABASE_USER: z.string(),
                        DATABASE_PASSWORD: z.string(),
                        DATABASE_DB: z.string(),
                    })
                    .parse(value),
        }),
        DatabaseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                host: configService.get("DATABASE_HOST") ?? "",
                port: Number(configService.get("DATABASE_PORT") ?? ""),
                user: configService.get("DATABASE_USER") ?? "",
                password: configService.get("DATABASE_PASSWORD") ?? "",
                database: configService.get("DATABASE_DB") ?? "",
            }),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
