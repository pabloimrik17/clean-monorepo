import { inject, injectable } from "inversify";
import { Event, EventNotActiveException } from "../models/event.model.js";
import type { EventRepository } from "../repositories/event.repository.js";

@injectable()
export class EventGetByIdUseCase {
    constructor(
        @inject("EventRepository")
        private readonly eventRepository: EventRepository,
    ) {}

    async execute(eventId: string): Promise<Event> {
        const event = await this.eventRepository.getById(eventId);
        if (!event.isActive()) {
            throw new EventNotActiveException();
        }

        return event;
    }
}
