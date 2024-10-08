import { ConfigService } from "@nestjs/config";
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const configService = new ConfigService();

export default defineConfig({
    schema: "./src/database/database-schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        host: configService.get("DATABASE_HOST") ?? "",
        port: Number(configService.get("DATABASE_PORT") ?? ""),
        user: configService.get("DATABASE_USER") ?? "",
        password: configService.get("DATABASE_PASSWORD") ?? "",
        database: configService.get("DATABASE_DB") ?? "",
    },
});
