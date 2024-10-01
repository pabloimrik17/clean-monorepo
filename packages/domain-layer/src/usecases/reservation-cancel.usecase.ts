import { inject, injectable } from "inversify";
import { EventNotActiveException } from "../models/event.model.js";
import { UnauthorizedAccessException } from "../models/user.model.js";
import type { EventRepository } from "../repositories/event.repository.js";
import type { ReservationRepository } from "../repositories/reservation.repository.js";

@injectable()
export class ReservationCancelUseCase {
    constructor(
        @inject("EventRepository")
        private readonly eventRepository: EventRepository,
        @inject("ReservationRepository")
        private readonly reservationRepository: ReservationRepository,
    ) {}

    async execute(reservationId: string, userId: string): Promise<void> {
        const reservation =
            await this.reservationRepository.getById(reservationId);

        if (!reservation) throw new UnauthorizedAccessException();
        if (reservation.userId !== userId) {
            throw new UnauthorizedAccessException();
        }

        const canceledReservation = reservation.cancel();
        await this.reservationRepository.update(canceledReservation);

        const event = await this.eventRepository.getById(
            canceledReservation.eventId,
        );
        if (!event) throw new EventNotActiveException();

        const updatedEvent = event.increaseCapacity();
        await this.eventRepository.update(updatedEvent);
    }
}
