import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import {
    ReservationBackendDto,
    ReservationBackendStateEnumDto,
    ReservationCreateBackendDto,
    ReservationUpdateBackendDto,
} from "@repo/data-layer";
import {
    Reservation,
    ReservationCancelUseCase,
    ReservationCreateUseCase,
    ReservationEditUseCase,
} from "@repo/domain-layer";

@Controller("reservations")
export class ReservationsController {
    constructor(
        private readonly reservationCancelUseCase: ReservationCancelUseCase,
        private readonly reservationCreateUseCase: ReservationCreateUseCase,
        private readonly reservationEditUseCase: ReservationEditUseCase,
    ) {}

    @Post("cancel/:reservationId/user/:userId")
    async cancel(
        @Param("reservationId") reservationId: string,
        @Param("userId") userId: string,
    ): Promise<void> {
        await this.reservationCancelUseCase.execute(reservationId, userId);
    }

    @Post()
    async create(
        @Body() createReservationDto: ReservationCreateBackendDto,
    ): Promise<ReservationBackendDto> {
        const reservation = await this.reservationCreateUseCase.execute(
            createReservationDto.user,
            createReservationDto.event,
        );

        return this.toDto(reservation);
    }

    @Put(":reservationId")
    async edit(
        @Param("reservationId") reservationId: string,
        @Body() editReservationDto: ReservationUpdateBackendDto,
    ): Promise<void> {
        await this.reservationEditUseCase.execute(
            reservationId,
            editReservationDto.user,
            editReservationDto.event,
        );
    }

    private toDto(reservation: Reservation): ReservationBackendDto {
        let state: ReservationBackendStateEnumDto;
        if (reservation.state === "active") {
            state = ReservationBackendStateEnumDto.Active;
        } else {
            state = ReservationBackendStateEnumDto.Canceled;
        }

        return {
            uuid: reservation.id,
            user: reservation.userId,
            event: reservation.eventId,
            booking_date: reservation.reservationDate.toISO() ?? "",
            current_state: state,
        };
    }
}
