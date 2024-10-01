import { Reservation } from "../models/reservation.model.js";

export interface ReservationDatasource {
    save: (reservation: Reservation) => Promise<void>;
    update: (reservation: Reservation) => Promise<void>;
    getById: (id: string) => Promise<null | Reservation>;
    listByUser: (userId: string) => Promise<Reservation[]>;
}
