import { Controller, Get, Param } from "@nestjs/common";
import {
    Event,
    EventGetByIdUseCase,
    EventListAvailableUseCase,
} from "@repo/domain-layer";

@Controller("events")
export class EventsController {
    constructor(
        private readonly eventGetByIdUseCase: EventGetByIdUseCase,
        private readonly eventListAvailableUseCase: EventListAvailableUseCase,
    ) {}

    @Get("active/list")
    async listActiveEvents(): Promise<Event[]> {
        return this.eventListAvailableUseCase.execute();
    }

    @Get(":id")
    async getById(@Param("id") id: string): Promise<Event> {
        return this.eventGetByIdUseCase.execute(id);
    }
}
