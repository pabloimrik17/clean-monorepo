import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import {
    ReservationBackendDto,
    ReservationBackendStateEnumDto,
    UserBackendDto,
    UserCreateBackendDto,
} from "@repo/data-layer";
import {
    Reservation,
    User,
    UserCreateUseCase,
    UserGetReservationsUseCase,
} from "@repo/domain-layer";

@Controller("users")
export class UsersController {
    constructor(
        private readonly userCreateUseCase: UserCreateUseCase,
        private readonly userGetReservationsUseCase: UserGetReservationsUseCase,
    ) {}

    @ApiResponse({
        status: 201,
        description: "The user has been successfully created.",
        type: UserBackendDto,
    })
    @Post()
    async create(
        @Body() userCreateBackendDto: UserCreateBackendDto,
    ): Promise<UserBackendDto> {
        const createdUser = await this.userCreateUseCase.execute(
            userCreateBackendDto.name,
            userCreateBackendDto.email,
            userCreateBackendDto.hashed_password,
        );

        return this.toDto(createdUser);
    }

    @Get(":id/reservations")
    async getReservations(
        @Param("id") id: string,
    ): Promise<ReservationBackendDto[]> {
        const reservations = await this.userGetReservationsUseCase.execute(id);

        return reservations.map(this.toReservationDto);
    }

    private toDto(user: User): UserBackendDto {
        return {
            uuid: user.id,
            name: user.name,
            email: user.email,
            hashed_password: user.passwordHash,
        };
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
