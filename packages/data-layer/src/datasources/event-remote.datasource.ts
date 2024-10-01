import {
    Event,
    type EventDatasource,
    EventStateEnum,
    type HttpClient,
} from "@repo/domain-layer";
import { inject, injectable } from "inversify";
import { DateTime } from "luxon";
import { EventDto, EventStateEnumDto } from "../dtos/event.dto.js";

@injectable()
export class EventRemoteDatasource implements EventDatasource {
    constructor(
        @inject("HttpClient")
        private readonly httpClient: HttpClient,
    ) {}

    async getById(id: string): Promise<null | Event> {
        const maybeEventDto = await this.httpClient.get<EventDto>(
            `/events/${id}`,
        );
        if (!maybeEventDto) {
            return null;
        }

        return this.toDomain(maybeEventDto);
    }

    async listActiveEvents(): Promise<Event[]> {
        const maybeEventDtos =
            await this.httpClient.get<EventDto[]>("/events/active");
        if (!maybeEventDtos) {
            return [];
        }

        return maybeEventDtos
            .map(this.toDomain)
            .filter((event) => event !== null);
    }

    async update(event: Event): Promise<void> {
        const body: EventDto = this.toDto(event);

        await this.httpClient.put<void, EventDto>(`/events/${event.id}`, body);
    }

    private toDomain(eventDto: EventDto): null | Event {
        let state: EventStateEnum | null = null;
        if (eventDto.current_state === EventStateEnumDto.Active) {
            state = "active";
        } else if (eventDto.current_state === EventStateEnumDto.Canceled) {
            state = "cancelled";
        } else if (eventDto.current_state === EventStateEnumDto.Finished) {
            state = "finished";
        }

        if (!state) return null;

        return new Event({
            id: eventDto.uuid,
            name: eventDto.name,
            description: eventDto.short_description,
            date: DateTime.fromISO(eventDto.date),
            location: eventDto.city,
            totalCapacity: eventDto.capacity.total,
            availableCapacity: eventDto.capacity.available,
            state,
        });
    }

    private toDto(event: Event): EventDto {
        let currentState: EventStateEnumDto | null = null;
        if (event.state === "active") {
            currentState = EventStateEnumDto.Active;
        } else if (event.state === "cancelled") {
            currentState = EventStateEnumDto.Canceled;
        } else if (event.state === "finished") {
            currentState = EventStateEnumDto.Finished;
        }

        if (!currentState) throw new Error("Invalid event state");

        const date = event.date.toISO();
        if (!date) throw new Error("Invalid date");

        return {
            uuid: event.id,
            name: event.name,
            short_description: event.description,
            date,
            city: event.location,
            capacity: {
                total: event.totalCapacity,
                available: event.availableCapacity,
            },
            current_state: currentState,
        };
    }
}
