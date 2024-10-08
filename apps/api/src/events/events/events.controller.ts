import { Controller, Get, Param } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { EventBackendDto, EventBackendStateEnumDto } from "@repo/data-layer";
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

    @ApiResponse({
        status: 200,
        description: "List of active events.",
        type: [EventBackendDto],
    })
    @Get("active/list")
    async listActiveEvents(): Promise<EventBackendDto[]> {
        const activeEvents = await this.eventListAvailableUseCase.execute();

        return activeEvents.map(this.toDto);
    }

    @ApiResponse({
        status: 200,
        description: "The event with the given ID.",
        type: EventBackendDto,
    })
    @Get(":id")
    async getById(@Param("id") id: string): Promise<EventBackendDto> {
        const event = await this.eventGetByIdUseCase.execute(id);

        return this.toDto(event);
    }

    private toDto(event: Event): EventBackendDto {
        let state: EventBackendStateEnumDto;
        if (event.state === "active") {
            state = EventBackendStateEnumDto.Active;
        } else if (event.state === "cancelled") {
            state = EventBackendStateEnumDto.Canceled;
        } else {
            state = EventBackendStateEnumDto.Finished;
        }

        return {
            uuid: event.id,
            name: event.name,
            short_description: event.description,
            date: event.date.toISO() ?? "",
            city: event.location,
            capacity: {
                total: event.totalCapacity,
                available: event.availableCapacity,
            },
            current_state: state,
        };
    }
}
