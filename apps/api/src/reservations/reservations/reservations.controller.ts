import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import {
    Reservation,
    ReservationCancelUseCase,
    ReservationCreateUseCase,
    ReservationEditUseCase,
} from "@repo/domain-layer";
import {
    ReservationBackendDto,
    ReservationBackendStateEnumDto,
    ReservationCreateBackendDto,
    ReservationUpdateBackendDto,
} from "../../users/data/dtos/reservation-backend.dto";

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

    @ApiResponse({
        status: 201,
        description: "The reservation has been successfully created.",
        type: ReservationBackendDto,
    })
    @Post()
    async create(
        @Body() reservationCreateBackendDto: ReservationCreateBackendDto,
    ): Promise<ReservationBackendDto> {
        const reservation = await this.reservationCreateUseCase.execute(
            reservationCreateBackendDto.user,
            reservationCreateBackendDto.event,
        );

        return this.toDto(reservation);
    }

    @Put(":reservationId")
    async edit(
        @Param("reservationId") reservationId: string,
        @Body() reservationUpdateBackendDto: ReservationUpdateBackendDto,
    ): Promise<void> {
        await this.reservationEditUseCase.execute(
            reservationId,
            reservationUpdateBackendDto.user,
            reservationUpdateBackendDto.event,
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
