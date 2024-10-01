import { inject, injectable } from "inversify";
import {
    EventNotActiveException,
    ReservationCancelledException,
} from "../models/event.model.js";
import { Reservation } from "../models/reservation.model.js";
import { UnauthorizedAccessException } from "../models/user.model.js";
import type { EventRepository } from "../repositories/event.repository.js";
import type { ReservationRepository } from "../repositories/reservation.repository.js";

@injectable()
export class ReservationEditUseCase {
    constructor(
        @inject("EventRepository")
        private readonly eventRepository: EventRepository,
        @inject("ReservationRepository")
        private readonly reservationRepository: ReservationRepository,
    ) {}

    async execute(
        reservationId: string,
        userId: string,
        newEventId: string,
    ): Promise<void> {
        const reservation =
            await this.reservationRepository.getById(reservationId);
        if (reservation.userId !== userId) {
            throw new UnauthorizedAccessException();
        }

        if (reservation.state === "canceled") {
            throw new ReservationCancelledException();
        }

        const currentEvent = await this.eventRepository.getById(newEventId);
        const updatatedCurrentEvent = currentEvent.increaseCapacity();
        await this.eventRepository.update(updatatedCurrentEvent);

        const newEvent = await this.eventRepository.getById(newEventId);
        if (!newEvent.isActive()) {
            throw new EventNotActiveException();
        }

        const updatedNewEvent = newEvent.decreaseCapacity();
        await this.eventRepository.update(updatedNewEvent);

        const updatedReservation = new Reservation({
            id: reservation.id,
            userId: reservation.userId,
            eventId: newEventId,
            state: reservation.state,
            reservationDate: reservation.reservationDate,
        });

        await this.reservationRepository.update(updatedReservation);
    }
}
