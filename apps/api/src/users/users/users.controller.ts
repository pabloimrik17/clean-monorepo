import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import {
    ReservationBackendDto,
    ReservationBackendStateEnumDto,
    UserCreateBackendDto,
} from "@repo/data-layer";
import {
    Reservation,
    UserCreateUseCase,
    UserGetReservationsUseCase,
} from "@repo/domain-layer";

@Controller("users")
export class UsersController {
    constructor(
        private readonly userCreateUseCase: UserCreateUseCase,
        private readonly userGetReservationsUseCase: UserGetReservationsUseCase,
    ) {}

    @Post()
    async create(@Body() userCreateDto: UserCreateBackendDto): Promise<void> {
        await this.userCreateUseCase.execute(
            userCreateDto.name,
            userCreateDto.email,
            userCreateDto.hashed_password,
        );
    }

    @Get(":id/reservations")
    async getReservations(
        @Param("id") id: string,
    ): Promise<ReservationBackendDto[]> {
        const reservations = await this.userGetReservationsUseCase.execute(id);

        return reservations.map(this.toReservationDto);
    }

    private toReservationDto(reservation: Reservation): ReservationBackendDto {
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
