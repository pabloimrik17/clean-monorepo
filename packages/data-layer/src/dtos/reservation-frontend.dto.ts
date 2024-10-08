export enum ReservationFrontendStateEnumDto {
    Canceled = 0,
    Active = 1,
}

export interface ReservationFrontendDto {
    uuid: string;
    user: string;
    event: string;
    booking_date: string;
    current_state: ReservationFrontendStateEnumDto;
}

export type ReservationCreateFrontendDto = Pick<
    ReservationFrontendDto,
    "user" | "event"
>;
export type ReservationUpdateFrontendDto = ReservationCreateFrontendDto;
