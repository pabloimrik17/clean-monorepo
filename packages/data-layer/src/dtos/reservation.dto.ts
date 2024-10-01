export enum ReservationStateEnumDto {
    Canceled = 0,
    Active = 1,
}

export interface ReservationDto {
    uuid: string;
    user: string;
    event: string;
    booking_date: string;
    current_state: ReservationStateEnumDto;
}
