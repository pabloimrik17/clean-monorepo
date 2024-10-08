import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import {
    ReservationCreateApiDto,
    ReservationUpdateApiDto,
} from "@repo/data-layer";
import {
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
        @Body() createReservationDto: ReservationCreateApiDto,
    ): Promise<void> {
        await this.reservationCreateUseCase.execute(
            createReservationDto.user,
            createReservationDto.event,
        );
    }

    @Put(":reservationId")
    async edit(
        @Param("reservationId") reservationId: string,
        @Body() editReservationDto: ReservationUpdateApiDto,
    ): Promise<void> {
        await this.reservationEditUseCase.execute(
            reservationId,
            editReservationDto.user,
            editReservationDto.event,
        );
    }
}
