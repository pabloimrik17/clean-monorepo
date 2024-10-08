import { Module } from "@nestjs/common";
import { container } from "@repo/di";
import { EventGetByIdUseCase } from "@repo/domain-layer";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: EventGetByIdUseCase,
            useValue: container.get("EventGetByIdUseCase"),
        },
    ],
})
export class AppModule {}
