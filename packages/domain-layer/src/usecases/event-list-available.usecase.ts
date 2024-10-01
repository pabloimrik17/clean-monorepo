import { inject, injectable } from "inversify";
import type { Event } from "../models/event.model.js";
import type { EventRepository } from "../repositories/event.repository.js";

@injectable()
export class EventListAvailableUseCase {
    constructor(
        @inject("EventRepository")
        private readonly eventRepository: EventRepository,
    ) {}

    async execute(): Promise<Event[]> {
        return this.eventRepository.listActiveEvents();
    }
}
