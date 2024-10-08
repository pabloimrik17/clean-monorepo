import { Module } from "@nestjs/common";
import { container } from "@repo/di";
import { EventGetByIdUseCase } from "@repo/domain-layer";
import { EventsController } from "./events/events.controller";

@Module({
    controllers: [EventsController],
    providers: [
        {
            provide: EventGetByIdUseCase,
            useValue: container.get("EventGetByIdUseCase"),
        },
    ],
})
export class EventsModule {}
