import { inject, injectable } from "inversify";
import { type ReservationRepository } from "../repositories/reservation.repository.js";
import { domainTypes } from "@repo/di";

@injectable()
export class ReservationCreateUseCase {
    constructor(@inject(domainTypes.reservationRepository) private readonly reservationRepository: ReservationRepository) {
    }
}
