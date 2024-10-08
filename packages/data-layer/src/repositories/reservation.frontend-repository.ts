import {
    Reservation,
    type ReservationDatasource,
    ReservationRepository,
} from "@repo/domain-layer";
import { inject, injectable } from "inversify";

@injectable()
export class ReservationFrontendRepository implements ReservationRepository {
    constructor(
        @inject("ReservationDatasource")
        private readonly reservationDatasource: ReservationDatasource,
    ) {}

    getById(id: string): Promise<null | Reservation> {
        return this.reservationDatasource.getById(id);
    }

    listByUser(userId: string): Promise<Reservation[]> {
        return this.reservationDatasource.listByUser(userId);
    }

    save(reservation: Reservation): Promise<void> {
        return this.reservationDatasource.save(reservation);
    }

    update(reservation: Reservation): Promise<void> {
        return this.reservationDatasource.update(reservation);
    }
}
