export enum ReservationBackendStateEnumDto {
    Canceled = 0,
    Active = 1,
}

export interface ReservationBackendDto {
    uuid: string;
    user: string;
    event: string;
    booking_date: string;
    current_state: ReservationBackendStateEnumDto;
}

export type ReservationCreateBackendDto = Pick<
    ReservationBackendDto,
    "user" | "event"
>;
export type ReservationUpdateBackendDto = ReservationCreateBackendDto;
