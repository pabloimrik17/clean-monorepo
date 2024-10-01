import { DateTime } from "luxon";

type ReservationState = "active" | "canceled";

export class ReservationAlreadyCancelledException extends Error {
    constructor() {
        super("The reservation is already cancelled.");
    }
}

interface ReservationProps {
    id: string;
    userId: string;
    eventId: string;
    reservationDate: DateTime;
    state: ReservationState;
}

export class Reservation {
    get id(): string {
        return this.props.id;
    }

    get userId(): string {
        return this.props.userId;
    }

    get eventId(): string {
        return this.props.eventId;
    }

    get reservationDate(): DateTime {
        return this.props.reservationDate;
    }

    get state(): ReservationState {
        return this.props.state;
    }

    constructor(private readonly props: Readonly<ReservationProps>) {}

    cancel(): Reservation {
        if (this.state === "canceled") {
            throw new ReservationAlreadyCancelledException();
        }

        return new Reservation({
            ...this.props,
            state: "canceled",
        });
    }
}
