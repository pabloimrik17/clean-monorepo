import {
    type HttpClient,
    Reservation,
    ReservationDatasource,
    ReservationState,
} from "@repo/domain-layer";
import { inject, injectable } from "inversify";
import { DateTime } from "luxon";
import {
    ReservationApiDto,
    ReservationApiStateEnumDto,
} from "../dtos/reservation-api.dto";

@injectable()
export class ReservationRemoteDatasource implements ReservationDatasource {
    constructor(
        @inject("HttpClient")
        private readonly httpClient: HttpClient,
    ) {}

    async getById(id: string): Promise<null | Reservation> {
        const maybeReservationDto =
            await this.httpClient.get<ReservationApiDto>(`/reservation/${id}`);

        if (!maybeReservationDto) {
            return null;
        }

        return this.toDomain(maybeReservationDto);
    }

    async listByUser(userId: string): Promise<Reservation[]> {
        const maybeReservationsDto = await this.httpClient.get<
            ReservationApiDto[]
        >(`/reservation/user/${userId}`);
        if (!maybeReservationsDto) return [];

        return maybeReservationsDto
            .map(this.toDomain)
            .filter((event) => event !== null);
    }

    async save(reservation: Reservation): Promise<void> {
        const body: ReservationApiDto = this.toDto(reservation);

        await this.httpClient.put<void, ReservationApiDto>(
            `/reservation/${reservation.id}`,
            body,
        );
    }

    async update(reservation: Reservation): Promise<void> {
        const body: ReservationApiDto = this.toDto(reservation);

        await this.httpClient.put<void, ReservationApiDto>(
            `/reservation/${reservation.id}`,
            body,
        );
    }

    private toDomain(reservationDto: ReservationApiDto): null | Reservation {
        let state: ReservationState | null = null;
        if (
            reservationDto.current_state === ReservationApiStateEnumDto.Active
        ) {
            state = "active";
        } else if (
            reservationDto.current_state === ReservationApiStateEnumDto.Canceled
        ) {
            state = "canceled";
        }

        if (!state) return null;

        return new Reservation({
            id: reservationDto.uuid,
            userId: reservationDto.user,
            eventId: reservationDto.event,
            reservationDate: DateTime.fromISO(reservationDto.booking_date),
            state,
        });
    }

    private toDto(reservation: Reservation): ReservationApiDto {
        let currentState: ReservationApiStateEnumDto | null = null;
        if (reservation.state === "active") {
            currentState = ReservationApiStateEnumDto.Active;
        } else if (reservation.state === "canceled") {
            currentState = ReservationApiStateEnumDto.Canceled;
        }

        if (!currentState) throw new Error("Invalid reservation state");

        const date = reservation.reservationDate.toISO();
        if (!date) throw new Error("Invalid date");

        return {
            uuid: reservation.id,
            event: reservation.eventId,
            user: reservation.userId,
            booking_date: date,
            current_state: currentState,
        };
    }
}
