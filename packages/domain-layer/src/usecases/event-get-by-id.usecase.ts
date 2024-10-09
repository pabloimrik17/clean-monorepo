import { inject, injectable } from "inversify";
import { NotFoundException } from "../errors/not-found.exception.js";
import { Event, EventNotActiveException } from "../models/event.model.js";
import type { EventRepository } from "../repositories/event.repository.js";
import { Either } from "../types/either";

@injectable()
export class EventGetByIdUseCase {
    constructor(
        @inject("EventRepository")
        private readonly eventRepository: EventRepository,
    ) {}

    async execute(
        eventId: string,
    ): Promise<Either<NotFoundException | EventNotActiveException, Event>> {
        const event = await this.eventRepository.getById(eventId);

        if (!event) return Either.Left(new NotFoundException());
        if (!event.isActive()) {
            return Either.Left(new EventNotActiveException());
        }

        return Either.Right(event);
    }
}
