import { Module } from "@nestjs/common";
import { container } from "@repo/di";
import {
    EventGetByIdUseCase,
    EventListAvailableUseCase,
} from "@repo/domain-layer";
import { EventsController } from "./events/events.controller";

@Module({
    controllers: [EventsController],
    providers: [
        {
            provide: EventListAvailableUseCase,
            useValue: container.get("EventListAvailableUseCase"),
        },
        {
            provide: EventGetByIdUseCase,
            useValue: container.get("EventGetByIdUseCase"),
        },
    ],
})
export class EventsModule {}
