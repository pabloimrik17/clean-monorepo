export enum EventApiStateEnumDto {
    Active = 0,
    Canceled = -1,
    Finished = 1,
}

export interface EventApiDto {
    uuid: string;
    name: string;
    short_description: string;
    date: string;
    city: string;
    capacity: {
        total: number;
        available: number;
    };
    current_state: EventApiStateEnumDto;
}
