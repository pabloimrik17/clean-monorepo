import {
    Event,
    type EventDatasource,
    EventStateEnum,
    type HttpClient,
} from "@repo/domain-layer";
import { inject, injectable } from "inversify";
import { DateTime } from "luxon";
import { EventApiDto, EventApiStateEnumDto } from "../dtos/event-api.dto";

@injectable()
export class EventRemoteDatasource implements EventDatasource {
    constructor(
        @inject("HttpClient")
        private readonly httpClient: HttpClient,
    ) {}

    async getById(id: string): Promise<null | Event> {
        const maybeEventDto = await this.httpClient.get<EventApiDto>(
            `/events/${id}`,
        );
        if (!maybeEventDto) {
            return null;
        }

        return this.toDomain(maybeEventDto);
    }

    async listActiveEvents(): Promise<Event[]> {
        const maybeEventDtos =
            await this.httpClient.get<EventApiDto[]>("/events/active");
        if (!maybeEventDtos) {
            return [];
        }

        return maybeEventDtos
            .map(this.toDomain)
            .filter((event) => event !== null);
    }

    async update(event: Event): Promise<void> {
        const body: EventApiDto = this.toDto(event);

        await this.httpClient.put<void, EventApiDto>(
            `/events/${event.id}`,
            body,
        );
    }

    private toDomain(eventDto: EventApiDto): null | Event {
        let state: EventStateEnum | null = null;
        if (eventDto.current_state === EventApiStateEnumDto.Active) {
            state = "active";
        } else if (eventDto.current_state === EventApiStateEnumDto.Canceled) {
            state = "cancelled";
        } else if (eventDto.current_state === EventApiStateEnumDto.Finished) {
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

    private toDto(event: Event): EventApiDto {
        let currentState: EventApiStateEnumDto | null = null;
        if (event.state === "active") {
            currentState = EventApiStateEnumDto.Active;
        } else if (event.state === "cancelled") {
            currentState = EventApiStateEnumDto.Canceled;
        } else if (event.state === "finished") {
            currentState = EventApiStateEnumDto.Finished;
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
