import { Module } from "@nestjs/common";
import { backendContainer } from "@repo/di";
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
            useValue: backendContainer.get("EventListAvailableUseCase"),
        },
        {
            provide: EventGetByIdUseCase,
            useValue: backendContainer.get("EventGetByIdUseCase"),
        },
    ],
})
export class EventsModule {}
