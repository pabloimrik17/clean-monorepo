import { inject, injectable } from "inversify";
import { Reservation } from "../models/reservation.model.js";
import type { ReservationRepository } from "../repositories/reservation.repository.js";

@injectable()
export class UserGetReservationsUseCase {
    constructor(
        @inject("ReservationRepository")
        private readonly reservationRepository: ReservationRepository,
    ) {}

    async execute(userId: string): Promise<Reservation[]> {
        return this.reservationRepository.listByUser(userId);
    }
}
