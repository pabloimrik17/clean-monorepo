import { inject, injectable } from "inversify";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import { EventNotActiveException } from "../models/event.model.js";
import { Reservation } from "../models/reservation.model.js";
import type { EventRepository } from "../repositories/event.repository.js";
import type { ReservationRepository } from "../repositories/reservation.repository.js";

@injectable()
export class ReservationCreateUseCase {
    constructor(
        @inject("EventRepository")
        private readonly eventRepository: EventRepository,
        @inject("ReservationRepository")
        private readonly reservationRepository: ReservationRepository,
    ) {}

    async execute(userId: string, eventId: string): Promise<Reservation> {
        const event = await this.eventRepository.getById(eventId);

        if (!event) {
            throw new EventNotActiveException();
        }

        const updatedEvent = event.decreaseCapacity();
        await this.eventRepository.update(updatedEvent);

        const newReservation = new Reservation({
            id: uuidv4(),
            userId,
            eventId,
            reservationDate: DateTime.now(),
            state: "active",
        });

        await this.reservationRepository.save(newReservation);

        return newReservation;
    }
}
