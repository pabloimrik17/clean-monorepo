export enum ReservationApiStateEnumDto {
    Canceled = 0,
    Active = 1,
}

export interface ReservationApiDto {
    uuid: string;
    user: string;
    event: string;
    booking_date: string;
    current_state: ReservationApiStateEnumDto;
}

export type ReservationCreateApiDto = Pick<ReservationApiDto, "user" | "event">;
export type ReservationUpdateApiDto = ReservationCreateApiDto;
