import {
    Event,
    type EventDatasource,
    EventStateEnum,
    type HttpClient,
} from "@repo/domain-layer";
import { inject, injectable } from "inversify";
import { DateTime } from "luxon";
import {
    EventFrontendDto,
    EventFrontendStateEnumDto,
} from "../dtos/event-frontend.dto";

@injectable()
export class EventRemoteDatasource implements EventDatasource {
    constructor(
        @inject("HttpClient")
        private readonly httpClient: HttpClient,
    ) {}

    async getById(id: string): Promise<null | Event> {
        const maybeEventDto = await this.httpClient.get<EventFrontendDto>(
            `/events/${id}`,
        );
        if (!maybeEventDto) {
            return null;
        }

        return this.toDomain(maybeEventDto);
    }

    async listActiveEvents(): Promise<Event[]> {
        const maybeEventDtos =
            await this.httpClient.get<EventFrontendDto[]>("/events/active");
        if (!maybeEventDtos) {
            return [];
        }

        return maybeEventDtos
            .map(this.toDomain)
            .filter((event) => event !== null);
    }

    async update(event: Event): Promise<void> {
        const body: EventFrontendDto = this.toDto(event);

        await this.httpClient.put<void, EventFrontendDto>(
            `/events/${event.id}`,
            body,
        );
    }

    private toDomain(eventDto: EventFrontendDto): null | Event {
        let state: EventStateEnum | null = null;
        if (eventDto.current_state === EventFrontendStateEnumDto.Active) {
            state = "active";
        } else if (
            eventDto.current_state === EventFrontendStateEnumDto.Canceled
        ) {
            state = "cancelled";
        } else if (
            eventDto.current_state === EventFrontendStateEnumDto.Finished
        ) {
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

    private toDto(event: Event): EventFrontendDto {
        let currentState: EventFrontendStateEnumDto | null = null;
        if (event.state === "active") {
            currentState = EventFrontendStateEnumDto.Active;
        } else if (event.state === "cancelled") {
            currentState = EventFrontendStateEnumDto.Canceled;
        } else if (event.state === "finished") {
            currentState = EventFrontendStateEnumDto.Finished;
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
