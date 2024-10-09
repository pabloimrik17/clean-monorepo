import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export enum EventBackendStateEnumDto {
    Active = 0,
    Canceled = -1,
    Finished = 1,
}

export class EventBackendDto {
    @ApiProperty()
    uuid!: string;

    @ApiProperty()
    name!: string;

    @ApiProperty()
    short_description!: string;

    @ApiProperty()
    date!: string;

    @ApiProperty()
    city!: string;

    @ApiProperty()
    capacity!: {
        total: number;

        available: number;
    };

    @ApiProperty()
    current_state!: EventBackendStateEnumDto;
}
