import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export enum ReservationBackendStateEnumDto {
    Canceled = 0,
    Active = 1,
}

export class ReservationBackendDto {
    @ApiProperty()
    uuid!: string;

    @ApiProperty()
    user!: string;

    @ApiProperty()
    event!: string;

    @ApiProperty()
    booking_date!: string;

    @ApiProperty({ enum: ReservationBackendStateEnumDto })
    current_state!: ReservationBackendStateEnumDto;
}

export class ReservationCreateBackendDto {
    @ApiProperty()
    user!: string;

    @ApiProperty()
    event!: string;
}

export class ReservationUpdateBackendDto {
    @ApiProperty()
    user!: string;

    @ApiProperty()
    event!: string;
}
